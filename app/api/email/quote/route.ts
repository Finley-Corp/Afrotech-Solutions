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
  const pumpType = String(body.pumpType ?? "").trim();
  const flowRate = String(body.flowRate ?? "").trim();
  const depth = String(body.depth ?? "").trim();
  const message = String(body.message ?? "").trim();

  const from = getFromEmail();
  const ownerInboxes = getOwnerNotifyEmails();

  const clientBody = `
              <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
              <p style="margin:0 0 16px;">Thank you for requesting a quote. This message confirms we received your enquiry at <strong>${escapeHtml(email)}</strong>.</p>
              <p style="margin:0 0 16px;">Our engineers will review your requirements (pump type, flow, depth, and location) and respond within <strong style="color:${EMAIL_BRAND.accent};">24 hours</strong>.</p>
              <p style="margin:0;">If anything changes or you need to add details, reply to this email or call our support line.</p>`;

  const clientHtml = brandEmailShell({
    eyebrow: "Afrotech Water Solutions",
    title: "Your quote request is received",
    bodyHtml: clientBody,
  });

  const { error: clientErr } = await resend.emails.send({
    from,
    to: [email],
    subject: "We received your quote request — Afrotech Water Solutions",
    html: clientHtml,
  });

  if (clientErr) {
    console.error("[Resend] quote client confirmation:", clientErr);
    return NextResponse.json(
      { ok: false, error: "send_failed", reason: resendErrorMessage(clientErr) },
      { status: 502 },
    );
  }

  const ownerRows = emailDetailRows(
    [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Location", value: location },
      { label: "Pump type", value: pumpType },
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

  const ownerHtml = brandEmailShell({
    eyebrow: "New lead · Website form",
    title: "Quote request",
    bodyHtml: ownerBody,
  });

  const { error: teamErr } = await resend.emails.send({
    from,
    to: ownerInboxes,
    replyTo: email,
    subject: `[Afrotech] Quote request — ${name}`,
    html: ownerHtml,
  });

  if (teamErr) {
    console.error("[Resend] quote owner notify:", teamErr);
    return NextResponse.json({
      ok: true,
      warning: "team_notify_failed",
      reason: resendErrorMessage(teamErr),
    });
  }

  return NextResponse.json({ ok: true });
}
