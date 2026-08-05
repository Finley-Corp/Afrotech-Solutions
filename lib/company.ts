export const COMPANY_NAME = "Afrotech Engineering Solutions Limited";

/** Public path to brand logo (file: public/assets/logo/afrotech logo.png) */
export const COMPANY_LOGO_SRC = "/assets/logo/afrotech%20logo.png";

/** Browser tab favicon (file: public/assets/logo/afrotech_logo__1_-removebg-preview.png) */
export const FAVICON_SRC = "/assets/logo/afrotech_logo__1_-removebg-preview.png";

export const COMPANY_ADDRESS_LINES = [
  "NML Towers, Tsavo Road, South B",
  "2nd Floor, Suite 212",
  "Nairobi, Kenya",
] as const;

export const COMPANY_ADDRESS_ONE_LINE = COMPANY_ADDRESS_LINES.join(", ");

export const COMPANY_MAP_EMBED_URL =
  "https://maps.google.com/maps?q=NML%20Towers,%20Tsavo%20Road,%20South%20B,%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed";

/**
 * CTA routing rule (site-wide):
 * - `/quote` — product selection, multi-product cart, service request, pricing, or site-visit /
 *   system-design style transactional inquiries (context-aware forms).
 * - `/contact` — general questions, partnership, non-transactional advisor chat, and anything
 *   that does not fit the quote / service-request flows.
 * Keep CTAs audited against this rule when adding new buttons.
 */

/**
 * Operating hours — single source of truth for `/contact` and the site footer.
 * TODO(content): Confirm with stakeholders. Previously footer said Mon–Sat 10:00–18:00 /
 * Sunday by appointment; contact page said Mon–Fri 08:00–17:00, Sat 09:00–13:00,
 * Sunday/holidays technical-support-only. Contact-page schedule adopted pending confirmation
 * because it distinguishes emergency/technical Sunday cover.
 */
export const COMPANY_HOURS = [
  { days: "Monday — Friday", hours: "08:00 — 17:00" },
  { days: "Saturday", hours: "09:00 — 13:00" },
  { days: "Sunday & Holidays", hours: "Technical support only" },
] as const;

/** Short footer line derived from COMPANY_HOURS */
export const COMPANY_HOURS_FOOTER =
  "Mon–Fri 08:00–17:00 · Sat 09:00–13:00 · Sun technical support only";

export const SALES_EMAIL = "contact@afrotechsolutions.com";
export const EMERGENCY_PHONE = "+254737628375";
export const EMERGENCY_TEL = "+254737628375";
export const TECHNICAL_SUPPORT_PHONE = "+254737628375";
export const TECHNICAL_SUPPORT_TEL = "+254737628375";

export type CompanyContact = {
  name: string;
  phone: string;
  tel: string;
  /** Optional published role — confirm with business before treating as official title */
  role?: string;
};

/** Kenya local numbers → international tel: links for click-to-call */
export const COMPANY_CONTACTS: CompanyContact[] = [
  { name: "Nashon Mwalukuku", phone: "0784 184 003", tel: "+254784184003", role: "Technical Support" },
  { name: "Kennedy Too", phone: "0724 156 095", tel: "+254724156095" },
  { name: "Cornelius Kipngetich", phone: "0143 207 760", tel: "+254143207760" },
];

export type ContactSubject =
  | "General Inquiry"
  | "Technical Support"
  | "Sales Inquiry"
  | "Partnership Opportunity";

export const CONTACT_SUBJECTS: ContactSubject[] = [
  "General Inquiry",
  "Technical Support",
  "Sales Inquiry",
  "Partnership Opportunity",
];

/**
 * Subject → notify routing for `/api/email/contact`.
 * Override with env: RESEND_TECH_EMAIL, RESEND_SALES_EMAIL, RESEND_PARTNERSHIP_EMAIL
 * (comma-separated). Falls back to primary owner notify list.
 */
export function getContactRoute(subject: string): {
  channel: "general" | "technical" | "sales" | "partnership";
  ownerSubjectPrefix: string;
  notifyHint: string;
  phoneHint?: string;
} {
  const s = subject.trim().toLowerCase();
  if (s.includes("technical")) {
    return {
      channel: "technical",
      ownerSubjectPrefix: "[Technical Support]",
      notifyHint: `Technical support line: ${TECHNICAL_SUPPORT_PHONE}`,
      phoneHint: TECHNICAL_SUPPORT_PHONE,
    };
  }
  if (s.includes("sales")) {
    return {
      channel: "sales",
      ownerSubjectPrefix: "[Sales]",
      notifyHint: `Sales inbox: ${SALES_EMAIL}`,
    };
  }
  if (s.includes("partnership")) {
    return {
      channel: "partnership",
      ownerSubjectPrefix: "[Partnership]",
      notifyHint: "Route to business development / partnership desk",
    };
  }
  return {
    channel: "general",
    ownerSubjectPrefix: "[General]",
    notifyHint: "General enquiry inbox",
  };
}
