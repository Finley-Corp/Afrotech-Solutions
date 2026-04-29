import { Pool } from "pg";

let pool: Pool | null = null;

function getPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 5,
  });

  return pool;
}

export async function neonQuery<T = unknown>(text: string, values: unknown[] = []): Promise<T[]> {
  const db = getPool();
  const result = await db.query(text, values);
  return result.rows as T[];
}
