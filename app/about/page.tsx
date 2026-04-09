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

const deliveryPillars = [
  {
    title: "Assessment & Sizing",
    text: "We evaluate source reliability, duty profile, elevation, and expected peak demand before recommending any system.",
    image: "/assets/images/afrotech-6.jpg",
  },
  {
    title: "Installation & Commissioning",
    text: "Our team supports installation quality checks, startup verification, and handover testing to confirm real-world performance.",
    image: "/assets/images/afrotech-7.jpg",
  },
  {
    title: "After-Sales Support",
    text: "From spare parts to troubleshooting, we keep systems running with practical technical support and fast response.",
    image: "/assets/images/afrotech-8.jpg",
  },
];

const studioTeam = [
  {
    name: "Field Engineering",
    quote:
      "We size systems for actual operating pressure, not ideal lab assumptions.",
  },
  {
    name: "Technical Support",
    quote:
      "Fast diagnostics and practical recommendations keep uptime stable on active sites.",
  },
  {
    name: "Operations",
    quote:
      "Availability, logistics, and spare readiness are part of performance.",
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
          height: "90vh",
          minHeight: "620px",
          backgroundColor: "var(--color-primary)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          overflow: "hidden",
          padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)",
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
            opacity: 0.42,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,8,8,0.70) 0%, rgba(8,8,8,0.48) 45%, rgba(8,8,8,0.25) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "left",
            maxWidth: "78rem",
          }}
        >
          <span
            data-anim="hero-eyebrow"
            style={{
              display: "block",
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#FF4422",
              marginBottom: "1rem",
              fontWeight: 600,
            }}
          >
            000 / About Afrotech
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 8vw, 6.8rem)",
              color: "white",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              textTransform: "none",
              lineHeight: 0.95,
              marginBottom: "1.1rem",
            }}
            className="reveal-line-group"
          >
            We build water systems
            <br />that keep East Africa moving.
          </h1>
          <p
            data-anim="hero-p"
            style={{
              color: "rgba(255,255,255,0.86)",
              fontSize: "1rem",
              fontWeight: 300,
              maxWidth: "45rem",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            From agricultural fields and construction sites to industrial and utility
            environments, Afrotech designs pumping systems for real conditions and
            long-term reliability.
          </p>
        </div>
      </section>

      {/* Marquee */}
      <section
        style={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#0F0F0E",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0.75rem 0",
        }}
      >
        <div className="about-marquee">
          WATER INFRASTRUCTURE // FIELD ENGINEERING // COMMISSIONING // RELIABLE SUPPLY //
          REGIONAL SUPPORT // INDUSTRIAL PERFORMANCE // WATER INFRASTRUCTURE // FIELD
          ENGINEERING // COMMISSIONING // RELIABLE SUPPLY // REGIONAL SUPPORT // INDUSTRIAL
          PERFORMANCE //
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
                  marginBottom: "1.5rem",
                }}
              >
                We believe that access to water is the foundation of agricultural growth and industrial development. By combining global engineering standards with local technical expertise, we ensure that every community, farm, and factory can depend on a consistent water supply, regardless of external conditions.
              </p>
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                Beyond product supply, we focus on long-term operating value. That means selecting fit-for-purpose equipment, reducing avoidable energy loss, and planning systems that are easier to maintain in the field.
              </p>
              <div
                className="reveal-fade"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "0.9rem",
                }}
              >
                <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: "0.75rem" }}>
                  <span style={{ display: "block", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-secondary)", marginBottom: "0.35rem" }}>
                    Focus
                  </span>
                  <p style={{ margin: 0, color: "var(--color-primary)", fontSize: "0.9rem", fontWeight: 500 }}>
                    Reliable field performance
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: "0.75rem" }}>
                  <span style={{ display: "block", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-secondary)", marginBottom: "0.35rem" }}>
                    Region
                  </span>
                  <p style={{ margin: 0, color: "var(--color-primary)", fontSize: "0.9rem", fontWeight: 500 }}>
                    Kenya, Tanzania & nearby markets
                  </p>
                </div>
              </div>
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
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                This quality discipline is what allows our clients to trust Afrotech in mission-critical environments, from irrigation blocks and construction sites to municipal distribution nodes and industrial utility loops.
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

      {/* Delivery Journey */}
      <section
        style={{
          padding: "9rem 3rem",
          backgroundColor: "white",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem 4rem",
              alignItems: "end",
              marginBottom: "3rem",
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
                  marginBottom: "1rem",
                }}
              >
                How We Deliver
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 4.2vw, 3.25rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--color-primary)",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                End-to-end delivery from design to long-term support.
              </h2>
            </div>
            <p
              className="reveal-fade"
              style={{
                margin: 0,
                color: "var(--color-secondary)",
                fontSize: "1rem",
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: "40rem",
              }}
            >
              We structure each project around clear technical milestones and practical service continuity. This keeps implementation predictable and ensures equipment performance remains stable after commissioning.
            </p>
          </div>

          <div
            data-anim="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {deliveryPillars.map((pillar) => (
              <article
                key={pillar.title}
                style={{
                  border: "1px solid var(--color-line)",
                  backgroundColor: "var(--color-background)",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "1.35rem 1.5rem 1.6rem" }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.45rem",
                      fontWeight: 300,
                      color: "var(--color-primary)",
                      margin: "0 0 0.75rem 0",
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-secondary)",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {pillar.text}
                  </p>
                </div>
              </article>
            ))}
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

      {/* Studio Section */}
      <section
        style={{
          padding: "8rem 3rem",
          backgroundColor: "#EBEBE8",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <span
            style={{
              display: "block",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#FF4422",
              marginBottom: "1rem",
              fontWeight: 600,
            }}
          >
            004 / Studio
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.05,
              textTransform: "none",
              letterSpacing: "-0.02em",
              fontWeight: 300,
              margin: "0 0 2.25rem 0",
              color: "var(--color-primary)",
              maxWidth: "18ch",
            }}
          >
            A technical team built for field realities.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ minHeight: 220, overflow: "hidden", border: "1px solid rgba(15,15,14,0.08)" }}>
              <img src="/assets/images/afrotech-14.jpg" alt="Industrial water infrastructure" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ minHeight: 220, overflow: "hidden", border: "1px solid rgba(15,15,14,0.08)" }}>
              <img src="/assets/images/afrotech-3.jpg" alt="Water engineering detail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ minHeight: 220, overflow: "hidden", border: "1px solid rgba(15,15,14,0.08)" }}>
              <img src="/assets/images/afrotech-11.jpg" alt="Operations and support" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {studioTeam.map((member) => (
              <article key={member.name} style={{ borderTop: "1px solid rgba(15,15,14,0.22)", paddingTop: "1rem" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    margin: "0 0 0.55rem 0",
                    fontSize: "1.2rem",
                    textTransform: "none",
                    letterSpacing: "-0.01em",
                    color: "var(--color-primary)",
                    fontWeight: 300,
                  }}
                >
                  {member.name}
                </h3>
                <p style={{ margin: 0, color: "var(--color-secondary)", lineHeight: 1.7, fontSize: "0.88rem", fontWeight: 300 }}>
                  {member.quote}
                </p>
              </article>
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
      <style jsx>{`
        .about-marquee {
          width: max-content;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #f5f5f2;
          font-size: clamp(0.78rem, 1.2vw, 1rem);
          font-weight: 700;
          animation: about-scroll 34s linear infinite;
          padding-right: 3rem;
        }

        @keyframes about-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}
