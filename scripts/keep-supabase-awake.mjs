#!/usr/bin/env node

/**
 * Keeps a Supabase project warm by running a lightweight REST query on an interval.
 *
 * Usage:
 *   node scripts/keep-supabase-awake.mjs
 *   node scripts/keep-supabase-awake.mjs --once
 *
 * Env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)
 *   SUPABASE_KEEPALIVE_TABLE=products
 *   SUPABASE_KEEPALIVE_INTERVAL_MINUTES=10
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

const TABLE = (process.env.SUPABASE_KEEPALIVE_TABLE || "products").trim();
const INTERVAL_MINUTES = Number(process.env.SUPABASE_KEEPALIVE_INTERVAL_MINUTES || "10");
const INTERVAL_MS = Math.max(1, INTERVAL_MINUTES) * 60 * 1000;
const ONCE = process.argv.includes("--once");

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "[supabase-keepalive] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  );
  process.exit(1);
}

const endpoint = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${encodeURIComponent(TABLE)}?select=id&limit=1`;

async function ping() {
  const started = Date.now();
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    const duration = Date.now() - started;
    if (!res.ok) {
      const body = await res.text();
      console.error(
        `[supabase-keepalive] ${new Date().toISOString()} fail ${res.status} (${duration}ms): ${body}`,
      );
      return;
    }

    console.log(`[supabase-keepalive] ${new Date().toISOString()} ok (${duration}ms)`);
  } catch (error) {
    console.error(
      `[supabase-keepalive] ${new Date().toISOString()} error:`,
      error instanceof Error ? error.message : error,
    );
  }
}

await ping();

if (!ONCE) {
  console.log(
    `[supabase-keepalive] running every ${Math.max(1, INTERVAL_MINUTES)} minute(s) on table "${TABLE}"`,
  );
  setInterval(ping, INTERVAL_MS);
}
