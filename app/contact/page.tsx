"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import { Icon } from "@iconify/react";
import { supabase } from "../lib/supabase";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: supabaseError } = await supabase
      .from("contacts")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

    setSubmitting(false);

    if (supabaseError) {
      console.error("Supabase Error:", supabaseError);
      setError("Failed to send message. Please try again later.");
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
              backgroundColor: "rgba(0,51,102,0.05)",
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
            Thank you for reaching out to Afrotech. Our team will review your message and get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
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
              cursor: "pointer",
              border: "none"
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

      {/* Hero Section */}
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
          Connect with our technical advisors, sales team, or regional support hubs to find the right water solution for your project.
        </p>
      </section>

      {/* Form & Info Section */}
      <section style={{ paddingBottom: "8rem" }}>
        <div 
          style={{ 
            maxWidth: "1400px", 
            margin: "0 auto", 
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1.2fr 1fr))",
            gap: "5rem",
            alignItems: "start"
          }}
        >
          {/* Inquiry Form */}
          <form 
            onSubmit={handleSubmit}
            className="reveal-fade"
            style={{ 
              backgroundColor: "white", 
              padding: "4rem", 
              borderRadius: "2px", 
              border: "1px solid var(--color-line)",
              display: "grid",
              gap: "2.5rem"
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
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Sales Inquiry</option>
                <option>Partnership Opportunity</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea 
                name="message" 
                rows={5} 
                placeholder="How can we help you today?" 
                style={{ ...inputStyle, resize: "none" }}
                onChange={handleChange}
              />
            </div>
            {error && (
              <p style={{ color: "var(--color-accent)", fontSize: "0.875rem", marginBottom: "1rem" }}>{error}</p>
            )}
            <button 
              type="submit" 
              className="consult-btn"
              disabled={submitting}
              style={{ backgroundColor: "var(--color-accent)", color: "white", padding: "1rem 3rem", width: "fit-content", cursor: "pointer", border: "none", borderRadius: "2px", textTransform: "uppercase", fontSize: "0.625rem", letterSpacing: "0.2em", fontWeight: 500, opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Details Column */}
          <div className="reveal-fade" style={{ display: "grid", gap: "4rem" }}>
            
            {/* Immediate Support */}
            <div style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "3rem" }}>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "1.5rem", 
                fontWeight: 300, 
                color: "var(--color-primary)",
                marginBottom: "2rem"
              }}>
                Regional Support.
              </h3>
              <div style={{ display: "grid", gap: "2rem" }}>
                <div>
                  <span style={detailLabelStyle}>Technical Support</span>
                  <a href="tel:+254700000000" style={linkStyle}>+254 700 000 000</a>
                </div>
                <div>
                  <span style={detailLabelStyle}>Sales Inquiry</span>
                  <a href="mailto:sales@afrotech-solutions.com" style={linkStyle}>sales@afrotech-solutions.com</a>
                </div>
                <div>
                  <span style={detailLabelStyle}>Emergency Breakdown</span>
                  <a href="tel:+254800000000" style={linkStyle}>+254 800 000 000 (24/7)</a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "1.5rem", 
                fontWeight: 300, 
                color: "var(--color-primary)",
                marginBottom: "2rem"
              }}>
                Operating Hours.
              </h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--color-secondary)", fontWeight: 300 }}>Monday — Friday</span>
                  <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>08:00 AM — 05:00 PM</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--color-secondary)", fontWeight: 300 }}>Saturday</span>
                  <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>09:00 AM — 01:00 PM</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--color-secondary)", fontWeight: 300 }}>Sunday & Holidays</span>
                  <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>Technical Support Only</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Regional Office & Map Section */}
      <section style={{ padding: "8rem 2rem", backgroundColor: "white", borderTop: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }} className="reveal-fade">
             <span style={{ 
              display: "block", 
              fontSize: "0.625rem", 
              textTransform: "uppercase", 
              letterSpacing: "0.15em", 
              color: "rgba(87,83,78,0.6)",
              marginBottom: "1.5rem"
            }}>Visit our Headquarters</span>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "2.5rem", 
              fontWeight: 300, 
              color: "var(--color-primary)",
              marginBottom: "1rem"
            }}>Our Location.</h2>
            <p style={{ 
              color: "var(--color-secondary)", 
              fontSize: "1rem", 
              fontWeight: 300,
              marginBottom: "3rem"
            }}>
              NML Towers, South B, Nairobi, Kenya
            </p>
          </div>

          <div className="reveal-fade" style={{ 
            width: "100%", 
            height: "500px", 
            borderRadius: "2px", 
            overflow: "hidden",
            border: "1px solid var(--color-line)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
            position: "relative"
          }}>
            <iframe
              src="https://maps.google.com/maps?q=NML%20Towers,%20Tsavo%20Road,%20South%20B,%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* Map Overlay info */}
            <div style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
              backgroundColor: "white",
              padding: "1.5rem 2rem",
              borderRadius: "2px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "1px solid var(--color-line)",
              zIndex: 10
            }}>
              <span style={{ 
                display: "block", 
                fontSize: "0.625rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.1em",
                color: "var(--color-secondary)",
                marginBottom: "0.5rem"
              }}>Headquarters</span>
              <h4 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "1.25rem", 
                fontWeight: 300,
                color: "var(--color-primary)",
                marginBottom: "0.5rem"
              }}>Afrotech Nairobi</h4>
              <p style={{ 
                fontSize: "0.75rem", 
                color: "var(--color-secondary)", 
                fontWeight: 300 
              }}>
                NML Towers, South B<br />
                P.O. Box 4500-00100, Nairobi
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
  transition: "opacity 0.3s",
};
