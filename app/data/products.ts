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

export const productsList: Product[] = [
  {
    id: "aquamax-3000",
    name: "AquaMax 3000",
    category: "Submersible Pumps",
    categoryId: "submersible",
    shortDesc: "High-pressure borehole and well pumps engineered for industrial and agricultural water supply.",
    fullDesc: "The AquaMax 3000 is our flagship deep-borehole submersible pump. Designed for extreme durability in high-mineral water conditions, it features a unique stainless steel impeller system that resists abrasion and corrosion. Ideal for reliable agricultural irrigation and community water points.",
    price: "From $850",
    mainImg: "/assets/images/afrotech-10.jpg",
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
    fullDesc: "Engineered for high-volume extraction, the AquaMax 5000 delivers superior flow rates at significant depths. Its premium multi-stage design ensures consistent pressure for large-scale center-pivot and drip irrigation systems, even in challenging geological formations.",
    price: "From $1,450",
    mainImg: "/assets/images/afrotell-12.jpg",
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
    id: "solarflow-pro",
    name: "SolarFlow Pro",
    category: "Solar Pumping Systems",
    categoryId: "solar",
    shortDesc: "Sustainable, off-grid water solutions for remote locations and rural communities.",
    fullDesc: "The SolarFlow Pro is a complete off-grid pumping solution that eliminates fuel costs entirely. Featuring an advanced MPPT controller, it maximizes energy capture even on cloudy days. Perfect for remote agricultural projects where grid access is limited or unreliable.",
    price: "From $1,200",
    mainImg: "/assets/images/afrotech-11.jpg",
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
    id: "turboflow-max",
    name: "TurboFlow Max",
    category: "Industrial Centrifugal",
    categoryId: "industrial",
    shortDesc: "Ultra-high volume pumping for large-scale industrial cooling and supply.",
    fullDesc: "Our most powerful surface pump, the TurboFlow Max is built for heavy industry. With a massive 15 HP motor and optimized intake geometry, it moves vast amounts of water for cooling towers, municipal distribution, and large-scale construction dewatering projects.",
    price: "From $3,800",
    mainImg: "/assets/images/afrotech-13.jpg",
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
];
