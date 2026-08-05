"use client";

/**
 * `/contact` vs `/quote` (see also lib/company.ts):
 * Use this page for general inquiries, partnership, and non-transactional questions.
 * Use `/quote` for product, service, pricing, or site-visit / system-design requests.
 */

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import { Icon } from "@iconify/react";
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_ADDRESS_ONE_LINE,
  COMPANY_CONTACTS,
  COMPANY_HOURS,
  COMPANY_MAP_EMBED_URL,
  COMPANY_NAME,
  CONTACT_SUBJECTS,
  EMERGENCY_TEL,
  SALES_EMAIL,
  TECHNICAL_SUPPORT_TEL,
} from "@/lib/company";
import { URGENCY_OPTIONS } from "@/lib/quote-form";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    urgency: "routine",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    let sendOk = false;
    try {
      const res = await fetch("/api/email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      sendOk = res.ok;
      if (!res.ok) {
        const detail = await res.text();
        console.error("Contact submit failed:", res.status, detail);
      }
    } catch (err) {
      console.error("Contact submit fetch error:", err);
    }

    setSubmitting(false);

    if (!sendOk) {
      setError("Failed to send message. Please try again later.");
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <main style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
        <Navbar />
        <section
          style={{
            padding: "12rem 2rem 10rem",
            maxWidth: "40rem",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "rgba(15,23,42,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2.5rem",
              color: "var(--color-primary)",
            }}
          >
            <Icon icon="lucide:mail" width="32" />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 300,
              color: "var(--color-primary)",
              marginBottom: "1.5rem",
            }}
          >
            Message Sent.
          </h1>
          <p
            style={{
              color: "var(--color-secondary)",
              fontSize: "1.125rem",
              fontWeight: 300,
              lineHeight: 1.6,
              marginBottom: "3rem",
            }}
          >
            Thank you for reaching out to Afrotech. Our team will review your message and get back
            to you shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "General Inquiry",
                urgency: "routine",
                message: "",
              });
            }}
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              backgroundColor: "var(--color-accent)",
              color: "white",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              borderRadius: "2px",
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
            }}
          >
            Send Another Message
          </button>
        </section>
        <Footer />
        <GSAPAnimations />
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      <section
        style={{
          padding: "10rem 2rem 6rem",
          maxWidth: "1400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          data-anim="hero-eyebrow"
          style={{
            display: "block",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--color-secondary)",
            marginBottom: "1.5rem",
          }}
        >
          Contact Us — Afrotech
        </span>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "var(--color-primary)",
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
          }}
        >
          Engineering Support.
        </h1>
        <p
          data-anim="hero-p"
          style={{
            color: "var(--color-secondary)",
            fontSize: "1.125rem",
            fontWeight: 300,
            maxWidth: "36rem",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          General questions, partnerships, and advisor chat. For product or service pricing, use
          our{" "}
          <Link href="/quote" style={{ color: "var(--color-primary)" }}>
            quote form
          </Link>
          .
        </p>
      </section>

      <section style={{ paddingBottom: "8rem" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1.2fr 1fr))",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="reveal-fade"
            style={{
              backgroundColor: "white",
              padding: "clamp(1.5rem, 4vw, 4rem)",
              borderRadius: "2px",
              border: "1px solid var(--color-line)",
              display: "grid",
              gap: "2rem",
            }}
          >
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                style={inputStyle}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@company.com"
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                placeholder="+254 --- --- ---"
                style={inputStyle}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={labelStyle}>Subject</label>
              <select
                name="subject"
                style={inputStyle}
                onChange={handleChange}
                value={formData.subject}
              >
                {CONTACT_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>How urgent is this? *</label>
              <select
                name="urgency"
                required
                style={inputStyle}
                onChange={handleChange}
                value={formData.urgency}
              >
                {URGENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="How can we help you today?"
                style={{ ...inputStyle, resize: "vertical" }}
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            {error && (
              <p style={{ color: "var(--color-accent)", fontSize: "0.875rem", margin: 0 }}>{error}</p>
            )}
            <button
              type="submit"
              className="consult-btn"
              disabled={submitting}
              style={{
                backgroundColor: "var(--color-accent)",
                color: "white",
                padding: "1rem 3rem",
                width: "fit-content",
                cursor: "pointer",
                border: "none",
                borderRadius: "2px",
                textTransform: "uppercase",
                fontSize: "0.625rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="reveal-fade" style={{ display: "grid", gap: "3.5rem" }}>
            <div style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "2.5rem" }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  marginBottom: "1.5rem",
                }}
              >
                Regional Support.
              </h3>
              <div style={{ display: "grid", gap: "1.75rem" }}>
                <div>
                  <span style={detailLabelStyle}>Technical Support</span>
                  <a href={`tel:${TECHNICAL_SUPPORT_TEL}`} style={linkStyle}>
                    {TECHNICAL_SUPPORT_TEL}
                  </a>
                </div>
                {COMPANY_CONTACTS.map((contact) => (
                  <div key={contact.tel}>
                    <span style={detailLabelStyle}>
                      {contact.name}
                      {contact.role ? ` — ${contact.role}` : ""}
                    </span>
                    <a href={`tel:${contact.tel}`} style={linkStyle}>
                      {contact.phone}
                    </a>
                  </div>
                ))}
                <div>
                  <span style={detailLabelStyle}>Sales Inquiry</span>
                  <a href={`mailto:${SALES_EMAIL}`} style={linkStyle}>
                    {SALES_EMAIL}
                  </a>
                </div>
                <div>
                  <span style={detailLabelStyle}>Emergency Breakdown</span>
                  <a href={`tel:${EMERGENCY_TEL}`} style={linkStyle}>
                    {EMERGENCY_TEL} (24/7)
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  marginBottom: "1.5rem",
                }}
              >
                Operating Hours.
              </h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {COMPANY_HOURS.map((row) => (
                  <div
                    key={row.days}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <span style={{ color: "var(--color-secondary)", fontWeight: 300 }}>{row.days}</span>
                    <span style={{ color: "var(--color-primary)", fontWeight: 500, textAlign: "right" }}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "8rem 2rem", backgroundColor: "white", borderTop: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }} className="reveal-fade">
            <span
              style={{
                display: "block",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(87,83,78,0.6)",
                marginBottom: "1.5rem",
              }}
            >
              Visit our Headquarters
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.5rem",
                fontWeight: 300,
                color: "var(--color-primary)",
                marginBottom: "1rem",
              }}
            >
              Our Location.
            </h2>
            <p
              style={{
                color: "var(--color-secondary)",
                fontSize: "1rem",
                fontWeight: 300,
                margin: 0,
              }}
            >
              {COMPANY_ADDRESS_ONE_LINE}
            </p>
          </div>

          <div
            className="reveal-fade"
            style={{
              width: "100%",
              height: "500px",
              borderRadius: "2px",
              overflow: "hidden",
              border: "1px solid var(--color-line)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
              position: "relative",
            }}
          >
            <iframe
              src={COMPANY_MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${COMPANY_NAME} headquarters map`}
            />
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                right: "2rem",
                maxWidth: "22rem",
                backgroundColor: "white",
                padding: "1.5rem 2rem",
                borderRadius: "2px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                border: "1px solid var(--color-line)",
                zIndex: 10,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-secondary)",
                  marginBottom: "0.5rem",
                }}
              >
                Headquarters
              </span>
              <h4
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem",
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                {COMPANY_NAME}
              </h4>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-secondary)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {COMPANY_ADDRESS_LINES.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < COMPANY_ADDRESS_LINES.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(87,83,78,0.7)",
  marginBottom: "0.75rem",
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
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

const detailLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "var(--color-secondary)",
  marginBottom: "0.5rem",
};

const linkStyle: React.CSSProperties = {
  fontSize: "1.125rem",
  color: "var(--color-primary)",
  textDecoration: "none",
  fontWeight: 400,
};
