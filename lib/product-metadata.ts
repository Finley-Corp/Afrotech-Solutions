export const PUMP_TYPES = [
  { id: "submersible", label: "Submersible" },
  { id: "centrifugal", label: "Centrifugal" },
  { id: "booster", label: "Booster set" },
  { id: "multistage", label: "Multistage" },
  { id: "dewatering", label: "Dewatering" },
  { id: "fire", label: "Fire-fighting" },
] as const;

export const PRODUCT_APPLICATIONS = [
  { id: "domestic", label: "Domestic water supply" },
  { id: "industrial", label: "Industrial process" },
  { id: "agricultural", label: "Agricultural / irrigation" },
  { id: "municipal", label: "Municipal" },
  { id: "fire", label: "Fire protection" },
  { id: "dewatering", label: "Dewatering" },
] as const;

export type PumpTypeId = (typeof PUMP_TYPES)[number]["id"];
export type ApplicationId = (typeof PRODUCT_APPLICATIONS)[number]["id"];

const PUMP_TYPE_PATTERNS: Record<PumpTypeId, RegExp[]> = {
  submersible: [/submersible/i, /\bsp[\s-]?\d/i, /\bsqe\b/i, /\bsba\b/i, /borehole/i, /\btauro\b/i, /unilift/i, /tiefbrunnen/i],
  centrifugal: [/centrifugal/i, /end[\s-]?suction/i, /\bnb\b/i, /\bnkg\b/i, /monobloc/i, /mono bloc/i, /kreiselpumpe/i],
  booster: [/booster/i, /pressure boost/i, /\btop[\s-]?s\b/i, /\btop[\s-]?rl\b/i, /druckerh/i, /heizung/i, /pressuris/i],
  multistage: [/multistage/i, /multi[\s-]?stage/i, /\bhelix\b/i, /\bmultitec\b/i, /\bcr[\s-]?\d/i, /mehrstufig/i],
  dewatering: [/dewater/i, /drainage/i, /\bdrain\b/i, /sewage/i, /wastewater/i, /foul water/i, /abwasser/i],
  fire: [/fire[\s-]?fight/i, /\bfp\b/i, /sprinkler/i, /jockey/i, /brandschutz/i],
};

const APPLICATION_PATTERNS: Record<ApplicationId, RegExp[]> = {
  domestic: [/domestic/i, /residential/i, /home/i, /household/i, /hot water/i, /haustechnik/i],
  industrial: [/industrial/i, /process/i, /cooling/i, /hvac/i, /plant/i, /industrie/i],
  agricultural: [/agri/i, /irrigation/i, /farm/i, /borehole/i, /bewässerung/i, /landwirtschaft/i],
  municipal: [/municipal/i, /utility/i, /water supply/i, /distribution/i, /public/i, /kommunal/i],
  fire: [/fire/i, /sprinkler/i, /jockey/i, /brandschutz/i],
  dewatering: [/dewater/i, /drainage/i, /sewage/i, /wastewater/i, /construction/i, /abwasser/i],
};

const JUNK_DESCRIPTION_RE =
  /^(search|brand|model|category|filter|sort|page|date|name|type|series|product|marke|kategorie|suchbegriff)$/i;

const GERMAN_UI_LABEL_RE =
  /^(produktfamilie|produktgruppe|produkttyp|produktname|suchbegriff|marke|kategorie|filter|suche)\s*:/i;

const METADATA_SPEC_KEYS = new Set([
  "source",
  "page_type",
  "related_product_count",
  "related_products",
]);

const SPEC_LABEL_ORDER = [
  "Flow rate",
  "Head",
  "Power",
  "Voltage",
  "IP rating",
  "Materials",
  "Connection size",
  "Weight",
] as const;

const SPEC_KEY_ALIASES: Record<string, (typeof SPEC_LABEL_ORDER)[number]> = {
  flow_rate: "Flow rate",
  max_flow: "Flow rate",
  flow: "Flow rate",
  durchfluss: "Flow rate",
  max_head: "Head",
  head: "Head",
  foerderhoehe: "Head",
  motor_power: "Power",
  power: "Power",
  kw: "Power",
  leistung: "Power",
  voltage: "Voltage",
  spannung: "Voltage",
  ip_rating: "IP rating",
  ip: "IP rating",
  schutzart: "IP rating",
  material: "Materials",
  materials: "Materials",
  werkstoff: "Materials",
  weight: "Weight",
  gewicht: "Weight",
  connection: "Connection size",
  connection_size: "Connection size",
  anschluss: "Connection size",
};

export function isJunkDescription(desc: string): boolean {
  const trimmed = desc.trim();
  if (!trimmed || trimmed.length < 8) return true;
  if (JUNK_DESCRIPTION_RE.test(trimmed)) return true;
  if (GERMAN_UI_LABEL_RE.test(trimmed)) return true;
  if (/^produktfamilie:/i.test(trimmed) && trimmed.length < 120) return true;
  if (/^\d{1,2}$/.test(trimmed)) return true;
  if (/^\d{4}-\d{2}$/.test(trimmed)) return true;
  if (/^[\d.,]+$/.test(trimmed)) return true;
  if (/^[A-Za-zäöüÄÖÜß]+$/.test(trimmed) && trimmed.length < 12) return true;
  // Short strings that are mostly non-English UI fragments
  if (trimmed.length < 40 && /produkt|familie|druckerhöhung|anlagen/i.test(trimmed) && !/\band\b|\bfor\b|\bwith\b/i.test(trimmed)) {
    return true;
  }
  return false;
}

export function inferPumpType(name: string, description = ""): PumpTypeId | null {
  const haystack = `${name} ${description}`;
  for (const type of PUMP_TYPES) {
    if (PUMP_TYPE_PATTERNS[type.id].some((p) => p.test(haystack))) return type.id;
  }
  return null;
}

export function inferApplications(name: string, description = "", pumpType: PumpTypeId | null = null): string[] {
  const haystack = `${name} ${description}`;
  const matched: string[] = [];

  for (const app of PRODUCT_APPLICATIONS) {
    if (APPLICATION_PATTERNS[app.id].some((p) => p.test(haystack))) {
      matched.push(app.label);
    }
  }

  if (pumpType === "fire" && !matched.includes("Fire protection")) matched.push("Fire protection");
  if (pumpType === "dewatering" && !matched.includes("Dewatering")) matched.push("Dewatering");
  if (pumpType === "submersible" && !matched.some((a) => a.includes("Agricultural"))) {
    matched.push("Agricultural / irrigation");
  }

  if (matched.length === 0) {
    return ["Water Distribution", "Industrial Supply", "Pressure Boosting"];
  }

  return [...new Set(matched)].slice(0, 4);
}

export function pumpTypeLabel(id: PumpTypeId | null): string | null {
  if (!id) return null;
  return PUMP_TYPES.find((t) => t.id === id)?.label ?? null;
}

export function buildProductDescriptionFallback(
  brand: string,
  name: string,
  pumpType: PumpTypeId | null,
): string {
  const b = brand.trim();
  const n = name.trim();
  const typeLabel = pumpTypeLabel(pumpType);
  const base = b && n ? `${b} ${n}` : n || b || "Pump";
  if (typeLabel) return `${base} — ${typeLabel.toLowerCase()} pump. Technical data sheet available on request.`;
  return `${base} — technical data sheet available on request.`;
}

export function resolveProductDescription(
  desc: string | null | undefined,
  brand: string,
  name: string,
  maxLen = 140,
): string {
  const pumpType = inferPumpType(name, desc ?? "");
  const raw = desc?.trim() ?? "";
  const resolved = isJunkDescription(raw)
    ? buildProductDescriptionFallback(brand, name, pumpType)
    : raw;
  return resolved.length > maxLen ? `${resolved.slice(0, maxLen)}…` : resolved;
}

export function getSearchPatternsForPumpType(pumpType: string): string[] {
  const patterns: Record<PumpTypeId, string[]> = {
    submersible: ["submersible", "borehole", "sqe", "sp ", "tauro", "unilift"],
    centrifugal: ["centrifugal", "end-suction", "nb ", "nkg", "monobloc"],
    booster: ["booster", "top-s", "top-rl", "pressure boost", "druckerh"],
    multistage: ["multistage", "helix", "multitec", " cr"],
    dewatering: ["dewater", "drainage", "sewage", "wastewater"],
    fire: ["fire", "sprinkler", "jockey", "fp "],
  };
  return patterns[pumpType as PumpTypeId] ?? [];
}

export function getSearchPatternsForApplication(application: string): string[] {
  const patterns: Record<ApplicationId, string[]> = {
    domestic: ["domestic", "residential", "household", "home"],
    industrial: ["industrial", "process", "cooling", "hvac"],
    agricultural: ["agri", "irrigation", "farm", "borehole"],
    municipal: ["municipal", "utility", "distribution", "water supply"],
    fire: ["fire", "sprinkler", "jockey"],
    dewatering: ["dewater", "drainage", "sewage", "wastewater", "construction"],
  };
  return patterns[application as ApplicationId] ?? [];
}

function normalizeSpecKey(key: string): string {
  return key.toLowerCase().replace(/\s+/g, "_");
}

function isJunkSpecValue(value: string): boolean {
  const v = value.trim();
  if (!v || v.length < 2) return true;
  if (JUNK_DESCRIPTION_RE.test(v)) return true;
  if (/^\d{4}-\d{2}$/.test(v)) return true;
  return false;
}

export function getTechnicalSpecTable(
  specsObj: Record<string, unknown> | null | undefined,
): { label: string; value: string }[] {
  const specs = specsObj ?? {};
  const byLabel = new Map<string, string>();

  for (const [rawKey, rawValue] of Object.entries(specs)) {
    const key = normalizeSpecKey(rawKey);
    if (METADATA_SPEC_KEYS.has(key)) continue;

    const value = String(rawValue ?? "").trim();
    if (isJunkSpecValue(value)) continue;

    if (key === "general_attributes" && value.length > 12) {
      byLabel.set("General attributes", value);
      continue;
    }

    const alias = SPEC_KEY_ALIASES[key];
    if (alias) {
      byLabel.set(alias, value);
      continue;
    }

    // Skip other metadata-like keys
    if (/related|page_type|source/.test(key)) continue;

    const label = rawKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    if (label.length < 30) byLabel.set(label, value);
  }

  const ordered: { label: string; value: string }[] = [];
  for (const label of SPEC_LABEL_ORDER) {
    const value = byLabel.get(label);
    if (value) ordered.push({ label, value });
  }
  for (const [label, value] of byLabel) {
    if (!SPEC_LABEL_ORDER.includes(label as (typeof SPEC_LABEL_ORDER)[number])) {
      ordered.push({ label, value });
    }
  }
  return ordered;
}

export function hasTechnicalSpecs(specsObj: Record<string, unknown> | null | undefined): boolean {
  return getTechnicalSpecTable(specsObj).length > 0;
}

export const SPECS_UNAVAILABLE_MESSAGE =
  "Full specifications available on request — our engineers will confirm exact specs for your application.";
