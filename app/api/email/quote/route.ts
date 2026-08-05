import { NextResponse } from "next/server";
import type { QuoteCartItem } from "@/lib/quote-cart";
import { brandEmailShell, emailDetailRows, EMAIL_BRAND } from "@/lib/email-templates";
import { insertQuotation, isFormDbConfigured } from "@/lib/form-db";
import { sendLeadEmails } from "@/lib/form-email";
import {
  generateQuoteReference,
  isUrgentSubmission,
  responseWindowForSubmission,
  URGENCY_OPTIONS,
  ATTACHMENT_ALLOWED_TYPES,
  ATTACHMENT_MAX_BYTES,
  type QuoteContextType,
} from "@/lib/quote-form";
import { getServiceBySlug, resolveServiceSlug } from "@/app/data/services";
import {
  escapeHtml,
  getFromEmail,
  getOwnerNotifyEmails,
  getResend,
} from "@/lib/resend";

type AttachmentPayload = {
  filename?: string;
  contentType?: string;
  data?: string;
};

function labelize(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function buildDbMessage(payload: Record<string, unknown>): string {
  const lines: string[] = [];
  const ref = String(payload.reference ?? "");
  if (ref) lines.push(`Reference: ${ref}`);

  const context = String(payload.context ?? "generic");
  lines.push(`Context: ${context}`);

  if (payload.urgency) lines.push(`Urgency: ${payload.urgency}`);
  if (payload.serviceTitle) lines.push(`Service: ${payload.serviceTitle}`);
  if (payload.serviceVariant) lines.push(`Request type: ${payload.serviceVariant}`);

  const product = payload.product as { name?: string; brand?: string; slug?: string } | undefined;
  if (product?.name) {
    lines.push(`Product: ${product.name}${product.brand ? ` (${product.brand})` : ""}`);
  }

  const cart = payload.cartItems as QuoteCartItem[] | undefined;
  if (cart?.length) {
    lines.push("Cart items:");
    for (const item of cart) {
      lines.push(`  ${item.quantity}× ${item.name} (${item.brand})`);
    }
  }

  const serviceFields = payload.serviceFields as Record<string, string> | undefined;
  if (serviceFields) {
    for (const [k, v] of Object.entries(serviceFields)) {
      if (v?.trim()) lines.push(`${labelize(k)}: ${v.trim()}`);
    }
  }

  if (payload.inquiryType) lines.push(`Inquiry type: ${payload.inquiryType}`);
  if (payload.flowRate) lines.push(`Flow rate: ${payload.flowRate} m³/hr`);
  if (payload.depth) lines.push(`Depth: ${payload.depth} m`);
  if (payload.locationOther) lines.push(`Location detail: ${payload.locationOther}`);
  if (payload.message) lines.push(`Requirements:\n${payload.message}`);
  if (payload.attachmentFilename) lines.push(`Attachment: ${payload.attachmentFilename}`);

  return lines.join("\n");
}

function buildSummaryRows(payload: Record<string, unknown>): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: "Reference", value: String(payload.reference ?? "") },
    { label: "Name", value: String(payload.name ?? "") },
    { label: "Email", value: String(payload.email ?? "") },
    { label: "Phone", value: String(payload.phone ?? "") },
    { label: "Location", value: String(payload.location ?? "Not specified") },
  ];

  if (payload.locationOther) {
    rows.push({ label: "Location detail", value: String(payload.locationOther) });
  }

  const urgency = String(payload.urgency ?? "").trim();
  if (urgency) {
    const label = URGENCY_OPTIONS.find((o) => o.value === urgency)?.label ?? urgency;
    rows.push({ label: "Urgency", value: label });
  }

  const context = String(payload.context ?? "") as QuoteContextType;
  if (context === "service" && payload.serviceTitle) {
    rows.push({ label: "Service", value: String(payload.serviceTitle) });
    if (payload.serviceVariant) rows.push({ label: "Request type", value: String(payload.serviceVariant) });
  }

  const product = payload.product as { name?: string; brand?: string } | undefined;
  if (product?.name) {
    rows.push({ label: "Product", value: `${product.name}${product.brand ? ` (${product.brand})` : ""}` });
  }

  const cart = payload.cartItems as QuoteCartItem[] | undefined;
  if (cart?.length) {
    rows.push({
      label: "Products in quote",
      value: cart.map((i) => `${i.quantity}× ${i.name}`).join("; "),
    });
  }

  const serviceFields = payload.serviceFields as Record<string, string> | undefined;
  if (serviceFields) {
    for (const [k, v] of Object.entries(serviceFields)) {
      if (v?.trim()) rows.push({ label: labelize(k), value: v.trim() });
    }
  }

  if (context === "generic" || context === "product" || context === "cart") {
    if (payload.inquiryType) rows.push({ label: "Inquiry type", value: String(payload.inquiryType) });
    if (payload.pumpType) rows.push({ label: "Pump / model", value: String(payload.pumpType) });
    if (payload.flowRate) rows.push({ label: "Flow rate (m³/hr)", value: String(payload.flowRate) });
    if (payload.depth) rows.push({ label: "Depth (m)", value: String(payload.depth) });
  }

  if (payload.message) rows.push({ label: "Requirements", value: String(payload.message) });
  if (payload.attachmentFilename) rows.push({ label: "Attachment", value: String(payload.attachmentFilename) });

  return rows.filter((r) => r.value);
}

function buildClientSummaryHtml(payload: Record<string, unknown>, esc: (s: string) => string): string {
  const rows = buildSummaryRows(payload);
  const items = rows
    .map(
      (r) =>
        `<tr><td style="padding:8px 12px 8px 0;font-size:13px;color:${EMAIL_BRAND.secondary};vertical-align:top;white-space:nowrap;">${esc(r.label)}</td><td style="padding:8px 0;font-size:13px;color:${EMAIL_BRAND.primary};">${esc(r.value)}</td></tr>`,
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;margin:16px 0 0;">${items}</table>`;
}

function parseAttachment(raw: unknown): { filename: string; content: string } | null {
  if (!raw || typeof raw !== "object") return null;
  const a = raw as AttachmentPayload;
  const filename = String(a.filename ?? "").trim();
  const contentType = String(a.contentType ?? "").trim();
  const data = String(a.data ?? "").trim();
  if (!filename || !data) return null;
  if (!ATTACHMENT_ALLOWED_TYPES.includes(contentType)) return null;
  const buf = Buffer.from(data, "base64");
  if (buf.length > ATTACHMENT_MAX_BYTES) return null;
  return { filename, content: data };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
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

  const reference = generateQuoteReference();
  const context = String(body.context ?? "generic") as QuoteContextType;
  const location = String(body.location ?? "").trim();
  const locationOther = String(body.locationOther ?? "").trim();
  const urgency = String(body.urgency ?? "").trim();
  const inquiryType = String(body.inquiryType ?? "Product").trim();
  const pumpType = String(body.pumpType ?? "").trim();
  const flowRate = String(body.flowRate ?? "").trim();
  const depth = String(body.depth ?? "").trim();
  const message = String(body.message ?? "").trim();

  const serviceSlug = resolveServiceSlug(String(body.serviceSlug ?? "").trim());
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
  const serviceVariant = String(body.serviceVariant ?? "").trim();
  const maintenanceVariant = String(body.maintenanceVariant ?? "").trim();
  const serviceFields = (body.serviceFields ?? {}) as Record<string, string>;

  const product = body.product as { slug?: string; name?: string; brand?: string } | undefined;
  const cartItems = Array.isArray(body.cartItems) ? (body.cartItems as QuoteCartItem[]) : [];

  const activeVariant = service?.form.variants?.find(
    (v) => v.id === maintenanceVariant || v.id === serviceVariant,
  );
  const isUrgent = isUrgentSubmission({
    urgency,
    servicePriority: activeVariant?.priority,
    maintenanceVariant,
  });

  const attachment = parseAttachment(body.attachment);

  const payload = {
    reference,
    context,
    name,
    email,
    phone,
    location: location === "Other / Off-grid" && locationOther ? `${location} — ${locationOther}` : location,
    locationOther,
    urgency,
    inquiryType,
    pumpType,
    flowRate,
    depth,
    message,
    serviceSlug,
    serviceTitle: service?.title ?? "",
    serviceVariant: activeVariant?.label ?? serviceVariant,
    maintenanceVariant,
    serviceFields,
    product,
    cartItems,
    attachmentFilename: attachment?.filename ?? "",
  };

  const dbMessage = buildDbMessage(payload);
  const pumpTypeForDb =
    product?.name ||
    pumpType ||
    (cartItems.length ? `${cartItems.length} catalogue item(s)` : "") ||
    service?.title ||
    inquiryType;

  let saved = false;
  if (isFormDbConfigured()) {
    try {
      await insertQuotation({
        name,
        email,
        phone,
        location: String(payload.location),
        pump_type: pumpTypeForDb,
        flow_rate: flowRate,
        depth,
        message: dbMessage,
      });
      saved = true;
    } catch (err) {
      console.error("[DB] quote insert failed:", err instanceof Error ? err.message : err);
    }
  }

  const resend = getResend();
  if (!resend) {
    if (saved) {
      return NextResponse.json({
        ok: true,
        saved: true,
        reference,
        isUrgent,
        responseWindow: responseWindowForSubmission(isUrgent),
        warning: "email_not_configured",
      });
    }
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const from = getFromEmail();
  const ownerInboxes = getOwnerNotifyEmails();
  const responseWindow = responseWindowForSubmission(isUrgent);

  let contextIntro = "Thank you for your quote request.";
  if (context === "service" && service) {
    contextIntro =
      service.status === "planned"
        ? `Thank you for registering interest in ${service.title}. This capability is in development — we will contact you when it becomes available.`
        : `Thank you for your ${service.title.toLowerCase()} request.`;
  } else if (context === "product" && product?.name) {
    contextIntro = `Thank you for requesting a quote for ${product.name}.`;
  } else if (context === "cart" && cartItems.length) {
    contextIntro = `Thank you for your quote request covering ${cartItems.length} product${cartItems.length === 1 ? "" : "s"} from our catalogue.`;
  }

  const clientBody = `
    <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">${escapeHtml(contextIntro)}</p>
    <p style="margin:0 0 8px;"><strong style="color:${EMAIL_BRAND.primary};">Reference:</strong> ${escapeHtml(reference)}</p>
    <p style="margin:0 0 16px;font-size:14px;color:${EMAIL_BRAND.secondary};line-height:1.55;">${escapeHtml(responseWindow)}</p>
    <p style="margin:0 0 8px;font-size:13px;color:${EMAIL_BRAND.secondary};">Summary of your submission:</p>
    ${buildClientSummaryHtml(payload, escapeHtml)}
    <p style="margin:24px 0 0;font-size:13px;color:${EMAIL_BRAND.secondary};line-height:1.55;">If anything changes, reply to this email or call our support line.</p>`;

  const ownerRows = emailDetailRows(buildSummaryRows(payload), escapeHtml);
  const ownerBody = `${ownerRows}
    <p style="margin:24px 0 0;font-size:13px;color:${EMAIL_BRAND.secondary};line-height:1.55;">
      <strong style="color:${EMAIL_BRAND.primary};">Reply</strong> to reach the customer — Reply-To is set to their address.
    </p>`;

  const ownerSubject = isUrgent
    ? `[URGENT] Quote — ${service?.title ?? product?.name ?? name} (${reference})`
    : `[Afrotech] Quote request — ${reference} — ${name}`;

  const { clientSent, ownerSent, warnings } = await sendLeadEmails(resend, {
    from,
    ownerInboxes,
    client: {
      to: email,
      subject: `We received your request — ${reference} — Afrotech`,
      html: brandEmailShell({
        eyebrow: "Afrotech Water Solutions",
        title: isUrgent ? "Urgent request received" : "Your request is received",
        bodyHtml: clientBody,
      }),
    },
    owner: {
      subject: ownerSubject,
      html: brandEmailShell({
        eyebrow: `Quote · ${context}${service ? ` · ${service.slug}` : ""}`,
        title: isUrgent ? "Urgent quote / service request" : "Quote request",
        bodyHtml: ownerBody,
      }),
      replyTo: email,
      attachments: attachment ? [attachment] : undefined,
    },
  });

  if (saved || clientSent || ownerSent) {
    return NextResponse.json({
      ok: true,
      saved,
      reference,
      isUrgent,
      responseWindow,
      emails: { client: clientSent, owner: ownerSent },
      ...(warnings.length ? { warning: warnings.join("; ") } : {}),
    });
  }

  return NextResponse.json(
    { ok: false, error: "submit_failed", reason: warnings.join("; ") || "Could not save or send" },
    { status: 502 },
  );
}
