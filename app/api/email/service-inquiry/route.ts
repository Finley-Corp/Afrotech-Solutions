import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/app/data/services";
import { brandEmailShell, emailDetailRows, EMAIL_BRAND } from "@/lib/email-templates";
import { insertServiceInquiry, isFormDbConfigured } from "@/lib/form-db";
import { sendLeadEmails } from "@/lib/form-email";
import {
  escapeHtml,
  getFromEmail,
  getOwnerNotifyEmails,
  getResend,
} from "@/lib/resend";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const serviceSlug = String(body.serviceSlug ?? "").trim();
  const service = getServiceBySlug(serviceSlug);
  if (!service) {
    return NextResponse.json({ ok: false, error: "unknown_service" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const priority = String(body.priority ?? "").trim();
  const variant = String(body.variant ?? "").trim();

  const reserved = new Set(["serviceSlug", "serviceTitle", "priority", "variant"]);
  const detailRows: { label: string; value: string }[] = [
    { label: "Service", value: service.title },
  ];
  if (priority) detailRows.push({ label: "Priority", value: priority });
  if (variant) detailRows.push({ label: "Request type", value: variant });

  const detailLines: string[] = [];
  for (const [key, value] of Object.entries(body)) {
    if (reserved.has(key) || key === "name" || key === "email" || key === "phone") continue;
    const v = String(value ?? "").trim();
    if (!v) continue;
    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
    detailRows.push({ label, value: v });
    detailLines.push(`${label}: ${v}`);
  }

  detailRows.unshift(
    { label: "Name", value: name },
    { label: "Email", value: email },
    ...(phone ? [{ label: "Phone", value: phone }] : []),
  );

  if (!isFormDbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }

  let saved = false;
  try {
    await insertServiceInquiry({
      service_slug: service.slug,
      service_title: service.title,
      name,
      email,
      phone,
      priority,
      variant,
      details: detailLines.join("\n"),
    });
    saved = true;
  } catch (err) {
    console.error("[DB] service inquiry insert failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "db_save_failed" }, { status: 502 });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({
      ok: true,
      saved: true,
      warning: "email_not_configured",
    });
  }

  const from = getFromEmail();
  const ownerInboxes = getOwnerNotifyEmails();
  const isUrgent = priority === "emergency";
  const ownerSubject = isUrgent
    ? `[URGENT] ${service.title} — ${name}`
    : `[Afrotech] ${service.title} — ${name}`;

  const clientBody = `
    <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">Thank you for your ${escapeHtml(service.title.toLowerCase())} request. Our team has received your details and will respond shortly.</p>
    <p style="margin:0;">${isUrgent ? "Urgent requests are prioritised — if the situation worsens, call our support line directly." : "We typically respond within 24 hours for standard enquiries."}</p>`;

  const ownerBody = `${emailDetailRows(detailRows, escapeHtml)}
    <p style="margin:24px 0 0;font-size:13px;color:${EMAIL_BRAND.secondary};line-height:1.55;">
      <strong style="color:${EMAIL_BRAND.primary};">Reply</strong> to reach the customer — Reply-To is set to their email.
    </p>`;

  const { clientSent, ownerSent, warnings } = await sendLeadEmails(resend, {
    from,
    ownerInboxes,
    client: {
      to: email,
      subject: `We received your request — ${service.title}`,
      html: brandEmailShell({
        eyebrow: "Afrotech Water Solutions",
        title: service.form.successTitle,
        bodyHtml: clientBody,
      }),
    },
    owner: {
      subject: ownerSubject,
      html: brandEmailShell({
        eyebrow: `Service inquiry · ${service.slug}`,
        title: service.title,
        bodyHtml: ownerBody,
      }),
      replyTo: email,
    },
  });

  if (saved) {
    return NextResponse.json({
      ok: true,
      saved: true,
      emails: { client: clientSent, owner: ownerSent },
      ...(warnings.length || (!clientSent && !ownerSent)
        ? { warning: warnings.join("; ") || "email_send_failed" }
        : {}),
    });
  }

  return NextResponse.json(
    { ok: false, error: "submit_failed", reason: warnings.join("; ") },
    { status: 502 },
  );
}
