import { unstable_cache } from "next/cache";
import { neonQuery } from "./neon-db";
import { buildProductSlug, isNumericProductId } from "./product-slug";
import type { ProductDbRow } from "@/app/data/products";
import {
  getSearchPatternsForApplication,
  getSearchPatternsForPumpType,
  getTechnicalSpecTable,
  inferApplications,
  inferPumpType,
  isJunkDescription,
  resolveProductDescription,
  buildProductDescriptionFallback,
} from "./product-metadata";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80";

export type ProductListItem = Pick<
  ProductDbRow,
  "id" | "slug" | "name" | "category" | "category_id" | "short_desc" | "main_img" | "price" | "pump_type" | "applications"
>;

export type ProductsPageResult = {
  items: ProductListItem[];
  total: number;
  page: number;
  limit: number;
};

type DbListRow = {
  id: number | string;
  slug: string | null;
  name: string;
  brand: string;
  source_url: string | null;
  image_url: string | null;
  description: string | null;
  total_count: string | number;
};

type DbDetailRow = {
  id: number | string;
  slug: string | null;
  name: string;
  brand: string;
  source_url: string | null;
  description: string | null;
  image_url: string | null;
  specs: Record<string, unknown> | null;
};

function resolveSlug(row: {
  id: number | string;
  slug: string | null;
  brand: string;
  name: string;
  source_url?: string | null;
}): string {
  return (
    row.slug?.trim() ||
    buildProductSlug(row.brand, row.name, row.source_url ?? null, row.id)
  );
}

export function productThumbnailUrl(url: string | null | undefined, width = 480): string {
  if (!url) return FALLBACK_IMG;
  if (url.includes("ik.imagekit.io")) {
    const joiner = url.includes("?") ? "&" : "?";
    return `${url}${joiner}tr=w-${width},h-${width},c-at_max,f-auto,q-80`;
  }
  return url;
}

function mapSpecs(specsObj: Record<string, unknown> | null | undefined) {
  const detailed_specs = getTechnicalSpecTable(specsObj);
  const specs = detailed_specs.map((s) => `${s.label.toUpperCase()}: ${s.value}`);
  return { specs, detailed_specs };
}

function buildNameDescriptionFilter(patterns: string[]): string | null {
  if (!patterns.length) return null;
  const clauses = patterns.flatMap((p) => {
    const escaped = p.replace(/'/g, "''");
    return [
      `LOWER(name) LIKE '%${escaped}%'`,
      `LOWER(COALESCE(description, '')) LIKE '%${escaped}%'`,
    ];
  });
  return `(${clauses.join(" OR ")})`;
}

function mapListRow(row: DbListRow): ProductListItem {
  const short_desc = resolveProductDescription(row.description, row.brand, row.name);

  return {
    id: String(row.id),
    slug: resolveSlug(row),
    name: row.name,
    category: row.brand.toUpperCase(),
    category_id: row.brand.toLowerCase(),
    short_desc,
    price: "Contact for Quote",
    main_img: productThumbnailUrl(row.image_url),
    pump_type: null,
    applications: [],
  };
}

function buildProductsWhereClause(options: {
  brand: string | null;
  searchPattern: string | null;
  pumpFilter: string;
  appFilter: string;
}): { sql: string; params: unknown[] } {
  return {
    sql: `WHERE ($1::text IS NULL OR LOWER(brand) = $1)
       AND (
         $2::text IS NULL
         OR name ILIKE $2
         OR brand ILIKE $2
         OR LEFT(COALESCE(description, ''), 200) ILIKE $2
       )
       AND (${options.pumpFilter})
       AND (${options.appFilter})`,
    params: [options.brand, options.searchPattern],
  };
}

function mapDetailRow(row: DbDetailRow): ProductDbRow {
  const pump_type = inferPumpType(row.name, row.description ?? "");
  const { specs, detailed_specs } = mapSpecs(row.specs);
  const raw = row.description?.trim() ?? "";
  const full_desc = isJunkDescription(raw)
    ? buildProductDescriptionFallback(row.brand, row.name, pump_type)
    : raw || buildProductDescriptionFallback(row.brand, row.name, pump_type);
  const short_desc = resolveProductDescription(row.description, row.brand, row.name, 150);
  const applications = inferApplications(row.name, row.description ?? "", pump_type);

  return {
    id: String(row.id),
    slug: resolveSlug(row),
    name: row.name,
    category: row.brand.toUpperCase(),
    category_id: row.brand.toLowerCase(),
    short_desc,
    full_desc,
    price: "Contact for Quote",
    main_img: productThumbnailUrl(row.image_url, 800),
    specs,
    detailed_specs,
    applications,
    pump_type,
    source_url: row.source_url,
  };
}

export async function fetchProductsPage(options: {
  page?: number;
  limit?: number;
  brand?: string | null;
  search?: string | null;
  pumpType?: string | null;
  application?: string | null;
}): Promise<ProductsPageResult> {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(96, Math.max(12, options.limit ?? 48));
  const offset = (page - 1) * limit;
  const brand =
    options.brand && options.brand !== "all" ? options.brand.toLowerCase() : null;
  const search = options.search?.trim() || null;
  const searchPattern = search ? `%${search}%` : null;

  const pumpPatterns = options.pumpType ? getSearchPatternsForPumpType(options.pumpType) : [];
  const appPatterns = options.application ? getSearchPatternsForApplication(options.application) : [];
  const pumpFilter = options.pumpType
    ? buildNameDescriptionFilter(pumpPatterns) ?? "FALSE"
    : "TRUE";
  const appFilter = options.application
    ? buildNameDescriptionFilter(appPatterns) ?? "FALSE"
    : "TRUE";

  const { sql: whereSql, params: whereParams } = buildProductsWhereClause({
    brand,
    searchPattern,
    pumpFilter,
    appFilter,
  });

  const [rows, countRows] = await Promise.all([
    neonQuery<Omit<DbListRow, "total_count">>(
      `SELECT
         id,
         slug,
         name,
         brand,
         source_url,
         image_url,
         LEFT(COALESCE(description, ''), 200) AS description
       FROM products
       ${whereSql}
       ORDER BY scraped_at DESC NULLS LAST, id DESC
       LIMIT $3 OFFSET $4`,
      [...whereParams, limit, offset],
    ),
    neonQuery<{ count: number }>(
      `SELECT COUNT(*)::int AS count FROM products ${whereSql}`,
      whereParams,
    ),
  ]);

  const total = countRows[0]?.count ?? 0;

  return {
    items: rows.map((row) => mapListRow({ ...row, total_count: total })),
    total,
    page,
    limit,
  };
}

export async function fetchProductById(id: string): Promise<ProductDbRow | null> {
  const rows = await neonQuery<DbDetailRow>(
    `SELECT id, slug, name, brand, source_url, description, image_url, specs
     FROM products
     WHERE id = $1`,
    [id],
  );
  if (!rows.length) return null;
  return mapDetailRow(rows[0]);
}

export async function fetchProductBySlug(slug: string): Promise<ProductDbRow | null> {
  const rows = await neonQuery<DbDetailRow>(
    `SELECT id, slug, name, brand, source_url, description, image_url, specs
     FROM products
     WHERE slug = $1`,
    [slug],
  );
  if (!rows.length) return null;
  return mapDetailRow(rows[0]);
}

export async function fetchProductBySlugOrId(param: string): Promise<ProductDbRow | null> {
  if (isNumericProductId(param)) {
    return fetchProductById(param);
  }
  return fetchProductBySlug(param);
}

export async function fetchProductNames(): Promise<string[]> {
  const rows = await neonQuery<{ name: string }>(
    `SELECT DISTINCT name FROM products ORDER BY name ASC`,
  );
  return rows.map((r) => r.name);
}

export type BrandCounts = Record<string, number>;

export async function fetchBrandCounts(): Promise<BrandCounts> {
  const rows = await neonQuery<{ brand: string; count: string | number }>(
    `SELECT LOWER(brand) AS brand, COUNT(*)::int AS count
     FROM products
     GROUP BY LOWER(brand)`,
  );
  const counts: BrandCounts = { all: 0 };
  for (const row of rows) {
    counts[row.brand] = Number(row.count);
    counts.all += Number(row.count);
  }
  return counts;
}

export async function fetchSimilarProducts(
  brand: string,
  excludeSlug: string,
  limit = 4,
): Promise<ProductListItem[]> {
  const rows = await neonQuery<DbListRow>(
    `SELECT
       id,
       slug,
       name,
       brand,
       source_url,
       image_url,
       LEFT(COALESCE(description, ''), 200) AS description,
       0 AS total_count
     FROM products
     WHERE LOWER(brand) = LOWER($1)
       AND slug IS DISTINCT FROM $2
     ORDER BY scraped_at DESC NULLS LAST, id DESC
     LIMIT $3`,
    [brand, excludeSlug, limit],
  );
  return rows.map(mapListRow);
}

const cachedProductsPage = unstable_cache(
  async (
    page: number,
    limit: number,
    brand: string,
    search: string,
    pumpType: string,
    application: string,
  ) =>
    fetchProductsPage({
      page,
      limit,
      brand: brand || null,
      search: search || null,
      pumpType: pumpType || null,
      application: application || null,
    }),
  ["products-page"],
  { revalidate: 120, tags: ["products"] },
);

const cachedProductBySlugOrId = unstable_cache(
  async (param: string) => fetchProductBySlugOrId(param),
  ["product-detail"],
  { revalidate: 300, tags: ["products"] },
);

const cachedProductNames = unstable_cache(fetchProductNames, ["product-names"], {
  revalidate: 600,
  tags: ["products"],
});

const cachedBrandCounts = unstable_cache(fetchBrandCounts, ["product-brand-counts"], {
  revalidate: 300,
  tags: ["products"],
});

export function getCachedProductsPage(
  options: Parameters<typeof fetchProductsPage>[0],
): Promise<ProductsPageResult> {
  return cachedProductsPage(
    options.page ?? 1,
    options.limit ?? 48,
    options.brand ?? "",
    options.search ?? "",
    options.pumpType ?? "",
    options.application ?? "",
  );
}

export function getCachedProductBySlugOrId(param: string): Promise<ProductDbRow | null> {
  return cachedProductBySlugOrId(param);
}

export function getCachedProductNames(): Promise<string[]> {
  return cachedProductNames();
}

export function getCachedBrandCounts(): Promise<BrandCounts> {
  return cachedBrandCounts();
}
