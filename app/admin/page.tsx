"use client";

import { useCallback } from "react";
import { Icon } from "@iconify/react";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { AdminStatsSkeleton } from "./components/AdminStatsSkeleton";
import type { AdminStats } from "@/lib/admin-data";

export default function AdminDashboard() {
  const selectStats = useCallback((json: unknown) => json as AdminStats, []);

  const { data: stats, loading, error } = useAdminFetch<AdminStats>("/api/admin/stats", {
    cacheKey: "admin_stats",
    select: selectStats,
  });

  return (
    <div>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>
          Welcome Back, Admin.
        </h1>
        <p style={{ color: "#6B7280", fontSize: "0.875rem", fontWeight: 300 }}>
          Overview of your recent platform activity and inquiries.
        </p>
      </header>

      {error && (
        <p style={{ color: "#B45309", fontSize: "0.875rem", marginBottom: "1.5rem" }}>{error}</p>
      )}

      {loading && !stats ? (
        <AdminStatsSkeleton />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {[
            { label: "Quote Requests", count: stats?.quotations ?? 0, color: "var(--color-accent)", icon: "lucide:file-text" },
            { label: "Direct Inquiries", count: stats?.contacts ?? 0, color: "var(--color-primary)", icon: "lucide:mail" },
            { label: "Newsletter Subscribers", count: stats?.newsletter ?? 0, color: "#10B981", icon: "lucide:users" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "2rem",
                backgroundColor: "white",
                border: "1px solid var(--color-line)",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: `${stat.color}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                <Icon icon={stat.icon} width="24" />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>{stat.label}</span>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-primary)" }}>{stat.count}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        <div style={{ padding: "2.5rem", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "2px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "var(--color-primary)", marginBottom: "2rem" }}>
            Operational Status
          </h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "#F9FAFB", borderRadius: "4px" }}>
              <span style={{ fontSize: "0.875rem", color: "#374151" }}>Database Connection</span>
              <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                Healthy
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "#F9FAFB", borderRadius: "4px" }}>
              <span style={{ fontSize: "0.875rem", color: "#374151" }}>Data Syncing</span>
              <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600 }}>Cached (20s)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
