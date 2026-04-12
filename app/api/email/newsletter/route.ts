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

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const from = getFromEmail();
  const ownerInboxes = getOwnerNotifyEmails();

  const welcomeBody = `
              <p style="margin:0 0 16px;">Thanks for subscribing.</p>
              <p style="margin:0;">You’ll hear from us with technical updates and product news relevant to water systems in East Africa.</p>`;

  const welcomeHtml = brandEmailShell({
    eyebrow: "Afrotech Water Solutions",
    title: "You’re subscribed",
    bodyHtml: welcomeBody,
  });

  const { error: welcomeErr } = await resend.emails.send({
    from,
    to: [email],
    subject: "You’re subscribed — Afrotech Water Solutions",
    html: welcomeHtml,
  });

  if (welcomeErr) {
    console.error("[Resend] newsletter welcome:", welcomeErr);
    return NextResponse.json(
      { ok: false, error: "send_failed", reason: resendErrorMessage(welcomeErr) },
      { status: 502 },
    );
  }

  const ownerRows = emailDetailRows([{ label: "Subscriber email", value: email }], escapeHtml);

  const ownerBody = `${ownerRows}
              <p style="margin:24px 0 0;font-size:13px;color:${EMAIL_BRAND.secondary};line-height:1.55;">
                This address was added via the site footer form.
              </p>`;

  const ownerHtml = brandEmailShell({
    eyebrow: "New subscriber · Website",
    title: "Newsletter signup",
    bodyHtml: ownerBody,
  });

  const { error: teamErr } = await resend.emails.send({
    from,
    to: ownerInboxes,
    replyTo: email,
    subject: `[Afrotech] New newsletter subscriber`,
    html: ownerHtml,
  });

  if (teamErr) {
    console.error("[Resend] newsletter owner notify:", teamErr);
    return NextResponse.json({
      ok: true,
      warning: "team_notify_failed",
      reason: resendErrorMessage(teamErr),
    });
  }

  return NextResponse.json({ ok: true });
}
