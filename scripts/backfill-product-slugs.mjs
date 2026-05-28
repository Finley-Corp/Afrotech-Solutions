#!/usr/bin/env node
/**
 * Adds products.slug column and backfills unique slugs for all rows.
 * Run: node scripts/backfill-product-slugs.mjs
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

function slugifyPart(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function slugFromSourceUrl(sourceUrl) {
  if (!sourceUrl) return null;
  try {
    const segment = new URL(sourceUrl).pathname.split("/").filter(Boolean).pop() ?? "";
    if (/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(segment) || /^[a-z0-9]$/.test(segment)) {
      return segment;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function buildSlug(brand, name, sourceUrl, id) {
  const fromUrl = slugFromSourceUrl(sourceUrl);
  return fromUrl || slugifyPart(`${brand}-${name}`) || `product-${id}`;
}

loadEnv();

const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT");
  const { rows } = await pool.query(
    "SELECT id, brand, name, source_url FROM products ORDER BY id ASC",
  );

  const used = new Set();
  const updates = [];

  for (const row of rows) {
    let slug = buildSlug(row.brand, row.name, row.source_url, row.id);
    if (used.has(slug)) slug = `${slug}-${row.id}`;
    used.add(slug);
    updates.push([row.id, slug]);
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (let i = 0; i < updates.length; i += 100) {
      const chunk = updates.slice(i, i + 100);
      const ids = chunk.map((c) => c[0]);
      const cases = chunk
        .map((c) => `WHEN ${c[0]} THEN '${String(c[1]).replace(/'/g, "''")}'`)
        .join(" ");
      await client.query(
        `UPDATE products SET slug = CASE id ${cases} END WHERE id = ANY($1::int[])`,
        [ids],
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  const updated = updates.length;

  await pool.query(
    "CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique_idx ON products (slug)",
  );

  console.log(`Backfilled ${updated} product slugs.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
