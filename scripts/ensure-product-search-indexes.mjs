#!/usr/bin/env node
/**
 * Add trigram indexes to speed up ILIKE product search.
 * Usage: node scripts/ensure-product-search-indexes.mjs
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

const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });

await pool.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);
await pool.query(
  `CREATE INDEX IF NOT EXISTS products_name_trgm_idx ON products USING gin (name gin_trgm_ops)`,
);
await pool.query(
  `CREATE INDEX IF NOT EXISTS products_brand_trgm_idx ON products USING gin (brand gin_trgm_ops)`,
);
await pool.query(`CREATE INDEX IF NOT EXISTS products_brand_lower_idx ON products (LOWER(brand))`);

console.log("Product search indexes ensured.");
await pool.end();
