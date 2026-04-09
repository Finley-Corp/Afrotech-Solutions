"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";

const coreValues = [
  {
    title: "Engineering Reliability",
    icon: "lucide:settings",
    desc: "Every product is tested in laboratory conditions that exceed the toughest real-world demands.",
  },
  {
    title: "Energy Efficiency",
    icon: "lucide:zap",
    desc: "Optimizing flow-to-power ratios to reduce operational costs and environmental impact.",
  },
  {
    title: "Local Support",
    icon: "lucide:map-pin",
    desc: "A full technical network across East Africa for rapid response and site maintenance.",
  },
];

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      {/* About Hero */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "70vh",
          minHeight: "500px",
          backgroundColor: "var(--color-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/images/afrotech-4.jpg"
          alt="Engineering site visit"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.08) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 2rem",
            maxWidth: "54rem",
          }}
        >
          <span
            data-anim="hero-eyebrow"
            style={{
              display: "block",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "1.5rem",
            }}
          >
            Since 2022 — Afrotech Water Solutions
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "white",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
            className="reveal-line-group"
          >
            Empowering East Africa,
            <br />
            one drop at a time.
          </h1>
          <p
            data-anim="hero-p"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.125rem",
              fontWeight: 300,
              maxWidth: "36rem",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Delivering industrial water solutions where they are needed most — from the heart of Nairobi to remote agricultural landscapes.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section style={{ padding: "10rem 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "4rem 6rem",
              alignItems: "flex-start",
            }}
          >
            <div className="reveal-fade">
              <span
                style={{
                  display: "block",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--color-secondary)",
                  marginBottom: "2rem",
                  borderTop: "1px solid var(--color-primary)",
                  paddingTop: "1rem",
                  width: "120px",
                }}
              >
                Our Mission
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Water security,
                <br />
                engineered for reliability.
              </h2>
            </div>
            <div className="reveal-fade">
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "1.125rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                Afrotech was founded with a clear vision: to redefine water supply in East Africa by providing industrial-grade pumping systems that don&apos;t just work — they last. 
              </p>
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                We believe that access to water is the foundation of agricultural growth and industrial development. By combining global engineering standards with local technical expertise, we ensure that every community, farm, and factory can depend on a consistent water supply, regardless of external conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Excellence */}
      <section
        style={{
          padding: "8rem 3rem",
          backgroundColor: "var(--color-warm)",
          borderTop: "1px solid var(--color-line)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1.2fr 1fr))",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            <div className="reveal-fade">
              <div
                style={{
                  aspectRatio: "16/10",
                  overflow: "hidden",
                  borderRadius: "2px",
                  border: "1px solid var(--color-line)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/assets/images/afrotech-2.jpg"
                  alt="Quality testing laboratory"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="reveal-fade">
              <span
                style={{
                  display: "block",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--color-secondary)",
                  marginBottom: "1.5rem",
                }}
              >
                Engineering / Quality Standards
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  marginBottom: "2rem",
                  lineHeight: 1.3,
                }}
              >
                Tested for Africa&apos;s toughest conditions.
              </h2>
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                Every Afrotech pump undergoes a rigorous 12-point testing cycle before it leaves our facility. We simulate deep-borehole pressure, high-ambient temperatures, and variable voltage to ensure that when a pump is installed in the field, it performs beyond expectations.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "ISO 9001 Certified Manufacturing",
                  "SS316 Anti-Corrosion impellers",
                  "Energy Optimized Motor Design",
                  "2-Year Performance Guarantee",
                ].map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--color-primary)",
                          fontWeight: 500,
                          marginBottom: "1rem",
                        }}
                      >
                        <Icon icon="lucide:check" style={{ color: "var(--color-accent)" }} />
                        {item}
                      </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ padding: "10rem 3rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "6rem" }} className="reveal-fade">
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
              The Afrotech Code
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.5rem",
                fontWeight: 300,
                color: "var(--color-primary)",
              }}
            >
              Principles for a resilient future.
            </h2>
          </div>
          <div
            data-anim="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
            }}
          >
            {coreValues.map((val) => (
              <div
                key={val.title}
                style={{
                  padding: "3rem",
                  border: "1px solid var(--color-line)",
                  borderRadius: "2px",
                  backgroundColor: "var(--color-background)",
                  transition: "transform 0.3s, background-color 0.3s",
                }}
                className="value-card"
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2rem",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-line)",
                  }}
                >
                  <Icon icon={val.icon} width="24" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    marginBottom: "1.5rem",
                    color: "var(--color-primary)",
                  }}
                >
                  {val.title}
                </h3>
                <p
                  style={{
                    color: "var(--color-secondary)",
                    fontSize: "0.9375rem",
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Focus Banner */}
      <section
        style={{
          padding: "8rem 3rem",
          backgroundColor: "#111827",
          color: "white",
          textAlign: "center",
          backgroundImage: "linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url('/assets/images/afrotech-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ maxWidth: "40rem", margin: "0 auto" }} className="reveal-fade">
          <span
            style={{
              display: "block",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "2rem",
            }}
          >
            Regional Presence
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.25,
              marginBottom: "2rem",
            }}
          >
            From Nairobi to the Coast.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.75,
              marginBottom: "3rem",
            }}
          >
            With major technical hubs in Kenya and Tanzania, we provide on-the-ground support to ensure your water solutions operate at peak performance, year-round.
          </p>
          <Link
            href="/contact"
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
              textDecoration: "none",
              transition: "transform 0.3s, opacity 0.3s",
            }}
            className="find-hub-btn"
          >
            Contact Regional Hub
          </Link>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
