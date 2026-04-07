"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Icon } from "@iconify/react";

interface Quotation {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  pump_type: string;
  flow_rate: string;
  depth: string;
  message: string;
}

export default function AdminQuotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);

  useEffect(() => {
    async function fetchQuotations() {
      const { data, error } = await supabase
        .from("quotations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching quotations:", error);
      } else {
        setQuotations(data || []);
      }
      setLoading(false);
    }

    fetchQuotations();
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
          Quote Requests.
        </h1>
        <p style={{ color: "#6B7280", fontSize: "0.875rem", fontWeight: 300 }}>
          Detailed technical requirements from potential clients across East Africa.
        </p>
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
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Pump Type</th>
              <th style={thStyle}>Flow Rate</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#6B7280", fontSize: "0.875rem" }}>
                  No quote requests found.
                </td>
              </tr>
            ) : (
              quotations.map((quote) => (
                <tr key={quote.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <td style={tdStyle}>{new Date(quote.created_at).toLocaleDateString()}</td>
                  <td style={tdStyle}>
                    <div style={{ display: "grid" }}>
                      <span>{quote.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>{quote.email}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{quote.location}</td>
                  <td style={tdStyle}>{quote.pump_type}</td>
                  <td style={tdStyle}>{quote.flow_rate || "N/A"} m³/hr</td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => setSelectedQuotation(quote)}
                      style={{ 
                        background: "none", 
                        border: "none", 
                        color: "var(--color-primary)", 
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail View Modal */}
      {selectedQuotation && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          zIndex: 100
        }}>
          <div style={{
            backgroundColor: "white",
            width: "100%",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: "2px",
            position: "relative"
          }}>
             <button 
              onClick={() => setSelectedQuotation(null)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", border: "none", background: "none", cursor: "pointer" }}
            >
              <Icon icon="lucide:x" width="24" />
            </button>
            <div style={{ padding: "3.5rem" }}>
              <span style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", display: "block", marginBottom: "1rem" }}>Quote Request</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "2.5rem" }}>{selectedQuotation.name}</h2>
              
              <div style={{ display: "grid", gap: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", borderBottom: "1px solid var(--color-line)", paddingBottom: "2rem" }}>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <p style={valueStyle}>{selectedQuotation.email}</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <p style={valueStyle}>{selectedQuotation.phone || "N/A"}</p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", borderBottom: "1px solid var(--color-line)", paddingBottom: "2rem" }}>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <p style={valueStyle}>{selectedQuotation.location}</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Pump Type</label>
                    <p style={valueStyle}>{selectedQuotation.pump_type}</p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", borderBottom: "1px solid var(--color-line)", paddingBottom: "2rem" }}>
                  <div>
                    <label style={labelStyle}>Flow Rate</label>
                    <p style={valueStyle}>{selectedQuotation.flow_rate} m³/hr</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Borehole Depth</label>
                    <p style={valueStyle}>{selectedQuotation.depth} Meters</p>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Additional Requirements</label>
                  <p style={{ ...valueStyle, lineHeight: 1.6 }}>{selectedQuotation.message || "No additional message."}</p>
                </div>
              </div>

              <div style={{ marginTop: "4rem" }}>
                <button 
                  onClick={() => setSelectedQuotation(null)}
                  style={{ width: "100%", padding: "1rem", backgroundColor: "var(--color-primary)", color: "white", border: "none", borderRadius: "2px", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, cursor: "pointer" }}
                >
                  Close Inquiry
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
  marginBottom: "0.5rem"
};

const valueStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 400,
  color: "var(--color-primary)"
};
