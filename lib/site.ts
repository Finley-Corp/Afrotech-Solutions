/** Canonical production URL — set NEXT_PUBLIC_SITE_URL in Vercel/hosting env. */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "https://afrotechsolutions.com";
  return url.replace(/\/$/, "");
}

export const SITE_NAME = "Afrotech Solutions";
export const SITE_NAME_LEGAL = "Afrotech Engineering Solutions Limited";
