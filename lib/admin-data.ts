import { unstable_cache } from "next/cache";
import { neonQuery } from "@/lib/neon-db";

const LIST_LIMIT = 250;

export type AdminStats = {
  quotations: number;
  contacts: number;
  newsletter: number;
};

function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function parseCount(rows: { count: string }[]): number {
  return parseInt(rows[0]?.count ?? "0", 10);
}

async function tableExists(name: string): Promise<boolean> {
  const rows = await neonQuery<{ exists: boolean }>(
    `SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = $1
    ) AS exists`,
    [name],
  );
  return Boolean(rows[0]?.exists);
}

async function fetchStats(): Promise<AdminStats> {
  if (!hasDatabase()) {
    return { quotations: 0, contacts: 0, newsletter: 0 };
  }

  const [quotations, contacts] = await Promise.all([
    neonQuery<{ count: string }>(`SELECT COUNT(*)::text AS count FROM quotations`),
    neonQuery<{ count: string }>(`SELECT COUNT(*)::text AS count FROM contacts`),
  ]);

  let newsletter = 0;
  if (await tableExists("newsletter_subscriptions")) {
    const rows = await neonQuery<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM newsletter_subscriptions`,
    );
    newsletter = parseCount(rows);
  }

  return {
    quotations: parseCount(quotations),
    contacts: parseCount(contacts),
    newsletter,
  };
}

export type AdminQuotation = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  pump_type: string | null;
  flow_rate: string | null;
  depth: string | null;
  message: string | null;
};

export type AdminContact = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string | null;
  message: string | null;
};

export type AdminSubscriber = {
  id: string;
  created_at: string;
  email: string;
};

async function fetchQuotations(): Promise<AdminQuotation[]> {
  if (!hasDatabase()) return [];

  return neonQuery<AdminQuotation>(
    `SELECT id::text, created_at::text, name, email, phone, location, pump_type, flow_rate, depth, message
     FROM quotations
     ORDER BY created_at DESC
     LIMIT $1`,
    [LIST_LIMIT],
  );
}

async function fetchContacts(): Promise<AdminContact[]> {
  if (!hasDatabase()) return [];

  return neonQuery<AdminContact>(
    `SELECT id::text, created_at::text, name, email, subject, message
     FROM contacts
     ORDER BY created_at DESC
     LIMIT $1`,
    [LIST_LIMIT],
  );
}

async function fetchNewsletter(): Promise<AdminSubscriber[]> {
  if (!hasDatabase() || !(await tableExists("newsletter_subscriptions"))) {
    return [];
  }

  return neonQuery<AdminSubscriber>(
    `SELECT id::text, created_at::text, email
     FROM newsletter_subscriptions
     ORDER BY created_at DESC
     LIMIT $1`,
    [LIST_LIMIT],
  );
}

const cachedStats = unstable_cache(fetchStats, ["admin-stats"], { revalidate: 20, tags: ["admin"] });
const cachedQuotations = unstable_cache(fetchQuotations, ["admin-quotations"], {
  revalidate: 20,
  tags: ["admin"],
});
const cachedContacts = unstable_cache(fetchContacts, ["admin-contacts"], { revalidate: 20, tags: ["admin"] });
const cachedNewsletter = unstable_cache(fetchNewsletter, ["admin-newsletter"], {
  revalidate: 20,
  tags: ["admin"],
});

export function getAdminStats() {
  return cachedStats();
}

export function getAdminQuotations() {
  return cachedQuotations();
}

export function getAdminContacts() {
  return cachedContacts();
}

export function getAdminNewsletter() {
  return cachedNewsletter();
}

export async function deleteNewsletterSubscriber(id: string): Promise<boolean> {
  if (!hasDatabase() || !(await tableExists("newsletter_subscriptions"))) {
    return false;
  }

  const rows = await neonQuery(`DELETE FROM newsletter_subscriptions WHERE id::text = $1 RETURNING id`, [id]);
  return rows.length > 0;
}
