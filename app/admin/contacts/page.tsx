"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Icon } from "@iconify/react";

interface Contact {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching contacts:", error);
      } else {
        setContacts(data || []);
      }
      setLoading(false);
    }

    fetchContacts();
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
          Inquiries.
        </h1>
        <p style={{ color: "#6B7280", fontSize: "0.875rem", fontWeight: 300 }}>
          Manage and respond to direct messages from the contact page.
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
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "#6B7280", fontSize: "0.875rem" }}>
                  No inquiries found.
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <td style={tdStyle}>{new Date(contact.created_at).toLocaleDateString()}</td>
                  <td style={tdStyle}>{contact.name}</td>
                  <td style={tdStyle}>{contact.email}</td>
                  <td style={tdStyle}>{contact.subject}</td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => setSelectedContact(contact)}
                      style={{ 
                        background: "none", 
                        border: "none", 
                        color: "var(--color-accent)", 
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600
                      }}
                    >
                      View Message
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail View Modal */}
      {selectedContact && (
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
              onClick={() => setSelectedContact(null)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", border: "none", background: "none", cursor: "pointer" }}
            >
              <Icon icon="lucide:x" width="24" />
            </button>
            <div style={{ padding: "3.5rem" }}>
              <span style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", display: "block", marginBottom: "1rem" }}>Inquiry Details</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "2.5rem" }}>{selectedContact.name}</h2>
              
              <div style={{ display: "grid", gap: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", borderBottom: "1px solid var(--color-line)", paddingBottom: "2rem" }}>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <p style={valueStyle}>{selectedContact.email}</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <p style={valueStyle}>{selectedContact.subject}</p>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <p style={{ ...valueStyle, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{selectedContact.message}</p>
                </div>
              </div>

              <div style={{ marginTop: "4rem" }}>
                <button 
                  onClick={() => setSelectedContact(null)}
                  style={{ width: "100%", padding: "1rem", backgroundColor: "var(--color-primary)", color: "white", border: "none", borderRadius: "2px", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, cursor: "pointer" }}
                >
                  Close Message
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
