export type BrandPartner = {
  name: string;
  /** Path under /public, e.g. /assets/logo/grundfos-logo.webp */
  logoSrc?: string;
  href?: string;
};

/** Partner logos in public/assets/logo/ */
export const brandPartners: BrandPartner[] = [
  { name: "Drillcon", logoSrc: "/assets/logo/drillcon-logo.webp" },
  { name: "Chloride Exide", logoSrc: "/assets/logo/chloride-exide-logo.webp" },
  { name: "KenGen", logoSrc: "/assets/logo/Kengen-logo.webp" },
  { name: "KSB", logoSrc: "/assets/logo/ksb-logo.webp" },
  { name: "Wilo", logoSrc: "/assets/logo/wilo-logo.webp" },
  { name: "Grundfos", logoSrc: "/assets/logo/grundfos-logo.webp" },
  { name: "Davis & Shirtliff", logoSrc: "/assets/logo/davis-shirtliff-logo.webp" },
];
