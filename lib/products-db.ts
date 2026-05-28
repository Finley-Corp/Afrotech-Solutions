import { unstable_cache } from "next/cache";
import { neonQuery } from "./neon-db";
import type { ProductDbRow } from "@/app/data/products";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80";

export type ProductListItem = Pick<
  ProductDbRow,
  "id" | "name" | "category" | "category_id" | "short_desc" | "main_img" | "price"
>;

export type ProductsPageResult = {
  items: ProductListItem[];
  total: number;
  page: number;
  limit: number;
};

type DbListRow = {
  id: number | string;
  name: string;
  brand: string;
  image_url: string | null;
  description: string | null;
  total_count: string | number;
};

type DbDetailRow = {
  id: number | string;
  name: string;
  brand: string;
  description: string | null;
  image_url: string | null;
  specs: Record<string, unknown> | null;
};

export function productThumbnailUrl(url: string | null | undefined, width = 480): string {
  if (!url) return FALLBACK_IMG;
  if (url.includes("ik.imagekit.io")) {
    const joiner = url.includes("?") ? "&" : "?";
    return `${url}${joiner}tr=w-${width},h-${width},c-at_max,f-auto,q-80`;
  }
  return url;
}

function mapSpecs(specsObj: Record<string, unknown> | null | undefined) {
  const specs = specsObj ?? {};
  const specsList = Object.entries(specs).map(
    ([k, v]) => `${k.replace(/_/g, " ").toUpperCase()}: ${v}`,
  );
  const detailed_specs = Object.entries(specs).map(([k, v]) => ({
    label: k.replace(/_/g, " "),
    value: String(v),
  }));
  return { specs: specsList, detailed_specs };
}

function mapListRow(row: DbListRow): ProductListItem {
  const desc = row.description?.trim() ?? "";
  const short_desc =
    desc.length > 0
      ? desc.length > 140
        ? `${desc.slice(0, 140)}…`
        : desc
      : "Contact us for specifications and pricing.";

  return {
    id: String(row.id),
    name: row.name,
    category: row.brand.toUpperCase(),
    category_id: row.brand.toLowerCase(),
    short_desc,
    price: "Contact for Quote",
    main_img: productThumbnailUrl(row.image_url),
  };
}

function mapDetailRow(row: DbDetailRow): ProductDbRow {
  const { specs, detailed_specs } = mapSpecs(row.specs);
  const full_desc = row.description?.trim() || "No description available.";
  const short_desc =
    full_desc.length > 150 ? `${full_desc.slice(0, 150)}…` : full_desc;

  return {
    id: String(row.id),
    name: row.name,
    category: row.brand.toUpperCase(),
    category_id: row.brand.toLowerCase(),
    short_desc,
    full_desc,
    price: "Contact for Quote",
    main_img: productThumbnailUrl(row.image_url, 800),
    specs,
    detailed_specs,
    applications: ["Water Distribution", "Industrial Supply", "Pressure Boosting"],
  };
}

export async function fetchProductsPage(options: {
  page?: number;
  limit?: number;
  brand?: string | null;
  search?: string | null;
}): Promise<ProductsPageResult> {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(96, Math.max(12, options.limit ?? 48));
  const offset = (page - 1) * limit;
  const brand =
    options.brand && options.brand !== "all" ? options.brand.toLowerCase() : null;
  const search = options.search?.trim() || null;
  const searchPattern = search ? `%${search}%` : null;

  const rows = await neonQuery<DbListRow>(
    `SELECT
       id,
       name,
       brand,
       image_url,
       LEFT(COALESCE(description, ''), 200) AS description,
       COUNT(*) OVER() AS total_count
     FROM products
     WHERE ($1::text IS NULL OR LOWER(brand) = $1)
       AND (
         $2::text IS NULL
         OR name ILIKE $2
         OR COALESCE(description, '') ILIKE $2
       )
     ORDER BY scraped_at DESC NULLS LAST, id DESC
     LIMIT $3 OFFSET $4`,
    [brand, searchPattern, limit, offset],
  );

  const total = rows.length > 0 ? Number(rows[0].total_count) : 0;

  return {
    items: rows.map(mapListRow),
    total,
    page,
    limit,
  };
}

export async function fetchProductById(id: string): Promise<ProductDbRow | null> {
  const rows = await neonQuery<DbDetailRow>(
    `SELECT id, name, brand, description, image_url, specs
     FROM products
     WHERE id = $1`,
    [id],
  );
  if (!rows.length) return null;
  return mapDetailRow(rows[0]);
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

const cachedProductsPage = unstable_cache(
  async (page: number, limit: number, brand: string, search: string) =>
    fetchProductsPage({ page, limit, brand: brand || null, search: search || null }),
  ["products-page"],
  { revalidate: 120, tags: ["products"] },
);

const cachedProductById = unstable_cache(
  async (id: string) => fetchProductById(id),
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
  );
}

export function getCachedProductById(id: string): Promise<ProductDbRow | null> {
  return cachedProductById(id);
}

export function getCachedProductNames(): Promise<string[]> {
  return cachedProductNames();
}

export function getCachedBrandCounts(): Promise<BrandCounts> {
  return cachedBrandCounts();
}
