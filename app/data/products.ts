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
 * Product catalog requested by business.
 * Note: existing image assets are reused across entries.
 */
export const productsList: Product[] = [
  {
    id: "scala2",
    name: "Grundfos SCALA2",
    category: "Domestic & Booster Pumps",
    categoryId: "domestic",
    shortDesc: "Compact all-in-one domestic booster for stable home water pressure.",
    fullDesc:
      "SCALA2 is a fully integrated pressure boosting system for homes and apartments. It is compact, quiet, and easy to install while maintaining consistent pressure across multiple outlets.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-1.jpg",
    specs: ["Domestic booster", "Compact unit", "Constant pressure"],
    detailedSpecs: [
      { label: "Pump Type", value: "Home pressure booster" },
      { label: "Application", value: "Domestic water pressure" },
      { label: "Installation", value: "Compact, all-in-one" },
      { label: "Use Case", value: "Apartments and residences" },
    ],
    applications: ["Home pressure boosting", "Tank-fed homes", "Apartments"],
  },
  {
    id: "mq-3-35",
    name: "Grundfos MQ 3-35",
    category: "Domestic & Booster Pumps",
    categoryId: "domestic",
    shortDesc: "Self-priming domestic pressure pump for homes and light duty.",
    fullDesc:
      "MQ 3-35 is a compact pressure booster built for reliable domestic supply. It supports household systems where consistent pressure and easy setup are a priority.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-2.jpg",
    specs: ["Self-priming", "Compact design", "Domestic duty"],
    detailedSpecs: [
      { label: "Pump Type", value: "Pressure booster" },
      { label: "Priming", value: "Self-priming" },
      { label: "Application", value: "Domestic and light commercial" },
      { label: "Installation", value: "Easy retrofit" },
    ],
    applications: ["Homes", "Small buildings", "Pressure stabilization"],
  },
  {
    id: "cm-3-4",
    name: "Grundfos CM 3-4",
    category: "Domestic & Booster Pumps",
    categoryId: "domestic",
    shortDesc: "Modular horizontal multistage pump for boosting and transfer.",
    fullDesc:
      "CM 3-4 is a compact multistage pump suitable for pressure boosting and clean-water transfer. Its modular design supports reliable operation in residential and utility systems.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-3.jpg",
    specs: ["Multistage", "Compact footprint", "Pressure boosting"],
    detailedSpecs: [
      { label: "Pump Type", value: "Horizontal multistage" },
      { label: "Application", value: "Boosting and transfer" },
      { label: "Fluid", value: "Clean water" },
      { label: "Configuration", value: "Modular" },
    ],
    applications: ["Domestic boosting", "Transfer systems", "Light commercial"],
  },
  {
    id: "cme-series",
    name: "Grundfos CME Series",
    category: "Domestic & Booster Pumps",
    categoryId: "domestic",
    shortDesc: "Variable-speed pressure boosting series with intelligent control.",
    fullDesc:
      "CME pumps combine CM hydraulics with an integrated variable-speed drive for accurate pressure control and improved energy efficiency in booster applications.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-4.jpg",
    specs: ["Variable speed", "Pressure control", "Energy efficient"],
    detailedSpecs: [
      { label: "Pump Type", value: "Variable-speed multistage" },
      { label: "Control", value: "Integrated frequency converter" },
      { label: "Application", value: "Booster systems" },
      { label: "Benefit", value: "Stable pressure and reduced energy use" },
    ],
    applications: ["Residential boosters", "Commercial supply", "Process water"],
  },
  {
    id: "cmbe-booster-set",
    name: "Grundfos CMBE Booster Set",
    category: "Domestic & Booster Pumps",
    categoryId: "domestic",
    shortDesc: "Complete constant-pressure booster set for home and building supply.",
    fullDesc:
      "CMBE is an integrated booster package with intelligent control for constant pressure delivery. It is widely used where pressure stability and easy commissioning are required.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-5.jpg",
    specs: ["Booster set", "Constant pressure", "Ready package"],
    detailedSpecs: [
      { label: "Pump Type", value: "Integrated booster set" },
      { label: "Control", value: "Variable-speed pressure control" },
      { label: "Application", value: "Domestic and light commercial" },
      { label: "Feature", value: "Quick installation package" },
    ],
    applications: ["Homes", "Small buildings", "Pressure boosting"],
  },
  {
    id: "upa-15-90",
    name: "Grundfos UPA 15-90",
    category: "Domestic & Booster Pumps",
    categoryId: "domestic",
    shortDesc: "Compact home booster for low-pressure tap and shower improvement.",
    fullDesc:
      "UPA 15-90 is a compact inline booster designed to increase pressure at household points of use. It is popular for easy upgrades in existing domestic piping.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-6.jpg",
    specs: ["Inline booster", "Low-noise", "Home pressure support"],
    detailedSpecs: [
      { label: "Pump Type", value: "Inline domestic booster" },
      { label: "Application", value: "Tap and shower pressure improvement" },
      { label: "Installation", value: "Compact retrofit" },
      { label: "Use Case", value: "Residential homes" },
    ],
    applications: ["Home pressure improvement", "Tap boosting", "Apartment use"],
  },
  {
    id: "sq-1-35",
    name: "Grundfos SQ 1-35",
    category: "Borehole / Submersible Pumps",
    categoryId: "borehole",
    shortDesc: "Slim 3-inch borehole submersible for domestic and farm wells.",
    fullDesc:
      "SQ 1-35 is a compact borehole pump for deep-well extraction where dependable operation and efficient performance are required.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-7.jpg",
    specs: ["3-inch submersible", "Deep-well duty", "Efficient operation"],
    detailedSpecs: [
      { label: "Pump Type", value: "Borehole submersible" },
      { label: "Diameter", value: "3-inch class" },
      { label: "Application", value: "Domestic and farm boreholes" },
      { label: "Installation", value: "Deep wells" },
    ],
    applications: ["Deep well water supply", "Farm supply", "Rural homes"],
  },
  {
    id: "sq-3-65",
    name: "Grundfos SQ 3-65",
    category: "Borehole / Submersible Pumps",
    categoryId: "borehole",
    shortDesc: "Higher-capacity SQ borehole pump for demanding deep-well supply.",
    fullDesc:
      "SQ 3-65 delivers increased flow and head for larger domestic or agricultural borehole requirements with trusted SQ-series reliability.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-8.jpg",
    specs: ["3-inch submersible", "High head", "Borehole supply"],
    detailedSpecs: [
      { label: "Pump Type", value: "Borehole submersible" },
      { label: "Diameter", value: "3-inch class" },
      { label: "Application", value: "High-demand well systems" },
      { label: "Use Case", value: "Farms and estates" },
    ],
    applications: ["Boreholes", "Agricultural supply", "Community water points"],
  },
  {
    id: "sqe-series",
    name: "Grundfos SQE Series",
    category: "Borehole / Submersible Pumps",
    categoryId: "borehole",
    shortDesc: "Smart SQ borehole pumps with variable-speed and control integration.",
    fullDesc:
      "The SQE series adds intelligent speed control and system communication, enabling advanced pressure control in borehole applications.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-9.jpg",
    specs: ["Smart control", "Variable speed", "Borehole optimized"],
    detailedSpecs: [
      { label: "Pump Type", value: "Intelligent borehole submersible" },
      { label: "Control", value: "Variable-speed operation" },
      { label: "Application", value: "Smart borehole systems" },
      { label: "Benefit", value: "Stable pressure with efficiency" },
    ],
    applications: ["Smart home water systems", "Remote monitoring", "Pressure management"],
  },
  {
    id: "sp-series",
    name: "Grundfos SP Series",
    category: "Borehole / Submersible Pumps",
    categoryId: "borehole",
    shortDesc: "Heavy-duty stainless steel borehole pumps for large systems.",
    fullDesc:
      "SP series pumps are built for high-demand borehole and water supply duty with robust stainless steel construction for long service life.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-10.jpg",
    specs: ["Heavy duty", "Stainless steel", "Deep-well supply"],
    detailedSpecs: [
      { label: "Pump Type", value: "Heavy-duty borehole submersible" },
      { label: "Material", value: "Stainless steel hydraulic parts" },
      { label: "Application", value: "Municipal and large farm supply" },
      { label: "Duty", value: "Continuous high-demand operation" },
    ],
    applications: ["Large boreholes", "Water utilities", "Industrial abstraction"],
  },
  {
    id: "sba-3-45-a",
    name: "Grundfos SBA 3-45 A",
    category: "Borehole / Submersible Pumps",
    categoryId: "borehole",
    shortDesc: "Submersible booster for clean-water tanks and shallow wells.",
    fullDesc:
      "SBA 3-45 A is an all-in-one submerged pressure booster for clean water transfer from tanks and shallow sources with quiet operation.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-1.jpg",
    specs: ["Submerged booster", "Quiet operation", "Tank/well duty"],
    detailedSpecs: [
      { label: "Pump Type", value: "Submerged pressure booster" },
      { label: "Application", value: "Tanks and shallow wells" },
      { label: "Feature", value: "Quiet operation" },
      { label: "Fluid", value: "Clean water" },
    ],
    applications: ["Storage tank boosting", "Garden supply", "Domestic transfer"],
  },
  {
    id: "sba-3-45-aw",
    name: "Grundfos SBA 3-45 AW",
    category: "Borehole / Submersible Pumps",
    categoryId: "borehole",
    shortDesc: "SBA variant with intake strainer setup for cleaner operation.",
    fullDesc:
      "SBA 3-45 AW is designed for submerged boosting with improved source handling and dependable pressure delivery in domestic and utility setups.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-2.jpg",
    specs: ["Submerged booster", "Reliable pressure", "Domestic utility use"],
    detailedSpecs: [
      { label: "Pump Type", value: "Submerged pressure booster" },
      { label: "Application", value: "Tank and shallow source supply" },
      { label: "Feature", value: "Integrated source handling" },
      { label: "Fluid", value: "Clean water" },
    ],
    applications: ["Home water supply", "Utility transfer", "Light irrigation"],
  },
  {
    id: "sqflex-1-2-3",
    name: "Grundfos SQFlex 1.2-3",
    category: "Solar Water Pumps",
    categoryId: "solar",
    shortDesc: "Solar-compatible borehole pump for off-grid water access.",
    fullDesc:
      "SQFlex 1.2-3 is built for off-grid pumping using solar energy, ideal for remote communities and farm systems without reliable grid power.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-3.jpg",
    specs: ["Solar compatible", "Off-grid ready", "Borehole duty"],
    detailedSpecs: [
      { label: "Power Source", value: "Solar / hybrid compatibility" },
      { label: "Pump Type", value: "Submersible borehole pump" },
      { label: "Application", value: "Off-grid water supply" },
      { label: "Use Case", value: "Rural and farm deployments" },
    ],
    applications: ["Off-grid boreholes", "Rural water projects", "Farm supply"],
  },
  {
    id: "sqflex-2-5-2",
    name: "Grundfos SQFlex 2.5-2",
    category: "Solar Water Pumps",
    categoryId: "solar",
    shortDesc: "SQFlex solar pumping model for reliable remote water lifting.",
    fullDesc:
      "SQFlex 2.5-2 supports remote pumping duty with efficient solar-powered operation for irrigation and rural household systems.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-4.jpg",
    specs: ["Solar powered", "Efficient lifting", "Remote installations"],
    detailedSpecs: [
      { label: "Power Source", value: "Solar / hybrid compatibility" },
      { label: "Pump Type", value: "Submersible solar pump" },
      { label: "Application", value: "Irrigation and household supply" },
      { label: "Installation", value: "Off-grid sites" },
    ],
    applications: ["Solar irrigation", "Rural water", "Tank filling"],
  },
  {
    id: "sqflex-3a-10",
    name: "Grundfos SQFlex 3A-10",
    category: "Solar Water Pumps",
    categoryId: "solar",
    shortDesc: "Higher-head SQFlex model for deeper off-grid applications.",
    fullDesc:
      "SQFlex 3A-10 is configured for deeper abstraction and reliable daytime pumping in remote and agricultural installations.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-5.jpg",
    specs: ["Higher head", "Solar operation", "Deep source capable"],
    detailedSpecs: [
      { label: "Power Source", value: "Solar / hybrid compatibility" },
      { label: "Pump Type", value: "Submersible solar pump" },
      { label: "Application", value: "Deeper well off-grid pumping" },
      { label: "Use Case", value: "Agriculture and remote communities" },
    ],
    applications: ["Deep off-grid boreholes", "Farms", "Community projects"],
  },
  {
    id: "crflex-series",
    name: "Grundfos CRFlex Series",
    category: "Solar Water Pumps",
    categoryId: "solar",
    shortDesc: "Solar-configurable CR platform for larger transfer systems.",
    fullDesc:
      "CRFlex adapts the CR platform for renewable-powered applications, supporting higher-demand transfer and pressure tasks in solar-centric projects.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-6.jpg",
    specs: ["CR platform", "Solar integration", "High-demand transfer"],
    detailedSpecs: [
      { label: "Pump Type", value: "Multistage transfer platform" },
      { label: "Power Source", value: "Solar-enabled system design" },
      { label: "Application", value: "Large transfer and boosting" },
      { label: "Use Case", value: "Commercial off-grid water systems" },
    ],
    applications: ["Solar transfer stations", "Commercial irrigation", "Utility backup systems"],
  },
  {
    id: "cr-series",
    name: "Grundfos CR Series (CR/CRI/CRN)",
    category: "Industrial & Commercial Pumps",
    categoryId: "industrial",
    shortDesc: "Vertical multistage pumps for pressure, process, and treatment systems.",
    fullDesc:
      "The CR family is widely used in industrial and commercial systems requiring high efficiency, pressure boosting, and reliable process-water movement.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-7.jpg",
    specs: ["Vertical multistage", "High efficiency", "Commercial/industrial duty"],
    detailedSpecs: [
      { label: "Pump Family", value: "CR / CRI / CRN" },
      { label: "Application", value: "Boosting, process, water treatment" },
      { label: "Installation", value: "Commercial and industrial plants" },
      { label: "Benefit", value: "Efficient multistage performance" },
    ],
    applications: ["HVAC systems", "Water treatment", "Pressure boosting"],
  },
  {
    id: "magna3",
    name: "Grundfos MAGNA3",
    category: "Industrial & Commercial Pumps",
    categoryId: "industrial",
    shortDesc: "Smart circulator for advanced HVAC and building systems.",
    fullDesc:
      "MAGNA3 is a high-efficiency intelligent circulator designed for modern heating and cooling networks with advanced control features.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-8.jpg",
    specs: ["Smart circulator", "HVAC optimized", "High efficiency"],
    detailedSpecs: [
      { label: "Pump Type", value: "Intelligent circulator" },
      { label: "Application", value: "Heating and cooling loops" },
      { label: "Control", value: "Integrated smart control" },
      { label: "Benefit", value: "Energy-efficient operation" },
    ],
    applications: ["Commercial HVAC", "District cooling", "Building services"],
  },
  {
    id: "magna1",
    name: "Grundfos MAGNA1",
    category: "Industrial & Commercial Pumps",
    categoryId: "industrial",
    shortDesc: "Reliable circulator for core HVAC circulation duty.",
    fullDesc:
      "MAGNA1 provides efficient and dependable circulation for heating and cooling systems with straightforward setup and robust operation.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-9.jpg",
    specs: ["Circulator", "HVAC duty", "Efficient operation"],
    detailedSpecs: [
      { label: "Pump Type", value: "Circulator pump" },
      { label: "Application", value: "Building HVAC circulation" },
      { label: "Control", value: "Simple operation profile" },
      { label: "Benefit", value: "Reliable continuous service" },
    ],
    applications: ["HVAC loops", "Commercial buildings", "Institutional facilities"],
  },
  {
    id: "cm-series-industrial",
    name: "Grundfos CM Series (Industrial)",
    category: "Industrial & Commercial Pumps",
    categoryId: "industrial",
    shortDesc: "Compact multistage pump platform for industrial utilities.",
    fullDesc:
      "CM series units are used in industrial utility systems where compact size, pressure capability, and clean-water handling are essential.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-10.jpg",
    specs: ["Compact multistage", "Industrial utility", "Pressure capable"],
    detailedSpecs: [
      { label: "Pump Type", value: "Horizontal multistage" },
      { label: "Application", value: "Industrial utility services" },
      { label: "Fluid", value: "Clean/process-compatible water" },
      { label: "Benefit", value: "Compact installation profile" },
    ],
    applications: ["Process support", "Pressure boosting", "Water transfer"],
  },
  {
    id: "ups-25-40",
    name: "Grundfos UPS 25-40",
    category: "Bonus Models",
    categoryId: "bonus",
    shortDesc: "Widely used circulator for heating and circulation systems.",
    fullDesc:
      "UPS 25-40 is a common circulator model for dependable water circulation in heating and utility loops.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-1.jpg",
    specs: ["Circulator", "Heating systems", "Proven model"],
    detailedSpecs: [
      { label: "Pump Type", value: "Circulator" },
      { label: "Application", value: "Heating/circulation loops" },
      { label: "Use Case", value: "Residential and light commercial" },
      { label: "Benefit", value: "Widely installed and trusted" },
    ],
    applications: ["Heating circulation", "Hydronic loops", "Building services"],
  },
  {
    id: "alpha2-alpha3",
    name: "Grundfos ALPHA2 / ALPHA3",
    category: "Bonus Models",
    categoryId: "bonus",
    shortDesc: "Modern high-efficiency circulators for heating systems.",
    fullDesc:
      "ALPHA2 and ALPHA3 are advanced circulators designed for energy-efficient heating operation and easy integration in modern systems.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-2.jpg",
    specs: ["High efficiency", "Heating systems", "Smart circulator"],
    detailedSpecs: [
      { label: "Pump Type", value: "High-efficiency circulator" },
      { label: "Application", value: "Heating systems" },
      { label: "Control", value: "Adaptive operation features" },
      { label: "Benefit", value: "Lower energy consumption" },
    ],
    applications: ["Residential heating", "Light commercial HVAC", "Retrofits"],
  },
  {
    id: "unilift-kp-ap",
    name: "Grundfos Unilift KP / AP",
    category: "Bonus Models",
    categoryId: "bonus",
    shortDesc: "Drainage and wastewater transfer pumps for utility duty.",
    fullDesc:
      "Unilift KP/AP ranges are widely used for drainage, sump emptying, and general wastewater handling in residential and commercial contexts.",
    price: "Contact for quote",
    mainImg: "/assets/products/product-3.jpg",
    specs: ["Drainage duty", "Sump applications", "Utility transfer"],
    detailedSpecs: [
      { label: "Pump Type", value: "Drainage / wastewater pump" },
      { label: "Application", value: "Sumps and drainage pits" },
      { label: "Use Case", value: "Residential and commercial drainage" },
      { label: "Benefit", value: "Reliable dewatering performance" },
    ],
    applications: ["Drainage", "Flooded area clearing", "Wastewater transfer"],
  },
];

/** Returns assigned image for any catalog product ID */
export function catalogMainImgForId(id: string): string | undefined {
  return productsList.find((p) => p.id === id)?.mainImg;
}
