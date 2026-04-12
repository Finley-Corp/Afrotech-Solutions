export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
  mainImg: string;
  specs: string[];
  detailedSpecs: { label: string; value: string }[];
  applications: string[];
}

/** Same shape as rows from the Supabase `products` table */
export type ProductDbRow = {
  id: string;
  name: string;
  category: string;
  category_id: string;
  short_desc: string;
  full_desc: string;
  price: string;
  main_img: string;
  specs: string[];
  detailed_specs: { label: string; value: string }[];
  applications: string[];
};

export function toProductDbRow(p: Product): ProductDbRow {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    category_id: p.categoryId,
    short_desc: p.shortDesc,
    full_desc: p.fullDesc,
    price: p.price,
    main_img: p.mainImg,
    specs: p.specs,
    detailed_specs: p.detailedSpecs,
    applications: p.applications,
  };
}

/** Detail page fallback when a slug exists in the catalog but not yet in the DB */
export function getCatalogProductRowById(id: string): ProductDbRow | undefined {
  const p = productsList.find((x) => x.id === id);
  return p ? toProductDbRow(p) : undefined;
}

/**
 * Seed catalog — order is submersible → solar → industrial (same as products page).
 * Each row has exactly one image: `mainImg` = `/assets/products/product-{N}.jpg` (N = 1…10 in list order).
 */
export const productsList: Product[] = [
  {
    id: "aquamax-3000",
    name: "AquaMax 3000",
    category: "Submersible Pumps",
    categoryId: "submersible",
    shortDesc:
      "High-pressure borehole and well pumps engineered for industrial and agricultural water supply.",
    fullDesc:
      "The AquaMax 3000 is our flagship deep-borehole submersible pump. Designed for extreme durability in high-mineral water conditions, it features a unique stainless steel impeller system that resists abrasion and corrosion. Ideal for reliable agricultural irrigation and community water points.",
    price: "From $850",
    mainImg: "/assets/products/product-1.jpg",
    specs: ["80m Max Head", "3 HP Motor", "5 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "80 Meters" },
      { label: "Motor Power", value: "3 HP / 2.2 kW" },
      { label: "Flow Rate", value: "5 m³/hr" },
      { label: "Voltage", value: "240V / 50Hz" },
      { label: "Outlet Size", value: "2.0 Inches" },
      { label: "Material", value: "304 Stainless Steel" },
    ],
    applications: [
      "Deep Borehole Pumping",
      "Agricultural Irrigation",
      "Community Water Systems",
      "Livestock Watering",
    ],
  },
  {
    id: "aquamax-5000",
    name: "AquaMax 5000",
    category: "Submersible Pumps",
    categoryId: "submersible",
    shortDesc: "Heavy-duty borehole pump for large-scale agricultural irrigation.",
    fullDesc:
      "Engineered for high-volume extraction, the AquaMax 5000 delivers superior flow rates at significant depths. Its premium multi-stage design ensures consistent pressure for large-scale center-pivot and drip irrigation systems, even in challenging geological formations.",
    price: "From $1,450",
    mainImg: "/assets/products/product-2.jpg",
    specs: ["120m Max Head", "5.5 HP Motor", "10 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "120 Meters" },
      { label: "Motor Power", value: "5.5 HP / 4.1 kW" },
      { label: "Flow Rate", value: "10 m³/hr" },
      { label: "Voltage", value: "415V / 50Hz (3 Phase)" },
      { label: "Outlet Size", value: "3.0 Inches" },
      { label: "Material", value: "316 Stainless Steel" },
    ],
    applications: [
      "Large-Scale Commercial Farming",
      "Industrial Water Intake",
      "Municipal Storage Feeding",
      "Mining Water Management",
    ],
  },
  {
    id: "borepro-200",
    name: "BorePro 200",
    category: "Submersible Pumps",
    categoryId: "submersible",
    shortDesc: "Compact multistage submersible for domestic and light irrigation duty.",
    fullDesc:
      "A compact, efficient multistage stack suited to domestic boreholes and light irrigation. Stainless wet-end options and motor protection for variable grid conditions.",
    price: "From $620",
    mainImg: "/assets/products/product-3.jpg",
    specs: ["65m Max Head", "2 HP Motor", "3.5 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "65 Meters" },
      { label: "Motor Power", value: "2 HP / 1.5 kW" },
      { label: "Flow Rate", value: "3.5 m³/hr" },
      { label: "Voltage", value: "240V / 50Hz" },
      { label: "Outlet Size", value: "1.5 Inches" },
      { label: "Material", value: "304 Stainless Steel" },
    ],
    applications: ["Domestic boreholes", "Smallholder irrigation", "Livestock"],
  },
  {
    id: "deepwell-800",
    name: "DeepWell 800",
    category: "Submersible Pumps",
    categoryId: "submersible",
    shortDesc: "High-head submersible for deep wells and transfer to elevated tanks.",
    fullDesc:
      "Built for high static lift and continuous duty. Suitable for deep community boreholes and transfer to elevated storage with stable curve performance across the operating range.",
    price: "From $1,980",
    mainImg: "/assets/products/product-4.jpg",
    specs: ["180m Max Head", "7.5 HP Motor", "8 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "180 Meters" },
      { label: "Motor Power", value: "7.5 HP / 5.5 kW" },
      { label: "Flow Rate", value: "8 m³/hr" },
      { label: "Voltage", value: "415V / 50Hz (3 Phase)" },
      { label: "Outlet Size", value: "3.0 Inches" },
      { label: "Material", value: "316 Stainless Steel" },
    ],
    applications: ["Deep boreholes", "Tank transfer", "Municipal abstraction"],
  },
  {
    id: "solarflow-pro",
    name: "SolarFlow Pro",
    category: "Solar Pumping Systems",
    categoryId: "solar",
    shortDesc: "Sustainable, off-grid water solutions for remote locations and rural communities.",
    fullDesc:
      "The SolarFlow Pro is a complete off-grid pumping solution that eliminates fuel costs entirely. Featuring an advanced MPPT controller, it maximizes energy capture even on cloudy days. Perfect for remote agricultural projects where grid access is limited or unreliable.",
    price: "From $1,200",
    mainImg: "/assets/products/product-5.jpg",
    specs: ["60m Max Head", "Solar-Powered", "3 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "60 Meters" },
      { label: "Pumping Mode", value: "Pure Solar (DC)" },
      { label: "Flow Rate", value: "3 m³/hr" },
      { label: "Solar Controller", value: "Integrated MPPT" },
      { label: "Panel Requirement", value: "800W - 1200W" },
      { label: "Material", value: "Corrosion-Resistant Cast Iron" },
    ],
    applications: [
      "Off-Grid Rural Irrigation",
      "Remote Community Supplies",
      "Sustainable Ranching",
      "Eco-Tourism Facilities",
    ],
  },
  {
    id: "solarray-dc500",
    name: "SolarRay DC500",
    category: "Solar Pumping Systems",
    categoryId: "solar",
    shortDesc: "DC surface booster paired with solar array for daylight pumping.",
    fullDesc:
      "Surface-mounted DC booster for daylight pumping to storage or irrigation blocks. Simple field wiring and dry-run protection for rural schemes.",
    price: "From $950",
    mainImg: "/assets/products/product-6.jpg",
    specs: ["45m Max Head", "Solar DC", "4 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "45 Meters" },
      { label: "Pumping Mode", value: "Solar DC" },
      { label: "Flow Rate", value: "4 m³/hr" },
      { label: "Controller", value: "MPPT" },
      { label: "Panel Requirement", value: "600W - 1000W" },
      { label: "Material", value: "Cast iron / SS options" },
    ],
    applications: ["Irrigation blocks", "Tank filling", "Livestock"],
  },
  {
    id: "helioflow-12",
    name: "HelioFlow 12",
    category: "Solar Pumping Systems",
    categoryId: "solar",
    shortDesc: "High-flow solar set for larger abstraction and distribution headers.",
    fullDesc:
      "Scaled solar pumping for larger fields and distribution headers. Redundant MPPT options and motor protection for long run hours in harsh climates.",
    price: "From $2,400",
    mainImg: "/assets/products/product-7.jpg",
    specs: ["75m Max Head", "Solar array", "12 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "75 Meters" },
      { label: "Flow Rate", value: "12 m³/hr" },
      { label: "Controller", value: "Dual MPPT option" },
      { label: "Panel Requirement", value: "1.5kW - 3kW" },
      { label: "Material", value: "Stainless / cast" },
    ],
    applications: ["Large irrigation", "Community water", "Ranching"],
  },
  {
    id: "turboflow-max",
    name: "TurboFlow Max",
    category: "Industrial Centrifugal",
    categoryId: "industrial",
    shortDesc: "Ultra-high volume pumping for large-scale industrial cooling and supply.",
    fullDesc:
      "Our most powerful surface pump, the TurboFlow Max is built for heavy industry. With a massive 15 HP motor and optimized intake geometry, it moves vast amounts of water for cooling towers, municipal distribution, and large-scale construction dewatering projects.",
    price: "From $3,800",
    mainImg: "/assets/products/product-8.jpg",
    specs: ["55m Max Head", "15 HP Motor", "65 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "55 Meters" },
      { label: "Motor Power", value: "15 HP / 11.2 kW" },
      { label: "Flow Rate", value: "65 m³/hr" },
      { label: "Voltage", value: "415V / 50Hz (3 Phase)" },
      { label: "Outlet Size", value: "4.0 Inches" },
      { label: "Cooling", value: "Air-Cooled Heavy Duty" },
    ],
    applications: [
      "Industrial Cooling Towers",
      "Municipal Supply Networks",
      "Construction Site Dewatering",
      "Flood Protection Systems",
    ],
  },
  {
    id: "centriflo-200",
    name: "CentriFlo 200",
    category: "Industrial Centrifugal",
    categoryId: "industrial",
    shortDesc: "End-suction centrifugal for process loops and booster duty.",
    fullDesc:
      "Versatile end-suction centrifugal for washdown, process circulation, and booster stations. Back pull-out design for faster maintenance.",
    price: "From $1,650",
    mainImg: "/assets/products/product-9.jpg",
    specs: ["48m Max Head", "10 HP Motor", "35 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "48 Meters" },
      { label: "Motor Power", value: "10 HP / 7.5 kW" },
      { label: "Flow Rate", value: "35 m³/hr" },
      { label: "Voltage", value: "415V / 50Hz" },
      { label: "Construction", value: "Cast iron casing" },
    ],
    applications: ["Process water", "Cooling loops", "Washdown"],
  },
  {
    id: "maxflow-hd400",
    name: "MaxFlow HD400",
    category: "Industrial Centrifugal",
    categoryId: "industrial",
    shortDesc: "Heavy-duty dewatering and transfer for sites and utilities.",
    fullDesc:
      "High-volume transfer and dewatering package for construction, quarry, and utility bypass. Staged impellers for stable performance across the curve.",
    price: "From $2,950",
    mainImg: "/assets/products/product-10.jpg",
    specs: ["40m Max Head", "20 HP Motor", "80 m³/hr"],
    detailedSpecs: [
      { label: "Max Head", value: "40 Meters" },
      { label: "Motor Power", value: "20 HP / 15 kW" },
      { label: "Flow Rate", value: "80 m³/hr" },
      { label: "Voltage", value: "415V / 50Hz (3 Phase)" },
      { label: "Construction", value: "Cast iron / bronze options" },
    ],
    applications: ["Dewatering", "Bypass pumping", "Bulk transfer"],
  },
];

/** One image per product: `product-N.jpg` ↔ Nth row in `productsList` (1–10) */
export function catalogMainImgForId(id: string): string | undefined {
  return productsList.find((p) => p.id === id)?.mainImg;
}
