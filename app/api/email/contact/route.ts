import { NextResponse } from "next/server";
import { brandEmailShell, emailDetailRows, EMAIL_BRAND } from "@/lib/email-templates";
import { insertContact, isFormDbConfigured } from "@/lib/form-db";
import { sendLeadEmails } from "@/lib/form-email";
import {
  escapeHtml,
  getFromEmail,
  getOwnerNotifyEmails,
  getResend,
} from "@/lib/resend";

export async function POST(req: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "General enquiry").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  let saved = false;
  if (isFormDbConfigured()) {
    try {
      await insertContact({ name, email, subject, message });
      saved = true;
    } catch (err) {
      console.error("[DB] contact insert failed:", err instanceof Error ? err.message : err);
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
              <p style="margin:0 0 16px;">Thank you for contacting Afrotech. Our engineering team typically responds within <strong style="color:${EMAIL_BRAND.accent};">24 hours</strong>.</p>
              <p style="margin:0;">If your request is urgent, call our support line or reply to this email with more detail.</p>`;

  const ownerRows = emailDetailRows(
    [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Subject", value: subject },
      { label: "Message", value: message },
    ],
    escapeHtml,
  );

  const ownerBody = `${ownerRows}
              <p style="margin:24px 0 0;font-size:13px;color:${EMAIL_BRAND.secondary};line-height:1.55;">
                <strong style="color:${EMAIL_BRAND.primary};">Reply</strong> to this email to reach the visitor — Reply-To is set to their address.
              </p>`;

  const { clientSent, ownerSent, warnings } = await sendLeadEmails(resend, {
    from,
    ownerInboxes,
    client: {
      to: email,
      subject: "We received your message — Afrotech Water Solutions",
      html: brandEmailShell({
        eyebrow: "Afrotech Water Solutions",
        title: "We received your message",
        bodyHtml: clientBody,
      }),
    },
    owner: {
      subject: `[Afrotech] ${subject}`,
      html: brandEmailShell({
        eyebrow: "New lead · Website form",
        title: "Contact enquiry",
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
