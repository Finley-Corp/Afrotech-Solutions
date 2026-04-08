export type Industry = {
  id: string;
  title: string;
  icon: string;
  description: string;
  overview: string;
  deepDive: string;
  projectExamples: string[];
  challenges: string[];
  solutions: string[];
  benefits: string[];
  image: string;
  productsLink: string;
};

export const industries: Industry[] = [
  {
    id: "agricultural",
    title: "Agricultural Sector",
    icon: "lucide:sprout",
    description:
      "Reliable water systems for irrigation, livestock, and post-harvest operations in remote and off-grid environments.",
    overview:
      "From smallholder farms to commercial estates, we design pumping systems that keep operations productive throughout seasonal shifts. Our team focuses on durability, predictable operating costs, and simple field maintenance.",
    deepDive:
      "Agricultural operations often fail not because of poor land quality, but because water delivery is inconsistent at the point of use. We engineer complete farm water systems, from borehole abstraction and transfer to field distribution, with controls that are practical for daily farm operations. This means selecting pumps that match drawdown conditions, designing line pressure around irrigation needs, and ensuring storage and delivery remain stable during peak demand windows.\n\nFor clients operating in off-grid regions, we prioritize energy-efficient solar configurations with protective controls, so systems remain reliable without constant intervention. We also account for expansion, allowing farms to add acreage, livestock, or secondary zones without replacing the entire pumping setup.",
    projectExamples: [
      "Solar borehole systems feeding drip and sprinkler irrigation blocks",
      "Livestock watering networks with elevated storage and gravity distribution",
      "Packhouse supply lines for produce washing and post-harvest operations",
    ],
    challenges: [
      "Unstable grid access and high fuel costs",
      "Seasonal water table fluctuations",
      "Long distances between source and field",
      "Limited on-site technical support",
    ],
    solutions: [
      "Solar-powered borehole pumping systems",
      "Pressure-managed irrigation supply lines",
      "Storage tank filling automation",
      "Rugged controller and protection setups",
    ],
    benefits: [
      "Precision irrigation control",
      "Solar-powered off-grid capability",
      "Livestock water management",
      "Increased crop yield reliability",
    ],
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
    productsLink: "/products#solar",
  },
  {
    id: "industrial",
    title: "Industrial & Manufacturing",
    icon: "lucide:factory",
    description:
      "High-volume pumping infrastructure for process water, cooling loops, washdown systems, and operational resilience.",
    overview:
      "Industrial facilities need consistent water performance under continuous load. We help manufacturers reduce downtime by sizing systems correctly, improving pump-room reliability, and planning maintenance access from day one.",
    deepDive:
      "Industrial environments demand more than just high flow; they require predictable output under variable operating conditions. We support manufacturing teams with end-to-end pumping design that covers process supply, cooling loops, transfer duty, and emergency backup. Every design starts with duty profiling so pump curves, motor sizing, and control logic align to real production behavior rather than nominal assumptions.\n\nWe also place strong emphasis on lifecycle reliability. That includes corrosion-aware material selection, maintainable layouts, and system redundancy where uptime is critical. The result is a water system that sustains production quality while reducing avoidable shutdowns and maintenance risk.",
    projectExamples: [
      "Continuous-duty process water circulation for production lines",
      "Cooling water transfer systems with staged pump control",
      "High-pressure utility loops for washdown and plant services",
    ],
    challenges: [
      "Continuous-duty operational pressure",
      "Variable flow and pressure demand",
      "Downtime risk during peak production",
      "Harsh environments and contamination",
    ],
    solutions: [
      "Process and cooling water transfer systems",
      "High-pressure wash and service water loops",
      "Backup pump and panel configurations",
      "Monitoring points for preventive maintenance",
    ],
    benefits: [
      "Process cooling systems",
      "Effluent and wastewater handling",
      "High-pressure wash systems",
      "Fire suppression network support",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    productsLink: "/products#industrial",
  },
  {
    id: "municipal",
    title: "Municipal & Utility",
    icon: "lucide:building-2",
    description:
      "Scalable pumping systems for public water supply, regional distribution, and long-life utility infrastructure.",
    overview:
      "Municipal operators require systems that deliver stable service across growing populations and mixed terrain. We support planning teams with practical designs that balance efficiency, uptime, and straightforward long-term maintenance.",
    deepDive:
      "Municipal water infrastructure is expected to perform continuously despite variable demand, aged assets, and constrained operating budgets. We work with utility and local authority teams to modernize supply systems through practical, phased interventions. That includes borehole field planning, trunk transfer support, booster station design, and pressure management strategies that reduce service interruptions.\n\nOur approach is built around long-term operability. We prioritize resilient equipment choices, efficient pumping duty points, and clear maintenance pathways so local teams can sustain performance over years of operation, not just during commissioning.",
    projectExamples: [
      "Community supply stations linked to distributed borehole sources",
      "Booster pumping upgrades for low-pressure service zones",
      "Energy optimization retrofits for aging municipal pump stations",
    ],
    challenges: [
      "Growing demand with aging infrastructure",
      "Distribution pressure inconsistency",
      "Energy consumption constraints",
      "Service continuity expectations",
    ],
    solutions: [
      "Main station and booster pump integration",
      "Borehole and distribution network planning",
      "Energy-conscious retrofit recommendations",
      "Operational handover and support guidance",
    ],
    benefits: [
      "Community water distribution",
      "Main pumping station support",
      "Borehole network management",
      "Energy-efficient upgrades",
    ],
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80",
    productsLink: "/products#submersible",
  },
  {
    id: "construction",
    title: "Construction & Dewatering",
    icon: "lucide:hard-hat",
    description:
      "Portable and heavy-duty dewatering solutions for excavation, site stabilization, and temporary water movement.",
    overview:
      "Construction timelines are sensitive to water-related delays. We provide rapid-deployment pumping setups that improve site safety and keep projects moving through changing weather and ground conditions.",
    deepDive:
      "On active construction sites, uncontrolled water quickly impacts safety, excavation integrity, and project schedule. We design and supply dewatering systems that can be mobilized quickly, scaled as conditions change, and maintained under heavy site use. Our team assesses expected inflow patterns, pumping distances, and discharge constraints to define practical configurations for each stage of works.\n\nBecause site conditions evolve, we prioritize flexible layouts with equipment and connections that can be reconfigured with minimal downtime. This helps contractors maintain excavation progress, reduce standing-water risk, and protect downstream tasks from weather or groundwater disruptions.",
    projectExamples: [
      "Excavation dewatering packages for foundations and basements",
      "Temporary bypass pumping during drainage and utility works",
      "Rain-event response systems for large earthwork sites",
    ],
    challenges: [
      "Unexpected water ingress on active sites",
      "Frequent equipment relocation needs",
      "Demand spikes during rainfall events",
      "Tough handling and environmental exposure",
    ],
    solutions: [
      "Site-ready centrifugal dewatering packages",
      "Temporary transfer and bypass pumping lines",
      "Flexible hose and connection configurations",
      "Pump selection guidance per ground condition",
    ],
    benefits: [
      "Excavation dewatering performance",
      "Temporary water supply support",
      "Concrete batching supply continuity",
      "Erosion and runoff control support",
    ],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    productsLink: "/products#industrial",
  },
  {
    id: "hospitality",
    title: "Hospitality & Real Estate",
    icon: "lucide:hotel",
    description:
      "Reliable water pressure and distribution systems for hotels, apartments, and mixed-use property developments.",
    overview:
      "Hospitality and real estate facilities depend on consistent water delivery to maintain guest experience, tenant comfort, and building operations. We design pumping systems for domestic supply, booster pressure, and storage transfer across both mid-rise and large-scale developments.",
    deepDive:
      "In hospitality and real estate projects, water issues are noticed immediately by guests and tenants, making reliability non-negotiable. Our approach focuses on stable pressure zoning, predictable transfer cycles, and resilient system layouts that maintain service during peak-use periods.\n\nWe coordinate closely with MEP teams and facilities managers to ensure pump selection, controls, and storage strategy align with occupancy patterns and operational realities. This creates systems that are efficient, maintainable, and ready for long-term property management.",
    projectExamples: [
      "Booster systems for multi-floor apartment blocks",
      "Domestic transfer pumping for hotel utility zones",
      "Pressure stabilization upgrades in mixed-use properties",
    ],
    challenges: [
      "Peak-hour demand spikes from high occupancy",
      "Pressure drops across upper floors",
      "Limited plant room access in existing properties",
      "Tenant disruption risk during maintenance",
    ],
    solutions: [
      "Variable-speed booster pump systems",
      "Duty-standby configuration for continuity",
      "Storage and transfer optimization",
      "Compact layouts for constrained service rooms",
    ],
    benefits: [
      "Stable water pressure across floors",
      "Improved service continuity for occupants",
      "Reduced complaints and operational disruptions",
      "Lower lifecycle maintenance risk",
    ],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    productsLink: "/products#submersible",
  },
  {
    id: "mining",
    title: "Mining & Quarry Operations",
    icon: "lucide:pickaxe",
    description:
      "Heavy-duty pumping solutions for pit dewatering, slurry handling support, and remote site water movement.",
    overview:
      "Mining and quarry operations require robust pumping systems that perform under abrasive conditions, long duty cycles, and remote logistics constraints. We support extraction sites with dependable water transfer and dewatering infrastructure.",
    deepDive:
      "Water management in mining operations directly impacts productivity, safety, and equipment life. We design systems that account for variable inflow, long pumping distances, and the harsh conditions common to extraction environments. Reliability and serviceability are prioritized from the start.\n\nOur team helps sites structure pumping strategy by work zone, from active pit control to process support and utility transfer. This approach minimizes downtime, improves safety compliance, and keeps critical operations moving under demanding conditions.",
    projectExamples: [
      "Open-pit dewatering lines with staged transfer",
      "Quarry sump pumping and temporary bypass systems",
      "Remote transfer packages for operational water supply",
    ],
    challenges: [
      "High solids and abrasive operating environments",
      "Large elevation changes and long transfer distances",
      "Difficult maintenance access in remote areas",
      "Downtime impact on production schedules",
    ],
    solutions: [
      "Rugged dewatering pump configurations",
      "Segmented transfer strategy for long runs",
      "Service-friendly installation planning",
      "Backup pumping for critical process points",
    ],
    benefits: [
      "Improved pit and site water control",
      "Reduced weather-related operational delays",
      "Higher reliability in remote operations",
      "Better continuity of production support systems",
    ],
    image:
      "https://source.unsplash.com/1200x800/?mining,quarry,industry",
    productsLink: "/products#industrial",
  },
  {
    id: "healthcare",
    title: "Healthcare Facilities",
    icon: "lucide:heart-pulse",
    description:
      "Continuous water service solutions for hospitals, clinics, and laboratory facilities with critical uptime requirements.",
    overview:
      "Healthcare facilities need stable water systems to support hygiene, sterilization, utilities, and patient services. We help institutions design and maintain pumping infrastructure that prioritizes continuity, redundancy, and operational safety.",
    deepDive:
      "In healthcare environments, even short water disruptions can affect essential services. Our designs emphasize resilient operation through duty-standby arrangements, pressure stability, and practical maintenance access for technical teams.\n\nWe collaborate with facilities and engineering teams to align system capacity with ward demand, utility zones, and future expansion. This creates reliable infrastructure that supports high service standards while remaining manageable for day-to-day operations.",
    projectExamples: [
      "Hospital domestic water booster systems",
      "Utility transfer pumping for sterilization and service blocks",
      "Redundancy upgrades for critical healthcare campuses",
    ],
    challenges: [
      "Strict uptime expectations for essential services",
      "Variable demand across wards and departments",
      "High sensitivity to pressure instability",
      "Need for safe, planned maintenance windows",
    ],
    solutions: [
      "Redundant booster and transfer configurations",
      "Pressure-managed zoning for critical areas",
      "Panel and control upgrades for reliability",
      "Maintenance-first plant room design",
    ],
    benefits: [
      "Improved service continuity for care environments",
      "Stable utility support for daily operations",
      "Lower risk of emergency service interruptions",
      "Greater long-term infrastructure resilience",
    ],
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
    productsLink: "/products#industrial",
  },
  {
    id: "education",
    title: "Education & Institutional Campuses",
    icon: "lucide:graduation-cap",
    description:
      "Efficient water pumping systems for schools, universities, hostels, and large institutional facilities.",
    overview:
      "Educational institutions depend on dependable water supply for classrooms, residences, dining facilities, and sanitation services. We support campus operators with scalable pumping systems that serve daily demand and long-term growth.",
    deepDive:
      "Campus environments combine diverse consumption profiles, from daytime academic blocks to evening residential peaks. We design water systems that manage these usage variations while maintaining stable pressure and dependable storage transfer.\n\nOur solutions are planned for ease of operation by in-house maintenance teams, with clear layouts and practical component selection. This ensures institutions can sustain reliable utility services without excessive operational complexity.",
    projectExamples: [
      "Campus-wide booster systems for multi-building distribution",
      "Hostel and residence transfer pumping infrastructure",
      "Utility upgrades for expanding institutional facilities",
    ],
    challenges: [
      "Highly variable demand across campus zones",
      "Aging utility infrastructure in established institutions",
      "Budget constraints for phased upgrades",
      "Pressure balancing across spread-out buildings",
    ],
    solutions: [
      "Zone-based distribution and boosting strategies",
      "Energy-conscious retrofit planning",
      "Storage-driven transfer optimization",
      "Phased implementation for operational continuity",
    ],
    benefits: [
      "More consistent supply across campus facilities",
      "Reduced pressure and service interruptions",
      "Easier maintenance for institutional teams",
      "Scalable design for future expansion",
    ],
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    productsLink: "/products#submersible",
  },
  {
    id: "marine",
    title: "Marine & Port Infrastructure",
    icon: "lucide:ship",
    description:
      "Water movement and utility pumping solutions for ports, dock facilities, and marine-adjacent operations.",
    overview:
      "Marine and port environments need robust pumping systems that withstand corrosive conditions and variable duty demands. We help operators maintain dependable transfer, drainage, and utility services in coastal and waterfront facilities.",
    deepDive:
      "Port and marine operations face unique exposure challenges, including corrosive air, heavy-duty cycles, and fluctuating operational loads. Our engineering approach emphasizes materials suitability, protective configuration, and maintainable system architecture.\n\nBy combining reliable pump selection with practical installation strategy, we help marine facilities reduce outages and maintain critical utility support. Designs are tailored to real operating workflows, including phased maintenance and high-availability service requirements.",
    projectExamples: [
      "Dock utility and transfer pumping support systems",
      "Stormwater and drainage movement for port zones",
      "Corrosion-aware upgrade projects in coastal facilities",
    ],
    challenges: [
      "Corrosive operating environment near coastline",
      "Heavy load variation across port operations",
      "Critical service dependencies on utility uptime",
      "Demanding maintenance conditions",
    ],
    solutions: [
      "Material-conscious pump and component selection",
      "Protected control and panel arrangements",
      "High-availability duty/standby system design",
      "Service-access-first installation planning",
    ],
    benefits: [
      "Improved reliability in marine conditions",
      "Reduced utility-related operational delays",
      "Lower long-term maintenance burden",
      "Stronger resilience for critical port services",
    ],
    image:
      "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?w=1200&q=80",
    productsLink: "/products#industrial",
  },
];

export const getIndustryById = (id: string): Industry | undefined =>
  industries.find((industry) => industry.id === id);
