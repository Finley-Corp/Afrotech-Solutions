import { NextResponse } from "next/server";
import { brandEmailShell, emailDetailRows, EMAIL_BRAND } from "@/lib/email-templates";
import { insertQuotation, isFormDbConfigured } from "@/lib/form-db";
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

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  if (!name || !email || !phone) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const location = String(body.location ?? "").trim();
  const inquiryType = String(body.inquiryType ?? "Product").trim();
  const pumpType = String(body.pumpType ?? "").trim();
  const flowRate = String(body.flowRate ?? "").trim();
  const depth = String(body.depth ?? "").trim();
  const message = String(body.message ?? "").trim();

  let saved = false;
  if (isFormDbConfigured()) {
    try {
      await insertQuotation({
        name,
        email,
        phone,
        location,
        pump_type: pumpType || inquiryType,
        flow_rate: flowRate,
        depth,
        message,
      });
      saved = true;
    } catch (err) {
      console.error("[DB] quote insert failed:", err instanceof Error ? err.message : err);
    }
  }

  const resend = getResend();
  if (!resend) {
    if (saved) {
      return NextResponse.json({ ok: true, saved: true, warning: "email_not_configured" });
    }
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const from = getFromEmail();
  const ownerInboxes = getOwnerNotifyEmails();

  const clientBody = `
              <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
              <p style="margin:0 0 16px;">Thank you for requesting a quote. This message confirms we received your enquiry at <strong>${escapeHtml(email)}</strong>.</p>
              <p style="margin:0 0 16px;">Our engineers are reviewing your request and will send your quote as soon as possible.</p>
              <p style="margin:0;">If anything changes or you need to add details, reply to this email or call our support line.</p>`;

  const ownerRows = emailDetailRows(
    [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Location", value: location || "Not specified" },
      { label: "Inquiry type", value: inquiryType },
      { label: "Selected item", value: pumpType || inquiryType },
      { label: "Flow rate (m³/hr)", value: flowRate },
      { label: "Depth (m)", value: depth },
      { label: "Requirements", value: message },
    ],
    escapeHtml,
  );

  const ownerBody = `${ownerRows}
              <p style="margin:24px 0 0;font-size:13px;color:${EMAIL_BRAND.secondary};line-height:1.55;">
                <strong style="color:${EMAIL_BRAND.primary};">Reply</strong> to this email to reach the customer — Reply-To is set to their address.
              </p>`;

  const { clientSent, ownerSent, warnings } = await sendLeadEmails(resend, {
    from,
    ownerInboxes,
    client: {
      to: email,
      subject: "We received your quote request — Afrotech Water Solutions",
      html: brandEmailShell({
        eyebrow: "Afrotech Water Solutions",
        title: "Your quote request is received",
        bodyHtml: clientBody,
      }),
    },
    owner: {
      subject: `[Afrotech] Quote request — ${name}`,
      html: brandEmailShell({
        eyebrow: "New lead · Website form",
        title: "Quote request",
        bodyHtml: ownerBody,
      }),
      replyTo: email,
    },
  });

  if (saved || clientSent || ownerSent) {
    return NextResponse.json({
      ok: true,
      saved,
      emails: { client: clientSent, owner: ownerSent },
      ...(warnings.length ? { warning: warnings.join("; ") } : {}),
    });
  }

  return NextResponse.json(
    { ok: false, error: "submit_failed", reason: warnings.join("; ") || "Could not save or send" },
    { status: 502 },
  );
}
