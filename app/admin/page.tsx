"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Icon } from "@iconify/react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    quotations: 0,
    contacts: 0,
    newsletter: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: qCount },
        { count: cCount },
        { count: nCount }
      ] = await Promise.all([
        supabase.from("quotations").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("newsletter_subscriptions").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        quotations: qCount || 0,
        contacts: cCount || 0,
        newsletter: nCount || 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}>
        <Icon icon="lucide:loader-2" className="animate-spin" width="24" />
      </div>
    );
  }

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

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
        {[
          { label: "Quote Requests", count: stats.quotations, color: "var(--color-accent)", icon: "lucide:file-text" },
          { label: "Direct Inquiries", count: stats.contacts, color: "var(--color-primary)", icon: "lucide:mail" },
          { label: "Newsletter Subscribers", count: stats.newsletter, color: "#10B981", icon: "lucide:users" },
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
              gap: "1.5rem"
            }}
          >
            <div style={{ 
              width: "48px", 
              height: "48px", 
              borderRadius: "50%", 
              backgroundColor: `${stat.color}10`, // 10% opacity 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: stat.color
            }}>
              <Icon icon={stat.icon} width="24" />
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>{stat.label}</span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-primary)" }}>{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity (Placeholders for now) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        <div style={{ padding: "2.5rem", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "2px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "var(--color-primary)", marginBottom: "2rem" }}>
            Operational Status
          </h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "#F9FAFB", borderRadius: "4px" }}>
              <span style={{ fontSize: "0.875rem", color: "#374151" }}>Supabase Connection</span>
              <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }}></span>
                Healthy
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "#F9FAFB", borderRadius: "4px" }}>
              <span style={{ fontSize: "0.875rem", color: "#374151" }}>Data Syncing</span>
              <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600 }}>Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
