"use client";

import type { CSSProperties, ChangeEvent } from "react";
import type { ServiceFormField } from "@/app/data/services";

export const quoteLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(87,83,78,0.7)",
  marginBottom: "0.75rem",
  fontWeight: 500,
};

export const quoteInputStyle: CSSProperties = {
  width: "100%",
  padding: "1rem 0",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid var(--color-line)",
  fontSize: "0.9375rem",
  fontWeight: 300,
  color: "var(--color-primary)",
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  transition: "border-color 0.3s",
};

type DynamicFieldsProps = {
  fields: ServiceFormField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  idPrefix?: string;
};

export function DynamicFormFields({ fields, values, onChange, idPrefix = "" }: DynamicFieldsProps) {
  return (
    <>
      {fields.map((field) => {
        const id = `${idPrefix}${field.name}`;
        return (
          <div key={field.name}>
            <label style={quoteLabelStyle} htmlFor={id}>
              {field.label}
              {field.required ? " *" : ""}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                rows={4}
                required={field.required}
                placeholder={field.placeholder}
                style={{ ...quoteInputStyle, resize: "vertical" }}
                value={values[field.name] ?? ""}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            ) : field.type === "select" ? (
              <select
                id={id}
                name={field.name}
                required={field.required}
                style={quoteInputStyle}
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
                id={id}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                style={quoteInputStyle}
                value={values[field.name] ?? ""}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? "";
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function handleAttachmentChange(
  e: ChangeEvent<HTMLInputElement>,
  onValid: (file: File) => void,
  onError: (msg: string) => void,
) {
  const file = e.target.files?.[0];
  if (!file) return;
  onError("");
  if (!["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"].includes(file.type)) {
    onError("Please upload a JPEG, PNG, WebP, GIF, or PDF file.");
    e.target.value = "";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    onError("File must be 5 MB or smaller.");
    e.target.value = "";
    return;
  }
  onValid(file);
}
