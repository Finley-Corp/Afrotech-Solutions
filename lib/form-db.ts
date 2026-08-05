import { revalidateTag } from "next/cache";
import { neonQuery } from "@/lib/neon-db";

export function isFormDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function invalidateAdminCache() {
  revalidateTag("admin");
}

export async function insertContact(row: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  await neonQuery(
    `INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)`,
    [row.name, row.email, row.subject || "General enquiry", row.message],
  );
  invalidateAdminCache();
}

export async function insertQuotation(row: {
  name: string;
  email: string;
  phone: string;
  location: string;
  pump_type: string;
  flow_rate: string;
  depth: string;
  message: string;
}): Promise<void> {
  await neonQuery(
    `INSERT INTO quotations (name, email, phone, location, pump_type, flow_rate, depth, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      row.name,
      row.email,
      row.phone,
      row.location.trim() || "Not specified",
      row.pump_type.trim() || "General enquiry",
      row.flow_rate.trim() || null,
      row.depth.trim() || null,
      row.message.trim() || null,
    ],
  );
  invalidateAdminCache();
}

export async function insertNewsletterSubscriber(email: string): Promise<void> {
  await neonQuery(`INSERT INTO newsletter_subscriptions (email) VALUES ($1) ON CONFLICT (email) DO NOTHING`, [
    email,
  ]);
  invalidateAdminCache();
}

export async function insertServiceInquiry(row: {
  service_slug: string;
  service_title: string;
  name: string;
  email: string;
  phone: string;
  priority: string;
  variant: string;
  details: string;
}): Promise<void> {
  await neonQuery(
    `INSERT INTO service_inquiries
      (service_slug, service_title, name, email, phone, priority, variant, details)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      row.service_slug,
      row.service_title,
      row.name,
      row.email,
      row.phone.trim() || null,
      row.priority.trim() || null,
      row.variant.trim() || null,
      row.details.trim() || "",
    ],
  );
  invalidateAdminCache();
}
