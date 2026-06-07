/**
 * Creates newsletter_subscriptions in Neon if missing.
 * Run: node scripts/ensure-newsletter-table.mjs
 * Requires DATABASE_URL in the environment.
 */
import pg from "pg";

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });

await pool.query(`
  CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    email TEXT NOT NULL UNIQUE
  );
`);

console.log("newsletter_subscriptions table is ready");
await pool.end();
