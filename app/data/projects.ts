/**
 * Featured project case studies.
 *
 * Client attribution (`client`) is optional. Only set when confirmed —
 * do not invent KenGen / Drillcon / Chloride Exide mappings until
 * stakeholders confirm which published case studies belong to them.
 * Partners/Customers logos can then set `projectId` to link here.
 */

export type ProjectClient = {
  name: string;
  /** Matches a logo in app/data/brands.ts when available */
  logoSrc?: string;
};

export type ProjectRelatedProduct = {
  label: string;
  /** Internal path — prefer catalogue brand/application filters over invented product slugs */
  href: string;
};

export type FeaturedProject = {
  id: string;
  slug: string;
  title: string;
  location: string;
  metric: string;
  date: string;
  /** Short card / listing summary */
  desc: string;
  img: string;
  category: "Agricultural" | "Industrial" | "Municipal" | "Infrastructure";
  client?: ProjectClient;
  gallery: string[];
  challenge: string;
  approach: string;
  outcome: string;
  equipment: string[];
  relatedProducts: ProjectRelatedProduct[];
};

export const PROJECT_CATEGORIES = [
  "Agricultural",
  "Industrial",
  "Municipal",
  "Infrastructure",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const featuredProjects: FeaturedProject[] = [
  {
    id: "mau-forest-irrigation",
    slug: "mau-forest-irrigation",
    title: "Mau Forest Highland Irrigation",
    location: "Nakuru, Kenya",
    metric: "150 Hectares Irrigated",
    date: "2024",
    desc: "Installed high-efficiency solar pumping systems to automate irrigation for dairy and vegetable farmers, replacing fuel-based pumps and stabilizing daily output.",
    img: "/assets/images/afrotech-1.jpg",
    category: "Agricultural",
    gallery: [
      "/assets/images/afrotech-1.jpg",
      "/assets/images/afrotech-6.jpg",
      "/assets/images/afrotech-8.jpg",
    ],
    challenge:
      "Highland dairy and vegetable growers around the Mau Forest belt depended on diesel pumps with high fuel cost, irregular runtime, and limited irrigation coverage during peak dry periods.",
    approach:
      "We surveyed borehole yield, elevation, and crop water demand, then specified solar-driven submersible and booster packages sized for the actual duty cycle — with staged irrigation zones so farmers could expand coverage without oversizing day one.",
    outcome:
      "Approximately 150 hectares now run on automated irrigation with more predictable daily water delivery and lower operating cost versus fuel-based pumping.",
    equipment: [
      "Solar borehole / submersible pumping packages",
      "Irrigation distribution and control accessories",
    ],
    relatedProducts: [
      { label: "Browse solar & borehole pumps", href: "/products?application=agricultural" },
      { label: "Grundfos catalogue", href: "/products?brand=grundfos" },
    ],
  },
  {
    id: "mombasa-port-cooling",
    slug: "mombasa-port-cooling",
    title: "Mombasa Port Cooling Systems",
    location: "Kilindini, Kenya",
    metric: "35% Energy Savings",
    date: "2023",
    desc: "Upgraded port-side cooling and fire safety networks with high-volume centrifugal pumps, improving efficiency and reducing recurring utility costs.",
    img: "/assets/images/afrotech-14.jpg",
    category: "Industrial",
    gallery: [
      "/assets/images/afrotech-14.jpg",
      "/assets/images/afrotech-7.jpg",
      "/assets/images/afrotech-13.jpg",
    ],
    challenge:
      "Port-side cooling and fire-safety networks at Kilindini faced rising energy cost and aging centrifugal sets that struggled to maintain design duty under continuous industrial load.",
    approach:
      "Hydraulic review of cooling and fire mains guided selection of high-volume centrifugal pumps with improved efficiency curves. We coordinated install sequencing around live port operations and verified duty points at commissioning.",
    outcome:
      "Measured energy use on the upgraded cooling loops improved by about 35%, with clearer maintenance baselines for the operations team.",
    equipment: [
      "High-volume centrifugal process pumps",
      "Fire-network support pumps and commissioning checks",
    ],
    relatedProducts: [
      { label: "Industrial centrifugal pumps", href: "/products?pumpType=centrifugal" },
      { label: "Wilo catalogue", href: "/products?brand=wilo" },
      { label: "KSB catalogue", href: "/products?brand=ksb" },
    ],
  },
  {
    id: "kisumu-water-hub",
    slug: "kisumu-water-hub",
    title: "Kisumu Central Water Hub",
    location: "Kisumu, Kenya",
    metric: "50,000+ People Served",
    date: "2024",
    desc: "Modernized the central pumping station with synchronized multi-pump systems to improve pressure stability and continuity across the municipal distribution network.",
    img: "/assets/images/afrotech-9.jpg",
    category: "Municipal",
    gallery: [
      "/assets/images/afrotech-9.jpg",
      "/assets/images/afrotech-5.jpg",
      "/assets/images/afrotech-4.jpg",
    ],
    challenge:
      "The central municipal pumping station needed more stable pressure and continuity across a distribution network serving a large urban catchment — without long outages during upgrade.",
    approach:
      "We designed a synchronized multi-pump duty/assist arrangement with clearer control logic for peak and off-peak demand, then commissioned staged cutovers so the network stayed live during the transition.",
    outcome:
      "Pressure stability improved across the served zones, supporting reliable supply for an estimated 50,000+ people connected to the hub’s distribution footprint.",
    equipment: [
      "Synchronized multi-pump station packages",
      "Controls and handover documentation for operators",
    ],
    relatedProducts: [
      { label: "Municipal / utility pumps", href: "/products?application=municipal" },
      { label: "Booster systems", href: "/products?pumpType=booster" },
    ],
  },
  {
    id: "nairobi-supply-stabilization",
    slug: "nairobi-supply-stabilization",
    title: "Industrial Supply Stabilization",
    location: "Nairobi, Kenya",
    metric: "99.9% Uptime Target",
    date: "2024",
    desc: "Delivered a duty/standby pumping architecture with monitoring points that improved reliability for continuous-duty process operations.",
    img: "/assets/images/afrotech-13.jpg",
    category: "Infrastructure",
    gallery: [
      "/assets/images/afrotech-13.jpg",
      "/assets/images/afrotech-10.jpg",
      "/assets/images/afrotech-11.jpg",
    ],
    challenge:
      "A continuous-duty industrial water supply could not tolerate single-pump failure — any stoppage risked process downtime and cascading plant losses.",
    approach:
      "We engineered a duty/standby architecture with isolation, instrumentation, and monitoring points so operators could switch or intervene before a fault became an outage.",
    outcome:
      "The site now operates against a 99.9% uptime target with clearer spare strategy and faster fault isolation during maintenance windows.",
    equipment: [
      "Duty/standby pump sets",
      "Instrumentation and monitoring points for operations",
    ],
    relatedProducts: [
      { label: "Browse industrial pumps", href: "/products?application=industrial" },
      { label: "Installation & commissioning support", href: "/services/installation-commissioning" },
    ],
  },
];

export function getProjectBySlug(slug: string): FeaturedProject | undefined {
  return featuredProjects.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedProjects(project: FeaturedProject, limit = 3): FeaturedProject[] {
  const sameCategory = featuredProjects.filter(
    (p) => p.id !== project.id && p.category === project.category,
  );
  const others = featuredProjects.filter(
    (p) => p.id !== project.id && p.category !== project.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getProjectsByClientName(clientName: string): FeaturedProject[] {
  const needle = clientName.trim().toLowerCase();
  return featuredProjects.filter((p) => p.client?.name.toLowerCase() === needle);
}
