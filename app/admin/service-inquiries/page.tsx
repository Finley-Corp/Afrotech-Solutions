"use client";

import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { useAdminFetch } from "../hooks/useAdminFetch";
import { AdminTableSkeleton } from "../components/AdminTableSkeleton";

interface ServiceInquiry {
  id: string;
  created_at: string;
  service_slug: string;
  service_title: string;
  name: string;
  email: string;
  phone: string | null;
  priority: string | null;
  variant: string | null;
  details: string | null;
}

export default function AdminServiceInquiries() {
  const [selected, setSelected] = useState<ServiceInquiry | null>(null);
  const selectItems = useCallback(
    (json: unknown) => (json as { items: ServiceInquiry[] }).items ?? [],
    [],
  );
  const { data: inquiries, loading, error } = useAdminFetch<ServiceInquiry[]>(
    "/api/admin/service-inquiries",
    {
      cacheKey: "admin_service_inquiries",
      select: selectItems,
    },
  );
  const rows = inquiries ?? [];

  return (
    <div>
      <header style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            color: "var(--color-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Service Requests.
        </h1>
        <p style={{ color: "#6B7280", fontSize: "0.875rem", fontWeight: 300 }}>
          Inquiries submitted from service pages (sizing, design, install, maintenance, monitoring).
        </p>
      </header>

      {error && (
        <p style={{ color: "#B45309", fontSize: "0.875rem", marginBottom: "1.5rem" }}>{error}</p>
      )}

      <div
        style={{
          backgroundColor: "white",
          border: "1px solid var(--color-line)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid var(--color-line)" }}>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Priority</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && rows.length === 0 ? (
              <AdminTableSkeleton rows={8} cols={5} />
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ padding: "3rem", textAlign: "center", color: "#6B7280", fontSize: "0.875rem" }}
                >
                  No service requests found.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <td style={tdStyle}>{new Date(row.created_at).toLocaleDateString()}</td>
                  <td style={tdStyle}>
                    <div style={{ display: "grid" }}>
                      <span>{row.service_title}</span>
                      {row.variant && (
                        <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>{row.variant}</span>
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "grid" }}>
                      <span>{row.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>{row.email}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{row.priority || "—"}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => setSelected(row)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-accent)",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600,
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 100,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflow: "auto",
              borderRadius: "2px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <Icon icon="lucide:x" width="24" />
            </button>
            <div style={{ padding: "3.5rem" }}>
              <span
                style={{
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-accent)",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Service Request
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  marginBottom: "2.5rem",
                }}
              >
                {selected.service_title}
              </h2>

              <div style={{ display: "grid", gap: "2rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                    borderBottom: "1px solid var(--color-line)",
                    paddingBottom: "2rem",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Name</label>
                    <p style={valueStyle}>{selected.name}</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <p style={valueStyle}>{selected.email}</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <p style={valueStyle}>{selected.phone || "—"}</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Priority / type</label>
                    <p style={valueStyle}>
                      {[selected.priority, selected.variant].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Details</label>
                  <p style={{ ...valueStyle, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {selected.details || "—"}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "4rem" }}>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "2px",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "1.25rem 1.5rem",
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#6B7280",
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: "1.25rem 1.5rem",
  fontSize: "0.875rem",
  color: "var(--color-primary)",
  fontWeight: 300,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#6B7280",
  marginBottom: "0.5rem",
};

const valueStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 400,
  color: "var(--color-primary)",
};
