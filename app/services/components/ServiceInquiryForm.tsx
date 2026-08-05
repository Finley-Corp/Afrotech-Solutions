"use client";

import { useState, type CSSProperties } from "react";
import type { ServiceFormConfig, ServiceItem } from "@/app/data/services";

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "0.85rem 0",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid var(--color-line)",
  fontSize: "0.9375rem",
  fontWeight: 300,
  color: "var(--color-primary)",
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(87,83,78,0.7)",
  marginBottom: "0.75rem",
  fontWeight: 500,
};

type Props = {
  service: ServiceItem;
};

function FormFields({
  fields,
  values,
  onChange,
}: {
  fields: ServiceFormConfig["fields"];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <>
      {fields.map((field) => (
        <div key={field.name}>
          <label style={labelStyle} htmlFor={field.name}>
            {field.label}
            {field.required ? " *" : ""}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              rows={4}
              required={field.required}
              placeholder={field.placeholder}
              style={{ ...inputStyle, resize: "vertical" }}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              style={inputStyle}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
            >
              <option value="">Select…</option>
              {(field.options ?? []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              style={inputStyle}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default function ServiceInquiryForm({ service }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [variantId, setVariantId] = useState(service.form.variants?.[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeVariant = service.form.variants?.find((v) => v.id === variantId);
  const fields = activeVariant?.fields ?? service.form.fields;
  const submitLabel = activeVariant?.submitLabel ?? service.form.submitLabel;

  function onChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/email/service-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: service.slug,
          serviceTitle: service.title,
          priority: activeVariant?.priority ?? "",
          variant: activeVariant?.label ?? "",
          ...values,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "submit_failed");
      }
      setSubmitted(true);
    } catch {
      setError("We could not submit your request. Please call us or email contact@afrotechsolutions.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="svc-form svc-form--success">
        <h3>{service.form.successTitle}</h3>
        <p>{service.form.successMessage}</p>
      </div>
    );
  }

  return (
    <form className="svc-form" onSubmit={onSubmit}>
      {service.form.variants && service.form.variants.length > 0 && (
        <div className="svc-form__variants" role="tablist" aria-label="Request type">
          {service.form.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={variantId === v.id}
              className={`svc-form__variant${variantId === v.id ? " is-active" : ""}${v.priority === "emergency" ? " svc-form__variant--urgent" : ""}`}
              onClick={() => {
                setVariantId(v.id);
                setValues({});
              }}
            >
              <span className="svc-form__variant-label">{v.label}</span>
              <span className="svc-form__variant-desc">{v.description}</span>
            </button>
          ))}
        </div>
      )}

      <div className="svc-form__fields">
        <FormFields fields={fields} values={values} onChange={onChange} />
      </div>

      {error && <p className="svc-form__error">{error}</p>}

      <button type="submit" className="schedule-btn svc-form__submit" disabled={submitting}>
        {submitting ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}
