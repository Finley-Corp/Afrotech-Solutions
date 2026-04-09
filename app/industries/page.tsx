"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { industries } from "../data/industries";

export default function IndustriesPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      <section
        style={{
          width: "100%",
          minHeight: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          <span
            data-anim="hero-eyebrow"
            style={{
              display: "block",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--color-accent)",
              marginBottom: "1rem",
              fontWeight: 600,
            }}
          >
            Industries
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.3rem, 5vw, 4.1rem)",
              color: "var(--color-primary)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
            className="reveal-line-group"
          >
            Water Solutions by Industry
          </h1>
          <p
            data-anim="hero-p"
            style={{
              color: "var(--color-secondary)",
              fontSize: "1.05rem",
              fontWeight: 300,
              maxWidth: "52rem",
              margin: 0,
              lineHeight: 1.75,
            }}
          >
            Whether your application is large or specialized, we engineer reliable pumping systems around your operating conditions, quality requirements, and uptime targets.
          </p>
        </div>
      </section>

      <section style={{ padding: "4.5rem 0 7rem", backgroundColor: "#f3f4f6" }}>
        <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "0 2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0.85rem",
            }}
          >
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="reveal-fade"
                style={{
                  position: "relative",
                  display: "block",
                  minHeight: "500px",
                  textDecoration: "none",
                  overflow: "hidden",
                  backgroundColor: "#0f172a",
                }}
              >
                <img
                  src={industry.image}
                  alt={industry.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scale(1.02)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0.2) 45%, rgba(2,6,23,0.1) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "1.1rem",
                    right: "1.1rem",
                    bottom: "1.1rem",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    gap: "0.8rem",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "white",
                      fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      textShadow: "0 2px 8px rgba(0,0,0,0.35)",
                    }}
                  >
                    {industry.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "8rem 0", backgroundColor: "#003366" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "0 2rem" }}>
           <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "white",
            marginBottom: "2rem",
            lineHeight: 1.15
          }}>
            Technical expertise for your specific sector.
          </h2>
          <p style={{ 
            color: "rgba(255,255,255,0.7)", 
            fontSize: "1.125rem", 
            fontWeight: 300, 
            marginBottom: "3rem",
            lineHeight: 1.6
          }}>
            Need a tailored recommendation? Share your site profile and we will map the right solution for your industry.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
            <Link 
              href="/contact"
              style={{ 
                padding: "1.25rem 3rem", 
                backgroundColor: "var(--color-accent)", 
                color: "white", 
                fontSize: "0.625rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.2em",
                borderRadius: "2px",
                textDecoration: "none",
                fontWeight: 500
              }}
            >
              Request Site Visit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
