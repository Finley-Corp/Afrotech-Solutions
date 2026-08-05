/**
 * About page content — distributor positioning (confirmed: option B).
 *
 * Pending stakeholder backfill (do not invent):
 * - Founding year / milestone timeline
 * - Named leadership titles & bios beyond published contacts
 * - Exact regional hub/office list (homepage previously claimed "12" without substantiation)
 * - ISO / warranty certificate files if any are confirmed later
 */

export const howWeWorkPhases = [
  {
    step: "01 — Assess",
    title: "Site & duty profiling",
    text: "We review source, demand, power, elevation, and operating conditions before recommending equipment — so selection matches the real duty, not a catalogue guess.",
    image: "/assets/images/afrotech-6.jpg",
  },
  {
    step: "02 — Engineer",
    title: "System design & selection",
    text: "Pump curves, controls, and redundancy are sized for your operating envelope, using Grundfos, KSB, and Wilo ranges we supply and support across East Africa.",
    image: "/assets/images/afrotech-7.jpg",
  },
  {
    step: "03 — Deliver",
    title: "Commissioning & support",
    text: "Installation guidance, startup checks, handover documentation, and ongoing technical response — so systems stay reliable after they go live.",
    image: "/assets/images/afrotech-8.jpg",
  },
];

export const qualityCommitments = [
  "Sourced from certified manufacturers (Grundfos, KSB, Wilo)",
  "Specification matched to your duty point before order",
  "Receipt inspection and handling standards before dispatch",
  "Manufacturer warranty support through our regional team",
];

export const coreValues = [
  {
    title: "Engineering Reliability",
    icon: "lucide:settings",
    desc: "We specify pumps for actual site duty — flow, head, fluid, and power — so equipment performs under East African operating conditions.",
  },
  {
    title: "Energy Efficiency",
    icon: "lucide:zap",
    desc: "Optimizing flow-to-power ratios and duty-point efficiency to reduce operating cost over the life of the system.",
  },
  {
    title: "Local Support",
    icon: "lucide:map-pin",
    desc: "Technical response across Kenya and Eastern Africa for diagnostics, spare parts coordination, and field support.",
  },
];

/**
 * Role-based capability areas until full leadership bios are provided.
 * Named contacts (with provisional roles) live in lib/company.ts and on /contact —
 * feed those into this section once titles are stakeholder-confirmed.
 */
export const teamCapabilities = [
  {
    name: "Field Engineering",
    detail:
      "Duty profiling, hydraulic selection, and commissioning support sized for real operating pressure — not ideal lab assumptions.",
  },
  {
    name: "Technical Support",
    detail:
      "Diagnostics, practical recommendations, and coordinated response to keep uptime stable on active sites.",
  },
  {
    name: "Operations & Logistics",
    detail:
      "Availability, delivery coordination, and spare readiness treated as part of system performance.",
  },
];

/** Soften hub claims until a verified office/service-point list exists. */
export const REGIONAL_PRESENCE_COPY =
  "Based in Nairobi with technical support across Kenya and Eastern Africa — including coverage into Tanzania — so clients get practical on-the-ground response when systems need attention.";
