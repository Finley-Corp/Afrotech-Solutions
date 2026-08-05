import { NextResponse } from "next/server";
import { getContactRoute } from "@/lib/company";
import { brandEmailShell, emailDetailRows, EMAIL_BRAND } from "@/lib/email-templates";
import { insertContact, isFormDbConfigured } from "@/lib/form-db";
import { sendLeadEmails } from "@/lib/form-email";
import { URGENCY_OPTIONS } from "@/lib/quote-form";
import {
  escapeHtml,
  getContactChannelNotifyEmails,
  getFromEmail,
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
  const subject = String(body.subject ?? "General Inquiry").trim();
  const urgency = String(body.urgency ?? "routine").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const route = getContactRoute(subject);
  const urgencyLabel = URGENCY_OPTIONS.find((o) => o.value === urgency)?.label ?? urgency;
  const isUrgent = urgency === "emergency";

  const dbMessage = [
    phone ? `Phone: ${phone}` : "",
    `Urgency: ${urgencyLabel}`,
    `Channel: ${route.channel}`,
    route.notifyHint,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  let saved = false;
  if (isFormDbConfigured()) {
    try {
      await insertContact({ name, email, subject: `${route.ownerSubjectPrefix} ${subject}`, message: dbMessage });
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
  const ownerInboxes = getContactChannelNotifyEmails(route.channel);

  const clientBody = `
              <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
              <p style="margin:0 0 16px;">Thank you for contacting Afrotech regarding <strong>${escapeHtml(subject)}</strong>.</p>
              <p style="margin:0 0 16px;">${
                isUrgent
                  ? "We have flagged this as urgent. For immediate breakdowns, call our 24/7 emergency line."
                  : `Our team typically responds within <strong style="color:${EMAIL_BRAND.accent};">24 hours</strong>.`
              }</p>
              <p style="margin:0;">If your request involves a product, service, or pricing, you can also use our <a href="https://afrotechsolutions.com/quote">quote form</a> for a faster, context-specific submission.</p>`;

  const ownerRows = emailDetailRows(
    [
      { label: "Name", value: name },
      { label: "Email", value: email },
      ...(phone ? [{ label: "Phone", value: phone }] : []),
      { label: "Subject", value: subject },
      { label: "Channel", value: route.channel },
      { label: "Urgency", value: urgencyLabel },
      { label: "Route hint", value: route.notifyHint },
      ...(route.phoneHint ? [{ label: "Preferred phone", value: route.phoneHint }] : []),
      { label: "Message", value: message },
    ],
    escapeHtml,
  );

  const ownerBody = `${ownerRows}
              <p style="margin:24px 0 0;font-size:13px;color:${EMAIL_BRAND.secondary};line-height:1.55;">
                <strong style="color:${EMAIL_BRAND.primary};">Reply</strong> to reach the visitor — Reply-To is set to their address.
              </p>`;

  const ownerSubject = isUrgent
    ? `[URGENT] ${route.ownerSubjectPrefix} ${subject} — ${name}`
    : `${route.ownerSubjectPrefix} ${subject} — ${name}`;

  const { clientSent, ownerSent, warnings } = await sendLeadEmails(resend, {
    from,
    ownerInboxes,
    client: {
      to: email,
      subject: "We received your message — Afrotech Water Solutions",
      html: brandEmailShell({
        eyebrow: "Afrotech Water Solutions",
        title: isUrgent ? "Urgent message received" : "We received your message",
        bodyHtml: clientBody,
      }),
    },
    owner: {
      subject: ownerSubject,
      html: brandEmailShell({
        eyebrow: `Contact · ${route.channel}`,
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
