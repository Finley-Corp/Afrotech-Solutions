export type FeaturedProject = {
  id: string;
  title: string;
  location: string;
  metric: string;
  date: string;
  desc: string;
  img: string;
  category: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "mau-forest-irrigation",
    title: "Mau Forest Highland Irrigation",
    location: "Nakuru, Kenya",
    metric: "150 Hectares Irrigated",
    date: "2024",
    desc: "Installed high-efficiency AquaMax solar pumping systems to automate irrigation for dairy and vegetable farmers, replacing fuel-based pumps and stabilizing daily output.",
    img: "/assets/images/afrotech-1.jpg",
    category: "Agricultural",
  },
  {
    id: "mombasa-port-cooling",
    title: "Mombasa Port Cooling Systems",
    location: "Kilindini, Kenya",
    metric: "35% Energy Savings",
    date: "2023",
    desc: "Upgraded port-side cooling and fire safety networks with high-volume TurboFlow centrifugal pumps, improving efficiency and reducing recurring utility costs.",
    img: "/assets/images/afrotech-14.jpg",
    category: "Industrial",
  },
  {
    id: "kisumu-water-hub",
    title: "Kisumu Central Water Hub",
    location: "Kisumu, Kenya",
    metric: "50,000+ People Served",
    date: "2024",
    desc: "Modernized the central pumping station with synchronized multi-pump systems to improve pressure stability and continuity across the municipal distribution network.",
    img: "/assets/images/afrotech-9.jpg",
    category: "Municipal",
  },
  {
    id: "nairobi-supply-stabilization",
    title: "Industrial Supply Stabilization",
    location: "Nairobi, Kenya",
    metric: "99.9% Uptime Target",
    date: "2024",
    desc: "Delivered a duty/standby pumping architecture with monitoring points that improved reliability for continuous-duty process operations.",
    img: "/assets/images/afrotech-13.jpg",
    category: "Infrastructure",
  },
];
