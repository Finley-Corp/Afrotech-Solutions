"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { supabase } from "../lib/supabase";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Nairobi, Kenya",
    pumpType: "Submersible",
    flowRate: "",
    depth: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: supabaseError } = await supabase
      .from("quotations")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          pump_type: formData.pumpType,
          flow_rate: formData.flowRate,
          depth: formData.depth,
          message: formData.message,
        },
      ]);

    setSubmitting(false);

    if (supabaseError) {
      console.error("Supabase Error:", supabaseError);
      setError("Failed to submit requirements. Please try again later.");
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
              backgroundColor: "rgba(28,25,23,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2.5rem",
              color: "var(--color-primary)",
            }}
          >
            <Icon icon="lucide:check" width="32" />
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
            Request Received.
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
            A technical advisor from our regional hub will review your requirements and provide a detailed quote within 24 hours.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              backgroundColor: "var(--color-accent)",
              color: "white",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              borderRadius: "2px",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Return to Home
          </Link>
        </section>
        <Footer />
        <GSAPAnimations />
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      {/* Quote Hero */}
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
          Technical Consultation — Afrotech
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
          Request a Quote.
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
          Our engineering team provides comprehensive quotes for irrigation, industrial, and municipal water systems across East Africa.
        </p>
      </section>

      {/* Form Content */}
      <section style={{ paddingBottom: "10rem" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1.5fr 1fr))",
            gap: "6rem",
            alignItems: "start",
          }}
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="reveal-fade"
            style={{
              backgroundColor: "white",
              padding: "4rem",
              borderRadius: "2px",
              border: "1px solid var(--color-line)",
              display: "grid",
              gap: "2.5rem",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g., John Doe"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g., john@company.com"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+254 --- --- ---"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={labelStyle}>Project Location</label>
                <select
                  name="location"
                  style={inputStyle}
                  onChange={handleChange}
                  value={formData.location}
                >
                  <option>Nairobi, Kenya</option>
                  <option>Mombasa, Kenya</option>
                  <option>Dar es Salaam, Tanzania</option>
                  <option>Arusha, Tanzania</option>
                  <option>Kampala, Uganda</option>
                  <option>Other / Off-grid</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <label style={labelStyle}>Required Pump Type</label>
                <select
                  name="pumpType"
                  style={inputStyle}
                  onChange={handleChange}
                  value={formData.pumpType}
                >
                  <option>Submersible (Borehole)</option>
                  <option>Solar Pumping System</option>
                  <option>Industrial Centrifugal</option>
                  <option>Unsure / Need Assessment</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Required Flow Rate (m³/hr)</label>
                <input
                  type="text"
                  name="flowRate"
                  placeholder="e.g., 10"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Borehole / Well Depth (meters)</label>
              <input
                type="text"
                name="depth"
                placeholder="e.g., 120"
                style={inputStyle}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>Specific Requirements / Application</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your technical requirements..."
                style={{ ...inputStyle, resize: "none" }}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p style={{ color: "var(--color-accent)", fontSize: "0.875rem", marginBottom: "1rem" }}>{error}</p>
            )}
            <button
              type="submit"
              className="schedule-btn"
              disabled={submitting}
              style={{
                width: "fit-content",
                padding: "1rem 3.5rem",
                cursor: "pointer",
                backgroundColor: "var(--color-accent)",
                color: "white",
                border: "none",
                borderRadius: "2px",
                textTransform: "uppercase",
                fontSize: "0.625rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                transition: "opacity 0.3s",
                opacity: submitting ? 0.7 : 1
              }}
            >
              {submitting ? "Submitting..." : "Submit Requirements"}
            </button>
          </form>

          {/* Sidebar */}
          <div className="reveal-fade" style={{ display: "grid", gap: "4rem" }}>
            {/* Contact Card */}
            <div
              style={{
                padding: "3rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                borderRadius: "2px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  marginBottom: "1.5rem",
                }}
              >
                Immediate Support.
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7,
                  marginBottom: "2.5rem",
                }}
              >
                For emergency pumping requirements or urgent technical site assessments, contact our regional support line.
              </p>
              <div style={{ display: "grid", gap: "1.25rem" }}>
                <a
                  href="tel:+254712345678"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  <Icon icon="lucide:phone" />
                  +254 712 345 678
                </a>
                <a
                  href="mailto:support@afrotechliving.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  <Icon icon="lucide:mail" />
                  support@afrotech-solutions.com
                </a>
              </div>
            </div>

            {/* Hubs Info */}
            <div>
              <h4
                style={{
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--color-secondary)",
                  marginBottom: "2rem",
                }}
              >
                Regional Technical Hubs
              </h4>
              <div style={{ display: "grid", gap: "2.5rem" }}>
                {[
                  { city: "Nairobi Hub", district: "Westlands", contact: "+254 20 445 000" },
                  { city: "Dar es Salaam", district: "Masaki", contact: "+255 22 260 000" },
                ].map((hub) => (
                  <div
                    key={hub.city}
                    style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "1.5rem" }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.25rem",
                        fontWeight: 300,
                        color: "var(--color-primary)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {hub.city}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--color-secondary)",
                        fontWeight: 300,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {hub.district}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "var(--color-primary)",
                      }}
                    >
                      {hub.contact}
                    </span>
                  </div>
                ))}
              </div>
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
