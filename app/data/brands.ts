/**
 * Homepage Partners & Customers logo data.
 *
 * Classification rules (do not invent relationships):
 * - supplier: authorized manufacturer brands in our product catalogue
 * - customer: organizations named as clients in business materials (no fabricated project links)
 * - unconfirmed: present in assets but not yet verified for either role — content team must confirm
 *   before these appear in a live homepage category.
 */

export type LogoRole = "supplier" | "customer" | "unconfirmed";

export type BrandLogo = {
  name: string;
  /** Path under /public, e.g. /assets/logo/grundfos-logo.webp */
  logoSrc: string;
  role: LogoRole;
  /**
   * Catalogue brand filter id (grundfos | ksb | wilo).
   * Only set for confirmed supplier brands that exist as product filters.
   */
  catalogueBrandId?: "grundfos" | "ksb" | "wilo";
  /**
   * Featured project id/slug from app/data/projects.ts when a real client
   * connection exists (project.client must also be set). Leave unset rather
   * than guessing — KenGen / Drillcon / Chloride Exide are not linked until
   * stakeholders confirm which case studies belong to them.
   */
  projectId?: string;
  /** Why this entry is unconfirmed (for content / ops review). */
  needsConfirmationNote?: string;
};

export const brandLogos: BrandLogo[] = [
  // --- Confirmed suppliers (catalogue brands) ---
  {
    name: "Grundfos",
    logoSrc: "/assets/logo/grundfos-logo.webp",
    role: "supplier",
    catalogueBrandId: "grundfos",
  },
  {
    name: "KSB",
    logoSrc: "/assets/logo/ksb-logo.webp",
    role: "supplier",
    catalogueBrandId: "ksb",
  },
  {
    name: "Wilo",
    logoSrc: "/assets/logo/wilo-logo.webp",
    role: "supplier",
    catalogueBrandId: "wilo",
  },

  // --- Confirmed customers (client organizations; no linked projects in featuredProjects yet) ---
  {
    name: "KenGen",
    logoSrc: "/assets/logo/Kengen-logo.webp",
    role: "customer",
  },
  {
    name: "Drillcon",
    logoSrc: "/assets/logo/drillcon-logo.webp",
    role: "customer",
  },
  {
    name: "Chloride Exide",
    logoSrc: "/assets/logo/chloride-exide-logo.webp",
    role: "customer",
  },

  // --- Unconfirmed: do not render in either live homepage block until content confirms ---
  {
    name: "Davis & Shirtliff",
    logoSrc: "/assets/logo/davis-shirtliff-logo.webp",
    role: "unconfirmed",
    needsConfirmationNote:
      "Regional water/pump distributor and potential competitor. Confirm whether this is a supplier relationship, channel partner, miscategorized asset, or should be removed entirely.",
  },
  {
    name: "Kamder",
    logoSrc: "/assets/logo/kamder-logo.png",
    role: "unconfirmed",
    needsConfirmationNote:
      "No catalogue brand id and no matching entry in featuredProjects. Confirm supplier vs customer (or remove) before publishing.",
  },
];

/** @deprecated Prefer brandLogos + role filters. Kept for any legacy imports. */
export type BrandPartner = {
  name: string;
  logoSrc?: string;
  href?: string;
};

/** @deprecated Prefer supplierLogos / customerLogos */
export const brandPartners: BrandPartner[] = brandLogos.map(({ name, logoSrc }) => ({
  name,
  logoSrc,
}));

export const supplierLogos = brandLogos.filter((b) => b.role === "supplier");
export const customerLogos = brandLogos.filter((b) => b.role === "customer");

/** Flagged for content team — not shown on the homepage until classified. */
export const unconfirmedLogos = brandLogos.filter((b) => b.role === "unconfirmed");
