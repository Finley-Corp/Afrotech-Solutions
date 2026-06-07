"use client";

import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { useAdminFetch } from "../hooks/useAdminFetch";
import { AdminTableSkeleton } from "../components/AdminTableSkeleton";

interface Subscriber {
  id: string;
  created_at: string;
  email: string;
}

export default function AdminNewsletter() {
  const selectItems = useCallback(
    (json: unknown) => (json as { items: Subscriber[] }).items ?? [],
    []
  );
  const { data: subscribers, loading, error, reload } = useAdminFetch<Subscriber[]>("/api/admin/newsletter", {
    cacheKey: "admin_newsletter",
    select: selectItems,
  });
  const rows = subscribers ?? [];
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Remove this email from the subscriber list?")) return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Delete failed");
      }

      await reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Error removing subscriber");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>
            Newsletter Subscribers.
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", fontWeight: 300 }}>
            Management of captured emails for marketing and project updates.
          </p>
        </div>
        <button
          disabled={rows.length === 0}
          onClick={() => {
            const csv =
              "Email,Subscribed Date\n" +
              rows.map((s) => `${s.email},${new Date(s.created_at).toLocaleDateString()}`).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.setAttribute("hidden", "");
            a.setAttribute("href", url);
            a.setAttribute("download", "afrotech_subscribers.csv");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#F3F4F6",
            color: "var(--color-primary)",
            border: "none",
            borderRadius: "2px",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontWeight: 600,
            cursor: rows.length === 0 ? "not-allowed" : "pointer",
            opacity: rows.length === 0 ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Icon icon="lucide:download" />
          Export CSV
        </button>
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
              <th style={thStyle}>Subscription Date</th>
              <th style={thStyle}>Email Address</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && rows.length === 0 ? (
              <AdminTableSkeleton rows={8} cols={4} />
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "#6B7280", fontSize: "0.875rem" }}>
                  No subscribers found.
                </td>
              </tr>
            ) : (
              rows.map((subs) => (
                <tr key={subs.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <td style={tdStyle}>{new Date(subs.created_at).toLocaleDateString()}</td>
                  <td style={tdStyle}>{subs.email}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        fontSize: "0.625rem",
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "#ECFDF5",
                        color: "#065F46",
                        borderRadius: "10px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Active
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(subs.id)}
                      disabled={deletingId === subs.id}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#EF4444",
                        cursor: deletingId === subs.id ? "wait" : "pointer",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600,
                        opacity: deletingId === subs.id ? 0.5 : 1,
                      }}
                    >
                      {deletingId === subs.id ? "Removing…" : "Remove"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
