"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Icon } from "@iconify/react";

interface Subscriber {
  id: string;
  created_at: string;
  email: string;
}

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching subscribers:", error);
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this email from the subscriber list?")) return;
    
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error removing subscriber: " + error.message);
    } else {
      fetchSubscribers();
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}>
        <Icon icon="lucide:loader-2" className="animate-spin" width="24" />
      </div>
    );
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
          onClick={() => {
            const csv = "Email,Subscribed Date\n" + subscribers.map(s => `${s.email},${new Date(s.created_at).toLocaleDateString()}`).join("\n");
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'afrotech_subscribers.csv');
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
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <Icon icon="lucide:download" />
          Export CSV
        </button>
      </header>

      <div style={{ 
        backgroundColor: "white", 
        border: "1px solid var(--color-line)", 
        borderRadius: "2px",
        overflow: "hidden"
      }}>
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
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "#6B7280", fontSize: "0.875rem" }}>
                  No subscribers found.
                </td>
              </tr>
            ) : (
              subscribers.map((subs) => (
                <tr key={subs.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <td style={tdStyle}>{new Date(subs.created_at).toLocaleDateString()}</td>
                  <td style={tdStyle}>{subs.email}</td>
                  <td style={tdStyle}>
                    <span style={{ 
                      fontSize: "0.625rem", 
                      padding: "0.25rem 0.5rem", 
                      backgroundColor: "#ECFDF5", 
                      color: "#065F46", 
                      borderRadius: "10px", 
                      fontWeight: 600,
                      textTransform: "uppercase"
                    }}>Active</span>
                  </td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => handleDelete(subs.id)}
                      style={{ 
                        background: "none", 
                        border: "none", 
                        color: "#EF4444", 
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600
                      }}
                    >
                      Remove
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
