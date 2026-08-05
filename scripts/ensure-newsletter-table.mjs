/**
 * @deprecated Prefer scripts/ensure-form-tables.mjs (newsletter + service_inquiries).
 * Creates newsletter_subscriptions if missing.
 * Run: node scripts/ensure-newsletter-table.mjs
 */
import { spawnSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const result = spawnSync(process.execPath, [join(root, "scripts/ensure-form-tables.mjs")], {
  stdio: "inherit",
  env: process.env,
});
process.exit(result.status ?? 1);
