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

export type CompanyContact = {
  name: string;
  phone: string;
  tel: string;
};

/** Kenya local numbers → international tel: links for click-to-call */
export const COMPANY_CONTACTS: CompanyContact[] = [
  { name: "Nashon Mwalukuku", phone: "0784 184 003", tel: "+254784184003" },
  { name: "Kennedy Too", phone: "0724 156 095", tel: "+254724156095" },
  { name: "Cornelius Kipngetich", phone: "0143 207 760", tel: "+254143207760" },
];
