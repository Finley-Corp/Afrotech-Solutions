"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { COMPANY_CONTACTS, COMPANY_NAME } from "@/lib/company";
import {
  REGIONAL_PRESENCE_COPY,
  coreValues,
  howWeWorkPhases,
  qualityCommitments,
  teamCapabilities,
} from "@/app/data/about";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

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
        <div style={{ position: "relative", zIndex: 10, textAlign: "left", maxWidth: "78rem" }}>
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
            About Afrotech
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 8vw, 6.8rem)",
              color: "white",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              marginBottom: "1.1rem",
            }}
            className="reveal-line-group"
          >
            We supply and support
            <br />
            water systems that last.
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
            {COMPANY_NAME} is an authorized distributor of Grundfos, KSB, and Wilo pumps —
            specifying, supplying, and supporting industrial, municipal, and agricultural water
            systems across East Africa.
          </p>
        </div>
      </section>

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
          AUTHORIZED DISTRIBUTION // FIELD ENGINEERING // COMMISSIONING // RELIABLE SUPPLY //
          REGIONAL SUPPORT // INDUSTRIAL PERFORMANCE // AUTHORIZED DISTRIBUTION // FIELD
          ENGINEERING // COMMISSIONING // RELIABLE SUPPLY // REGIONAL SUPPORT // INDUSTRIAL
          PERFORMANCE //
        </div>
      </section>

      {/* Who we are */}
      <section style={{ padding: "clamp(5rem, 10vw, 8rem) 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>
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
                Who We Are
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Distributor-led engineering
                <br />
                for East African duty cycles.
              </h2>
            </div>
            <div className="reveal-fade">
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "1.125rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}
              >
                We help farms, factories, utilities, and contractors get the right pump into the
                right duty — then stay available for commissioning and support when conditions in
                the field demand it.
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
                Our focus has centered on specialized pump distribution and water-system
                engineering: sourcing from leading manufacturers, matching equipment to site duty,
                and delivering practical installation and after-sales support across the region.
              </p>
              {/* TODO(content): Add founding year and milestone timeline when confirmed from company records. */}
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  marginBottom: "2rem",
                  fontStyle: "italic",
                }}
              >
                Detailed founding history and milestone dates will be published here once confirmed
                from company records.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "0.9rem",
                }}
              >
                <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: "0.75rem" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--color-secondary)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Role
                  </span>
                  <p style={{ margin: 0, color: "var(--color-primary)", fontSize: "0.9rem", fontWeight: 500 }}>
                    Authorized pump distributor
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: "0.75rem" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--color-secondary)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Brands
                  </span>
                  <p style={{ margin: 0, color: "var(--color-primary)", fontSize: "0.9rem", fontWeight: 500 }}>
                    Grundfos · KSB · Wilo
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: "0.75rem" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--color-secondary)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Region
                  </span>
                  <p style={{ margin: 0, color: "var(--color-primary)", fontSize: "0.9rem", fontWeight: 500 }}>
                    Kenya &amp; Eastern Africa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality — distributor QA (option B) */}
      <section
        style={{
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)",
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
              gap: "4rem",
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
                }}
              >
                <img
                  src="/assets/images/afrotech-2.jpg"
                  alt="Pump equipment ready for site delivery"
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
                Quality &amp; Assurance
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.3,
                }}
              >
                Quality starts with the right source — and the right duty match.
              </h2>
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                }}
              >
                We do not manufacture pumps. We supply equipment from manufacturers whose
                production and product certification processes are established — then we add the
                engineering judgment and handling discipline that matter before equipment reaches
                your site.
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
                That means correct specification against your duty point, careful receipt and
                storage practices, and manufacturer warranty pathways supported by our regional
                team when issues arise in the field.
              </p>
              {/* TODO(content): Re-add ISO / warranty claims only with certificate files or verification links. */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {qualityCommitments.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "0.8rem",
                      letterSpacing: "0.02em",
                      color: "var(--color-primary)",
                      fontWeight: 500,
                      marginBottom: "0.85rem",
                      lineHeight: 1.45,
                    }}
                  >
                    <Icon
                      icon="lucide:check"
                      style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.1rem" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ margin: "1.25rem 0 0", fontSize: "0.8125rem", color: "var(--color-secondary)" }}>
                Browse our catalogue brands:{" "}
                <Link href="/partners" style={{ color: "var(--color-primary)" }}>
                  Partners &amp; manufacturers
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work — same framework as homepage */}
      <section
        style={{
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)",
          backgroundColor: "white",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem 4rem",
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
                How We Work
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
                Assess. Engineer. Deliver.
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
              The same three-phase process used across the site — expanded here with the delivery
              detail clients ask about most often.
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
            {howWeWorkPhases.map((phase) => (
              <article
                key={phase.step}
                style={{
                  border: "1px solid var(--color-line)",
                  backgroundColor: "var(--color-background)",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src={phase.image}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "1.35rem 1.5rem 1.6rem" }}>
                  <p
                    style={{
                      margin: "0 0 0.45rem",
                      fontSize: "0.62rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#8a8178",
                    }}
                  >
                    {phase.step}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.45rem",
                      fontWeight: 300,
                      color: "var(--color-primary)",
                      margin: "0 0 0.75rem 0",
                    }}
                  >
                    {phase.title}
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
                    {phase.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }} className="reveal-fade">
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
              How we operate
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.5rem",
                fontWeight: 300,
                color: "var(--color-primary)",
                margin: 0,
              }}
            >
              Principles for dependable delivery.
            </h2>
          </div>
          <div
            data-anim="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {coreValues.map((val) => (
              <div
                key={val.title}
                style={{
                  padding: "2rem",
                  border: "1px solid var(--color-line)",
                  backgroundColor: "var(--color-background)",
                }}
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
                    marginBottom: "1.5rem",
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
                    marginBottom: "1rem",
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
                    margin: 0,
                  }}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        style={{
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)",
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
            Our Team
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              margin: "0 0 1rem 0",
              color: "var(--color-primary)",
              maxWidth: "20ch",
            }}
          >
            A technical team built for field realities.
          </h2>
          {/* TODO(content): Replace capability cards with named leadership bios when approved. */}
          <p
            style={{
              margin: "0 0 2rem",
              maxWidth: "40rem",
              color: "var(--color-secondary)",
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Named leadership biographies and titles will be published once confirmed. Until then,
            these are the capability areas that support every engagement — and the published
            contacts you can reach today.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {teamCapabilities.map((member) => (
              <article
                key={member.name}
                style={{
                  border: "1px solid rgba(15,15,14,0.12)",
                  backgroundColor: "rgba(255,255,255,0.55)",
                  padding: "1.25rem 1.35rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    margin: "0 0 0.55rem 0",
                    fontSize: "1.2rem",
                    color: "var(--color-primary)",
                    fontWeight: 300,
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "var(--color-secondary)",
                    lineHeight: 1.7,
                    fontSize: "0.88rem",
                    fontWeight: 300,
                  }}
                >
                  {member.detail}
                </p>
              </article>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(15,15,14,0.15)",
              paddingTop: "1.5rem",
            }}
          >
            <p
              style={{
                margin: "0 0 1rem",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--color-secondary)",
              }}
            >
              Published contacts
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.85rem",
              }}
            >
              {COMPANY_CONTACTS.map((c) => (
                <a
                  key={c.tel}
                  href={`tel:${c.tel}`}
                  style={{
                    textDecoration: "none",
                    color: "var(--color-primary)",
                    borderBottom: "1px solid var(--color-line)",
                    paddingBottom: "0.65rem",
                  }}
                >
                  <strong style={{ display: "block", fontSize: "0.95rem", fontWeight: 500 }}>
                    {c.name}
                  </strong>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-secondary)" }}>
                    {c.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regional presence — no unsubstantiated hub count */}
      <section
        style={{
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)",
          backgroundColor: "#111827",
          color: "white",
          textAlign: "center",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url('/assets/images/afrotech-1.jpg')",
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
              marginBottom: "1.5rem",
            }}
          >
            From Nairobi across Eastern Africa.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            {REGIONAL_PRESENCE_COPY}
          </p>
          {/* TODO(content): Publish verified office / service-point list when confirmed. */}
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
            }}
          >
            Contact Our Team
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
