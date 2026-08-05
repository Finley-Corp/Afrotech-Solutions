"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { useQuoteCart } from "@/app/hooks/useQuoteCart";
import {
  getServiceBySlug,
  getServiceFieldsForQuote,
  resolveServiceSlug,
} from "@/app/data/services";
import {
  LOCATION_OTHER,
  QUOTE_LOCATIONS,
  URGENCY_OPTIONS,
  resolveQuoteContext,
  shouldShowHydraulicFields,
  type QuoteContextType,
  type QuoteProductRef,
} from "@/lib/quote-form";
import {
  DynamicFormFields,
  fileToBase64,
  handleAttachmentChange,
  quoteInputStyle,
  quoteLabelStyle,
} from "./QuoteFormFields";

const GENERIC_PUMP_OPTIONS = [
  "Submersible (Borehole)",
  "Solar Pumping System",
  "Industrial Centrifugal",
  "Unsure / Need Assessment",
];

type Confirmation = {
  reference: string;
  email: string;
  responseWindow: string;
  isUrgent: boolean;
  summary: { label: string; value: string }[];
};

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const { items: cartItems, remove: removeCartItem, setQuantity, clear: clearCart } = useQuoteCart();

  const serviceSlugParam = resolveServiceSlug(searchParams.get("service")?.trim() || "");
  const modelSlugParam = searchParams.get("model")?.trim() || "";
  const cartParam = searchParams.get("cart");

  const service = serviceSlugParam ? getServiceBySlug(serviceSlugParam) : undefined;
  const context: QuoteContextType = resolveQuoteContext(
    serviceSlugParam || null,
    modelSlugParam || null,
    cartParam,
    cartItems.length,
  );

  const [product, setProduct] = useState<QuoteProductRef | null>(null);
  const [productLoading, setProductLoading] = useState(Boolean(modelSlugParam));
  const [maintenanceVariant, setMaintenanceVariant] = useState(
    service?.form.variants?.[0]?.id ?? "emergency",
  );
  const [serviceFields, setServiceFields] = useState<Record<string, string>>({});
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentError, setAttachmentError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Nairobi, Kenya",
    locationOther: "",
    inquiryType: "Product",
    pumpType: GENERIC_PUMP_OPTIONS[0],
    flowRate: "",
    depth: "",
    message: "",
    urgency: "routine",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  useEffect(() => {
    if (!modelSlugParam) {
      setProduct(null);
      setProductLoading(false);
      return;
    }
    let cancelled = false;
    setProductLoading(true);
    fetch(`/api/products/${encodeURIComponent(modelSlugParam)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.name) {
          setProduct({
            slug: data.slug ?? modelSlugParam,
            name: data.name,
            brand: data.category ?? "",
          });
        } else {
          setProduct({
            slug: modelSlugParam,
            name: modelSlugParam.replace(/-/g, " "),
            brand: "",
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProduct({ slug: modelSlugParam, name: modelSlugParam, brand: "" });
        }
      })
      .finally(() => {
        if (!cancelled) setProductLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [modelSlugParam]);

  useEffect(() => {
    if (context === "service") {
      setFormData((prev) => ({ ...prev, inquiryType: "Service" }));
    } else if (context === "product" || context === "cart") {
      setFormData((prev) => ({ ...prev, inquiryType: "Product" }));
    }
  }, [context]);

  const activeServiceFields = useMemo(() => {
    if (!service) return [];
    return getServiceFieldsForQuote(service, maintenanceVariant);
  }, [service, maintenanceVariant]);

  const showHydraulic = shouldShowHydraulicFields(context, formData.inquiryType);
  const showInquiryType = context === "generic";
  const showPumpDropdown = context === "generic" && formData.inquiryType !== "Service";
  const showLocationOther = formData.location === LOCATION_OTHER;
  const showUrgency =
    context === "generic" || (context === "service" && service?.slug === "maintenance-support");
  const showMaintenanceToggle = context === "service" && service?.slug === "maintenance-support";

  const pageTitle = useMemo(() => {
    if (context === "service" && service) return service.form.submitLabel;
    if (context === "product") return "Request a Product Quote";
    if (context === "cart") return "Request a Multi-Product Quote";
    return "Request a Quote";
  }, [context, service]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildSummary = (): { label: string; value: string }[] => {
    const rows: { label: string; value: string }[] = [
      { label: "Name", value: formData.name },
      { label: "Email", value: formData.email },
      { label: "Phone", value: formData.phone },
      {
        label: "Location",
        value:
          formData.location === LOCATION_OTHER && formData.locationOther
            ? `${formData.location} — ${formData.locationOther}`
            : formData.location,
      },
    ];
    if (showUrgency) {
      const u = URGENCY_OPTIONS.find((o) => o.value === formData.urgency);
      if (u) rows.push({ label: "Urgency", value: u.label });
    }
    if (service) rows.push({ label: "Service", value: service.title });
    if (showMaintenanceToggle) {
      const v = service?.form.variants?.find((x) => x.id === maintenanceVariant);
      if (v) rows.push({ label: "Request type", value: v.label });
    }
    if (product) rows.push({ label: "Product", value: `${product.name}${product.brand ? ` (${product.brand})` : ""}` });
    if (cartItems.length) {
      rows.push({
        label: "Products",
        value: cartItems.map((i) => `${i.quantity}× ${i.name}`).join(", "),
      });
    }
    for (const field of activeServiceFields) {
      const v = serviceFields[field.name];
      if (v?.trim()) rows.push({ label: field.label, value: v });
    }
    if (showInquiryType) rows.push({ label: "Inquiry type", value: formData.inquiryType });
    if (showPumpDropdown && formData.pumpType) rows.push({ label: "Pump / model", value: formData.pumpType });
    if (showHydraulic && formData.flowRate) rows.push({ label: "Flow rate", value: `${formData.flowRate} m³/hr` });
    if (showHydraulic && formData.depth) rows.push({ label: "Depth", value: `${formData.depth} m` });
    if (formData.message) rows.push({ label: "Requirements", value: formData.message });
    if (attachment) rows.push({ label: "Attachment", value: attachment.name });
    return rows;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    let attachmentPayload: { filename: string; contentType: string; data: string } | undefined;
    if (attachment) {
      try {
        attachmentPayload = {
          filename: attachment.name,
          contentType: attachment.type,
          data: await fileToBase64(attachment),
        };
      } catch {
        setError("Could not read the attached file. Please try again.");
        setSubmitting(false);
        return;
      }
    }

    const activeVariant = service?.form.variants?.find((v) => v.id === maintenanceVariant);

    const payload = {
      context,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      locationOther: showLocationOther ? formData.locationOther : "",
      urgency: showUrgency ? formData.urgency : "",
      inquiryType: context === "generic" ? formData.inquiryType : context === "service" ? "Service" : "Product",
      pumpType: showPumpDropdown ? formData.pumpType : product?.name ?? "",
      flowRate: showHydraulic ? formData.flowRate : "",
      depth: showHydraulic ? formData.depth : "",
      message: formData.message,
      product: product ?? undefined,
      cartItems,
      serviceSlug: service?.slug ?? "",
      serviceVariant: activeVariant?.label ?? "",
      maintenanceVariant: showMaintenanceToggle ? maintenanceVariant : "",
      serviceFields,
      attachment: attachmentPayload,
    };

    try {
      const res = await fetch("/api/email/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          "We could not submit your request right now. Please call us or email contact@afrotechsolutions.com.",
        );
        return;
      }
      setConfirmation({
        reference: data.reference,
        email: formData.email,
        responseWindow: data.responseWindow,
        isUrgent: Boolean(data.isUrgent),
        summary: buildSummary(),
      });
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("We could not submit your request. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <section className="quote-confirmation">
        <div className="quote-confirmation__icon">
          <Icon icon="lucide:check" width={32} />
        </div>
        <h1>Request Received</h1>
        <p className="quote-confirmation__ref">
          Reference: <strong>{confirmation.reference}</strong>
        </p>
        <p className="quote-confirmation__window">{confirmation.responseWindow}</p>
        <p className="quote-confirmation__email">
          A confirmation email has been sent to <strong>{confirmation.email}</strong>.
        </p>
        <div className="quote-confirmation__summary">
          <h2>What you submitted</h2>
          <dl>
            {confirmation.summary.map((row) => (
              <div key={row.label} className="quote-confirmation__row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Link href="/" className="schedule-btn quote-confirmation__home">
          Return to Home
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="quote-page-hero">
        <span className="quote-page-hero__eyebrow">Technical Consultation — Afrotech</span>
        <h1>{pageTitle}</h1>
        <p>
          {context === "service" && service?.status === "planned"
            ? "Register your interest — this service is in development and not available for deployment today."
            : "Our engineering team provides quotes and technical support for water systems across East Africa."}
        </p>
      </section>

      <section className="quote-page-body">
        <div className="quote-layout">
          <form onSubmit={handleSubmit} className="quote-form reveal-fade">
            {context === "service" && service && (
              <div className="quote-context-banner">
                <div>
                  <span className="quote-context-banner__label">Requesting</span>
                  <strong>{service.title}</strong>
                  {service.status === "planned" && (
                    <span className="svc-badge svc-badge--planned svc-badge--sm">Planned — not live</span>
                  )}
                </div>
                <Link href="/services" className="quote-context-banner__link">
                  Not this? Choose a different service
                </Link>
              </div>
            )}

            {context === "product" && (
              <div className="quote-context-banner">
                <div>
                  <span className="quote-context-banner__label">Product</span>
                  {productLoading ? (
                    <strong>Loading product…</strong>
                  ) : (
                    <strong>
                      {product?.name ?? modelSlugParam}
                      {product?.brand ? ` · ${product.brand}` : ""}
                    </strong>
                  )}
                </div>
                <Link href="/products" className="quote-context-banner__link">
                  Change product
                </Link>
              </div>
            )}

            {(context === "cart" || cartItems.length > 0) && (
              <div className="quote-cart-panel">
                <div className="quote-cart-panel__head">
                  <h3>Your quote list</h3>
                  <span>{cartItems.reduce((s, i) => s + i.quantity, 0)} items</span>
                </div>
                {cartItems.length === 0 ? (
                  <p className="quote-cart-panel__empty">
                    No products in your quote list yet.{" "}
                    <Link href="/products">Browse the catalogue</Link> to add items.
                  </p>
                ) : (
                  <ul className="quote-cart-panel__list">
                    {cartItems.map((item) => (
                      <li key={item.id} className="quote-cart-panel__item">
                        <div>
                          <strong>{item.name}</strong>
                          <span className="quote-cart-panel__brand">{item.brand}</span>
                        </div>
                        <div className="quote-cart-panel__controls">
                          <input
                            type="number"
                            min={1}
                            max={99}
                            value={item.quantity}
                            onChange={(e) => setQuantity(item.id, Number(e.target.value) || 1)}
                            aria-label={`Quantity for ${item.name}`}
                          />
                          <button type="button" onClick={() => removeCartItem(item.id)} aria-label="Remove">
                            <Icon icon="lucide:x" width={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="quote-field-row">
              <div>
                <label style={quoteLabelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="e.g., John Doe"
                  style={quoteInputStyle}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={quoteLabelStyle}>Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="e.g., john@company.com"
                  style={quoteInputStyle}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="quote-field-row">
              <div>
                <label style={quoteLabelStyle}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="+254 --- --- ---"
                  style={quoteInputStyle}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={quoteLabelStyle}>Project Location</label>
                <select
                  name="location"
                  style={quoteInputStyle}
                  value={formData.location}
                  onChange={handleChange}
                >
                  {QUOTE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {showLocationOther && (
              <div>
                <label style={quoteLabelStyle}>Location details</label>
                <input
                  type="text"
                  name="locationOther"
                  required
                  placeholder="Town, region, or site description"
                  style={quoteInputStyle}
                  value={formData.locationOther}
                  onChange={handleChange}
                />
              </div>
            )}

            {showUrgency && !showMaintenanceToggle && (
              <div>
                <label style={quoteLabelStyle}>How urgent is this? *</label>
                <select
                  name="urgency"
                  required
                  style={quoteInputStyle}
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  {URGENCY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showMaintenanceToggle && service?.form.variants && (
              <div className="svc-form__variants" role="tablist" aria-label="Request type">
                {service.form.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={maintenanceVariant === v.id}
                    className={`svc-form__variant${maintenanceVariant === v.id ? " is-active" : ""}${v.priority === "emergency" ? " svc-form__variant--urgent" : ""}`}
                    onClick={() => {
                      setMaintenanceVariant(v.id);
                      setServiceFields({});
                    }}
                  >
                    <span className="svc-form__variant-label">{v.label}</span>
                    <span className="svc-form__variant-desc">{v.description}</span>
                  </button>
                ))}
              </div>
            )}

            {context === "service" && service && (
              <div className="quote-service-fields">
                <DynamicFormFields
                  fields={activeServiceFields}
                  values={serviceFields}
                  onChange={(name, value) => setServiceFields((prev) => ({ ...prev, [name]: value }))}
                  idPrefix="svc-"
                />
              </div>
            )}

            {showInquiryType && (
              <div className="quote-field-row">
                <div>
                  <label style={quoteLabelStyle}>Inquiry Type</label>
                  <select
                    name="inquiryType"
                    style={quoteInputStyle}
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option>Product</option>
                    <option>Service</option>
                    <option>Both</option>
                  </select>
                </div>
                {showPumpDropdown && (
                  <div>
                    <label style={quoteLabelStyle}>Product Model / Pump Type</label>
                    <select
                      name="pumpType"
                      style={quoteInputStyle}
                      value={formData.pumpType}
                      onChange={handleChange}
                    >
                      {GENERIC_PUMP_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {showHydraulic && (
              <div className="quote-field-row">
                <div>
                  <label style={quoteLabelStyle}>Required Flow Rate (m³/hr)</label>
                  <input
                    type="text"
                    name="flowRate"
                    placeholder="e.g., 10"
                    style={quoteInputStyle}
                    value={formData.flowRate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label style={quoteLabelStyle}>Borehole / Well Depth (meters)</label>
                  <input
                    type="text"
                    name="depth"
                    placeholder="e.g., 120"
                    style={quoteInputStyle}
                    value={formData.depth}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={quoteLabelStyle}>Specific Requirements / Application</label>
              <textarea
                name="message"
                rows={4}
                placeholder={
                  context === "cart"
                    ? "Notes for the whole order (optional)…"
                    : "Tell us about your technical requirements…"
                }
                style={{ ...quoteInputStyle, resize: "vertical" }}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={quoteLabelStyle}>Attachment (optional)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                className="quote-file-input"
                onChange={(e) =>
                  handleAttachmentChange(
                    e,
                    (file) => setAttachment(file),
                    (msg) => {
                      setAttachmentError(msg);
                      setAttachment(null);
                    },
                  )
                }
              />
              <p className="quote-file-hint">Site photo, pump nameplate, or PDF drawing — max 5 MB</p>
              {attachment && <p className="quote-file-selected">{attachment.name}</p>}
              {attachmentError && <p className="quote-form__error">{attachmentError}</p>}
            </div>

            {error && <p className="quote-form__error">{error}</p>}

            <button type="submit" className="schedule-btn quote-submit-btn" disabled={submitting}>
              {submitting
                ? "Submitting…"
                : context === "service" && service
                  ? service.form.submitLabel
                  : "Submit Requirements"}
            </button>
          </form>

          <aside className="quote-sidebar reveal-fade">
            <div className="quote-sidebar__card">
              <h3>Immediate Support</h3>
              <p>
                For emergency pumping requirements or urgent faults, contact our regional support line
                directly — do not wait for a form response.
              </p>
              <a href="tel:+254737628375">
                <Icon icon="lucide:phone" width={16} />
                +254737628375
              </a>
              <a href="mailto:contact@afrotechsolutions.com">
                <Icon icon="lucide:mail" width={16} />
                contact@afrotechsolutions.com
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
