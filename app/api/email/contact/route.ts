import { NextResponse } from "next/server";
import { brandEmailShell, emailDetailRows, EMAIL_BRAND } from "@/lib/email-templates";
import {
  escapeHtml,
  getFromEmail,
  getOwnerNotifyEmails,
  getResend,
  resendErrorMessage,
} from "@/lib/resend";

export async function POST(req: Request) {
  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

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

  const from = getFromEmail();
  const ownerInboxes = getOwnerNotifyEmails();

  const clientBody = `
              <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
              <p style="margin:0 0 16px;">Thank you for contacting Afrotech. Our engineering team typically responds within <strong style="color:${EMAIL_BRAND.accent};">24 hours</strong>.</p>
              <p style="margin:0;">If your request is urgent, call our support line or reply to this email with more detail.</p>`;

  const clientHtml = brandEmailShell({
    eyebrow: "Afrotech Water Solutions",
    title: "We received your message",
    bodyHtml: clientBody,
  });

  const { error: clientErr } = await resend.emails.send({
    from,
    to: [email],
    subject: "We received your message — Afrotech Water Solutions",
    html: clientHtml,
  });

  if (clientErr) {
    console.error("[Resend] contact client confirmation:", clientErr);
    return NextResponse.json(
      { ok: false, error: "send_failed", reason: resendErrorMessage(clientErr) },
      { status: 502 },
    );
  }

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

  const ownerHtml = brandEmailShell({
    eyebrow: "New lead · Website form",
    title: "Contact enquiry",
    bodyHtml: ownerBody,
  });

  const { error: teamErr } = await resend.emails.send({
    from,
    to: ownerInboxes,
    replyTo: email,
    subject: `[Afrotech] ${subject}`,
    html: ownerHtml,
  });

  if (teamErr) {
    console.error("[Resend] contact owner notify:", teamErr);
    return NextResponse.json({
      ok: true,
      warning: "team_notify_failed",
      reason: resendErrorMessage(teamErr),
    });
  }

  return NextResponse.json({ ok: true });
}
