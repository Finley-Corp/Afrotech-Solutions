export type ServiceFormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export type ServiceFormConfig = {
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  fields: ServiceFormField[];
  /** Maintenance: emergency vs scheduled variants */
  variants?: {
    id: string;
    label: string;
    description: string;
    fields: ServiceFormField[];
    submitLabel: string;
    priority?: "emergency" | "scheduled";
  }[];
};

export type ServiceItem = {
  slug: string;
  path: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  status: "active" | "planned";
  sections: { heading: string; paragraphs: string[] }[];
  highlights?: string[];
  form: ServiceFormConfig;
  relatedProjectIds?: string[];
};

export const services: ServiceItem[] = [
  {
    slug: "pump-selection-sizing",
    path: "/services/pump-selection-sizing",
    title: "Pump Selection & Sizing",
    summary: "Duty-point analysis, head calculations, and model matching for reliable operation.",
    description:
      "We evaluate flow, head, fluid properties, and site constraints to recommend pumps that will perform reliably over the full operating envelope — not just at a single design point.",
    icon: "solar:tuning-2-linear",
    status: "active",
    sections: [
      {
        heading: "What we deliver",
        paragraphs: [
          "Our engineers review your application type, source conditions, and duty cycle before recommending equipment. We cross-reference manufacturer curves for Grundfos, KSB, and Wilo models in our catalogue and advise on the best fit for East African operating conditions.",
          "You receive a clear recommendation with rationale — including NPSH considerations, efficiency at your actual duty point, and spare parts availability.",
        ],
      },
    ],
    highlights: [
      "Application and duty-point review",
      "Head, flow, and efficiency matching",
      "Brand-agnostic recommendations from our catalogue",
    ],
    form: {
      submitLabel: "Request a Sizing Consultation",
      successTitle: "Sizing request received",
      successMessage:
        "Our engineering team will review your application details and respond with sizing guidance or a recommended model.",
      fields: [
        { name: "name", label: "Full name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        {
          name: "applicationType",
          label: "Application type",
          type: "select",
          required: true,
          options: [
            "Borehole / submersible",
            "Booster / pressure boosting",
            "Transfer / circulation",
            "Irrigation",
            "Industrial process",
            "Municipal / utility",
            "Other",
          ],
        },
        { name: "flowHead", label: "Approximate flow / head (if known)", type: "text", placeholder: "e.g. 15 m³/h @ 45 m" },
        { name: "siteConditions", label: "Site conditions", type: "textarea", placeholder: "Power supply, water source, installation environment…" },
        { name: "fluidType", label: "Fluid type", type: "text", placeholder: "e.g. clean water, slightly abrasive" },
        {
          name: "urgency",
          label: "Urgency",
          type: "select",
          options: ["Standard (1–2 weeks)", "Urgent (within 1 week)", "Planning / future project"],
        },
      ],
    },
  },
  {
    slug: "system-design-integration",
    path: "/services/system-design-integration",
    title: "System Design & Integration",
    summary: "Complete system layouts for borehole, booster, and transfer applications.",
    description:
      "From borehole abstraction to distribution and control, we design complete pumping systems aligned to your site constraints, redundancy needs, and operating profile.",
    icon: "solar:settings-minimalistic-linear",
    status: "active",
    sections: [
      {
        heading: "What to expect",
        paragraphs: [
          "We start with a site assessment: source, demand profile, power availability, and existing infrastructure. Hydraulic modelling and pump selection follow, with attention to controls, duty/standby arrangements, and future expansion.",
          "Deliverables typically include system schematics, equipment schedules, and specification notes suitable for procurement and installation — so your contractors and our team share a single reference.",
        ],
      },
    ],
    highlights: [
      "Site assessment and hydraulic review",
      "Controls and redundancy planning",
      "Drawings, schedules, and specification notes",
    ],
    relatedProjectIds: ["mombasa-port-cooling", "kisumu-water-hub"],
    form: {
      submitLabel: "Start a System Design Inquiry",
      successTitle: "Design inquiry received",
      successMessage: "A project engineer will contact you to discuss scope, site visit options, and next steps.",
      fields: [
        { name: "name", label: "Full name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "company", label: "Company / organisation", type: "text" },
        {
          name: "projectType",
          label: "Project type",
          type: "select",
          required: true,
          options: ["New installation", "Upgrade / retrofit", "Expansion", "Feasibility study"],
        },
        { name: "siteLocation", label: "Site location", type: "text", required: true },
        {
          name: "infrastructure",
          label: "Existing infrastructure",
          type: "select",
          options: ["Borehole", "Booster set", "Transfer / distribution", "Mixed / multiple", "Greenfield site"],
        },
        { name: "timeline", label: "Target timeline", type: "text", placeholder: "e.g. Q3 2026 commissioning" },
        { name: "details", label: "Project details", type: "textarea" },
      ],
    },
  },
  {
    slug: "installation-commissioning",
    path: "/services/installation-commissioning",
    title: "Installation & Commissioning",
    summary: "Quality checks, startup verification, and handover testing before live operation.",
    description:
      "Our team supports installation quality, startup verification, and documented handover so your pumping system enters service with confidence.",
    icon: "solar:shield-check-linear",
    status: "active",
    sections: [
      {
        heading: "What's included",
        paragraphs: [
          "We review installation against manufacturer and project specifications — alignment, electrical connections, suction conditions, and safety provisions. At startup we verify performance against design duty, check controls and alarms, and document baseline readings for your records.",
          "Typical engagement spans 1–3 site days depending on system complexity. Clients should ensure site access, power availability, and that mechanical installation is substantially complete before our commissioning visit.",
        ],
      },
    ],
    highlights: [
      "Pre-startup installation quality review",
      "Performance verification at design duty",
      "Handover documentation and operator briefing",
    ],
    form: {
      submitLabel: "Request Installation Support",
      successTitle: "Installation request received",
      successMessage: "Our field team will confirm availability and any pre-visit requirements.",
      fields: [
        { name: "name", label: "Full name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "pumpModel", label: "Pump model (if selected / purchased)", type: "text", placeholder: "e.g. Wilo-Helix FIRST V" },
        {
          name: "siteReadiness",
          label: "Site readiness",
          type: "select",
          options: ["Planning stage", "Installation in progress", "Ready for commissioning", "System already running — need support"],
        },
        { name: "targetDate", label: "Target install / commissioning date", type: "text" },
        { name: "details", label: "Site notes", type: "textarea" },
      ],
    },
  },
  {
    slug: "maintenance-support",
    path: "/services/maintenance-support",
    title: "Maintenance & Technical Support",
    summary: "Preventive plans, diagnostics, and responsive field support across East Africa.",
    description:
      "Keep your water systems dependable with scheduled preventive maintenance and technical response when issues arise — backed by our regional support network.",
    icon: "solar:headphones-round-sound-linear",
    status: "active",
    sections: [
      {
        heading: "Preventive maintenance",
        paragraphs: [
          "Scheduled service plans cover inspection intervals, wear-part review, performance checks, and recommendations before small issues become downtime. Ideal for municipal, industrial, and agricultural sites running critical pumps daily.",
        ],
      },
      {
        heading: "Emergency & urgent support",
        paragraphs: [
          "For breakdowns and urgent faults, we prioritise response within 24 hours for critical operations — consistent with our site-wide service commitment. Emergency requests are triaged separately from routine bookings so urgent issues are not queued behind scheduled work.",
        ],
      },
    ],
    highlights: [
      "Preventive maintenance plans",
      "<24h response target for critical faults",
      "Diagnostics, spares, and field repair coordination",
    ],
    form: {
      submitLabel: "Request Maintenance Support",
      successTitle: "Support request received",
      successMessage: "Our team will respond according to the urgency of your request.",
      fields: [],
      variants: [
        {
          id: "emergency",
          label: "Emergency / urgent issue",
          description: "Pump down, critical fault, or production impact — prioritised response.",
          priority: "emergency",
          submitLabel: "Submit urgent request",
          fields: [
            { name: "name", label: "Contact name", type: "text", required: true },
            { name: "phone", label: "Phone (best number to reach you)", type: "tel", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "siteLocation", label: "Site location", type: "text", required: true },
            { name: "equipment", label: "Equipment / pump affected", type: "text", required: true },
            { name: "issue", label: "Describe the issue", type: "textarea", required: true, placeholder: "What happened, when, and current system status" },
          ],
        },
        {
          id: "scheduled",
          label: "Scheduled / preventive maintenance",
          description: "Book a service visit or discuss a maintenance plan.",
          priority: "scheduled",
          submitLabel: "Submit maintenance request",
          fields: [
            { name: "name", label: "Full name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "siteLocation", label: "Site location", type: "text", required: true },
            { name: "equipment", label: "Equipment to be serviced", type: "text" },
            { name: "preferredWindow", label: "Preferred service window", type: "text", placeholder: "e.g. next 2 weeks, quarterly plan" },
            { name: "details", label: "Additional details", type: "textarea" },
          ],
        },
      ],
    },
  },
  {
    slug: "remote-monitoring",
    path: "/services/remote-monitoring",
    title: "Remote Pump Monitoring",
    summary: "Planned capability — register interest for early access when monitoring launches.",
    description:
      "We are building remote monitoring to give clients visibility into pump health, runtime, and fault conditions from a central dashboard. This service is in development — it is not available for deployment today.",
    icon: "solar:monitor-smartphone-linear",
    status: "planned",
    sections: [
      {
        heading: "Planned capability",
        paragraphs: [
          "Remote Pump Monitoring is on our product roadmap. When launched, the service is intended to provide runtime trends, fault and alarm notifications, and health indicators for pumps at distributed sites — reducing surprise failures and supporting faster maintenance decisions.",
          "We are not offering live telemetry or a customer dashboard at this time. Register below if you would like to be contacted when monitoring becomes available for your sites — your interest helps us prioritise rollout regions and use cases.",
        ],
      },
      {
        heading: "What we aim to include (upcoming)",
        paragraphs: [
          "Runtime and duty-cycle tracking across monitored assets",
          "Fault and alarm notifications to designated contacts",
          "Trend reporting to support preventive maintenance planning",
          "Health indicators to flag assets that may need inspection",
        ],
      },
    ],
    highlights: [
      "Service in development — not live today",
      "No hardware or dashboard deployment yet",
      "Register interest to inform rollout priorities",
    ],
    form: {
      submitLabel: "Register Interest",
      successTitle: "Interest registered",
      successMessage:
        "Thank you. We will contact you when Remote Pump Monitoring becomes available for sites like yours.",
      fields: [
        { name: "name", label: "Full name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "company", label: "Company / organisation", type: "text" },
        { name: "siteLocation", label: "Site location(s)", type: "text", required: true },
        { name: "pumpAssets", label: "Pump models / count to monitor", type: "textarea", placeholder: "e.g. 4 borehole pumps — Grundfos SP range" },
      ],
    },
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

/** Legacy anchor slug from homepage — maps to maintenance-support */
export const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "maintenance-technical-support": "maintenance-support",
};

export function resolveServiceSlug(slug: string): string {
  return SERVICE_SLUG_ALIASES[slug] ?? slug;
}

export function getServiceFieldsForQuote(
  service: ServiceItem,
  variantId?: string,
): ServiceFormField[] {
  const variant = service.form.variants?.find((v) => v.id === variantId);
  const fields = variant?.fields ?? service.form.fields;
  const contact = new Set(["name", "email", "phone"]);
  return fields.filter((f) => !contact.has(f.name));
}
