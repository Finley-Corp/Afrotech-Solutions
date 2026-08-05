export const LOCATION_OTHER = "Other / Off-grid";

/** East African hubs and major service cities */
export const QUOTE_LOCATIONS = [
  "Nairobi, Kenya",
  "Mombasa, Kenya",
  "Kisumu, Kenya",
  "Nakuru, Kenya",
  "Eldoret, Kenya",
  "Dar es Salaam, Tanzania",
  "Arusha, Tanzania",
  "Dodoma, Tanzania",
  "Kampala, Uganda",
  "Entebbe, Uganda",
  LOCATION_OTHER,
] as const;

export const URGENCY_OPTIONS = [
  { value: "routine", label: "Routine inquiry" },
  { value: "time-sensitive", label: "Time-sensitive — within a few days" },
  { value: "emergency", label: "Emergency — system down" },
] as const;

export type UrgencyValue = (typeof URGENCY_OPTIONS)[number]["value"];

export const CONTACT_FIELD_NAMES = new Set(["name", "email", "phone"]);

export type QuoteContextType = "generic" | "product" | "cart" | "service";

export type QuoteProductRef = {
  slug: string;
  name: string;
  brand: string;
};

export function generateQuoteReference(): string {
  const date = new Date();
  const ymd =
    String(date.getFullYear()) +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AFT-${ymd}-${rand}`;
}

export function resolveQuoteContext(
  serviceSlug: string | null,
  modelSlug: string | null,
  cartParam: string | null,
  cartItemCount: number,
): QuoteContextType {
  if (serviceSlug) return "service";
  if (modelSlug) return "product";
  if (cartParam === "true" || cartItemCount > 0) return "cart";
  return "generic";
}

export function shouldShowHydraulicFields(
  context: QuoteContextType,
  inquiryType: string,
): boolean {
  if (context === "service") return false;
  if (context === "product" || context === "cart") return true;
  return inquiryType === "Product" || inquiryType === "Both";
}

export function isUrgentSubmission(opts: {
  urgency?: string;
  servicePriority?: string;
  maintenanceVariant?: string;
}): boolean {
  if (opts.urgency === "emergency") return true;
  if (opts.servicePriority === "emergency") return true;
  if (opts.maintenanceVariant === "emergency") return true;
  return false;
}

export function responseWindowForSubmission(isUrgent: boolean): string {
  if (isUrgent) {
    return "Emergency requests are prioritised — our team aims to respond within a few hours during business hours. For immediate help, call our support line.";
  }
  return "Our technical team typically responds within 24 hours with next steps or a detailed quote.";
}

export const ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const ATTACHMENT_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];
