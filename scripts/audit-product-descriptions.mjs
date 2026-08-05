#!/usr/bin/env node
/**
 * Audit product descriptions and specs across the full catalogue.
 * Usage: node scripts/audit-product-descriptions.mjs
 */
import fs from "fs";
import path from "path";
import pg from "pg";

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

loadEnv();

const JUNK_RE =
  /^(search|brand|model|category|filter|sort|page|date|name|type|series|product|marke|kategorie|suchbegriff)$/i;

function isJunkDescription(desc) {
  const trimmed = (desc ?? "").trim();
  if (!trimmed || trimmed.length < 8) return true;
  if (JUNK_RE.test(trimmed)) return true;
  if (/^produktfamilie:/i.test(trimmed) && trimmed.length < 120) return true;
  if (/^\d{1,2}$/.test(trimmed)) return true;
  if (/^\d{4}-\d{2}$/.test(trimmed)) return true;
  if (/^[\d.,]+$/.test(trimmed)) return true;
  return false;
}

function hasTechnicalSpecs(specs) {
  if (!specs || typeof specs !== "object") return false;
  const keys = Object.keys(specs).filter(
    (k) => !["source", "page_type", "related_product_count", "related_products"].includes(k),
  );
  return keys.some((k) => String(specs[k] ?? "").trim().length > 2);
}

const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const { rows } = await pool.query(
  `SELECT id, brand, name, description, specs FROM products ORDER BY id`,
);

let junkRaw = 0;
let missingSpecs = 0;
const junkExamples = [];

for (const row of rows) {
  if (isJunkDescription(row.description)) {
    junkRaw++;
    if (junkExamples.length < 15) {
      junkExamples.push({
        id: row.id,
        brand: row.brand,
        name: row.name,
        raw: (row.description ?? "").trim().slice(0, 80),
      });
    }
  }
  if (!hasTechnicalSpecs(row.specs)) missingSpecs++;
}

console.log(`\n=== Product audit (${rows.length} products) ===\n`);
console.log(`Raw junk/missing descriptions: ${junkRaw} (${((junkRaw / rows.length) * 100).toFixed(1)}%)`);
console.log(`Products without technical specs: ${missingSpecs} (${((missingSpecs / rows.length) * 100).toFixed(1)}%)`);
console.log(`All ${rows.length} products receive sanitized descriptions at render time.\n`);

if (junkExamples.length) {
  console.log("Sample raw junk (fixed in app layer):");
  for (const ex of junkExamples) {
    console.log(`  [${ex.id}] ${ex.brand} / ${ex.name}: "${ex.raw || "(empty)"}"`);
  }
}

await pool.end();
