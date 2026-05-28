/** Build a URL-safe product slug from brand, name, and optional source URL. */
export function slugifyPart(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

export function slugFromSourceUrl(sourceUrl: string | null | undefined): string | null {
  if (!sourceUrl) return null;
  try {
    const segment = new URL(sourceUrl).pathname.split("/").filter(Boolean).pop() ?? "";
    if (/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(segment) || /^[a-z0-9]$/.test(segment)) {
      return segment;
    }
  } catch {
    /* ignore invalid URLs */
  }
  return null;
}

export function buildProductSlug(
  brand: string,
  name: string,
  sourceUrl?: string | null,
  id?: string | number,
): string {
  const fromUrl = slugFromSourceUrl(sourceUrl);
  const base =
    fromUrl ||
    slugifyPart(`${brand}-${name}`) ||
    (id != null ? `product-${id}` : "product");

  return base;
}

export function productDetailPath(slug: string): string {
  return `/products/${slug}`;
}

export function isNumericProductId(value: string): boolean {
  return /^\d+$/.test(value);
}
