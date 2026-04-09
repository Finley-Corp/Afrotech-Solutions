import Link from "next/link";
import { Icon } from "@iconify/react";

const muted = "#5f5851";
const label = "#6f675f";

const guarantees = [
  {
    step: "01",
    title: "Specification clarity",
    text: "Duty profiling and water chemistry awareness before equipment selection.",
  },
  {
    step: "02",
    title: "Supply continuity",
    text: "Stocked critical spares and coordinated logistics across East Africa.",
  },
  {
    step: "03",
    title: "Technical response",
    text: "Engineering support within 24 hours for commissioning and troubleshooting.",
  },
];

export default function AmenitiesSection() {
  return (
    <section
      className="premium-landing-section"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
        backgroundColor: "var(--color-surface)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top left, rgba(0,51,102,0.06) 0%, transparent 32%), radial-gradient(circle at bottom right, rgba(214,28,44,0.04) 0%, transparent 28%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: "1380px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {/* Left rail */}
        <div
          style={{
            flex: "1 1 260px",
            maxWidth: "100%",
            borderBottom: "1px solid var(--color-line)",
            borderRight: "1px solid var(--color-line)",
            padding: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <div className="reveal-fade" style={{ position: "sticky", top: "8rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: label,
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                }}
              />
              Service Guarantees
            </div>
            <p
              style={{
                maxWidth: "14rem",
                fontSize: "0.8125rem",
                lineHeight: 1.75,
                color: muted,
                fontWeight: 300,
              }}
            >
              Deionized water on demand — engineered delivery, documented performance, and
              support you can reach when uptime matters.
            </p>
          </div>
        </div>

        {/* Right content */}
        <div style={{ flex: "1 1 560px", padding: "clamp(2.5rem, 5vw, 5rem)", minWidth: 0 }}>
          <div className="reveal-fade" style={{ maxWidth: "980px" }}>
            <h2
              style={{
                color: "var(--color-primary)",
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                marginBottom: "2.5rem",
              }}
            >
              We build water systems that{" "}
              <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
                perform
              </span>{" "}
              — from specification through commissioning, with clarity at every phase.
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "2rem 3rem",
                alignItems: "start",
                paddingTop: "2rem",
                borderTop: "1px solid var(--color-line)",
              }}
            >
              <div data-anim="stagger" style={{ display: "grid", gap: "1.25rem" }}>
                <p style={{ fontSize: "0.98rem", lineHeight: 1.8, color: muted, fontWeight: 300, margin: 0 }}>
                  High-purity and treatment-ready applications need predictable flow,
                  protected equipment, and documentation that matches your process. We
                  align pump selection, controls, and service windows to your operating
                  profile — not generic catalog defaults.
                </p>
                <p style={{ fontSize: "0.98rem", lineHeight: 1.8, color: muted, fontWeight: 300, margin: 0 }}>
                  The outcome is infrastructure you can run with confidence: fewer
                  surprises in the field, faster recovery when conditions shift, and a
                  partner who understands regional constraints.
                </p>
              </div>

              <div className="img-zoom-container" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "relative",
                    minHeight: "380px",
                    backgroundColor: "var(--color-background)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/assets/images/afrotech-2.jpg"
                    alt="Laboratory water quality testing"
                    className="img-zoom"
                    style={{ width: "100%", height: "100%", minHeight: "380px", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: "clamp(1rem, 3vw, 1.5rem)",
                      border: "1px solid rgba(255,255,255,0.55)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "clamp(1rem, 3vw, 1.5rem)",
                      right: "clamp(1rem, 3vw, 1.5rem)",
                      bottom: "clamp(1rem, 3vw, 1.5rem)",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid rgba(255,255,255,0.45)",
                        backgroundColor: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        padding: "1rem 1.1rem",
                        boxShadow: "0 14px 36px rgba(23,18,14,0.1)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.62rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: label,
                          marginBottom: "0.35rem",
                        }}
                      >
                        Purity readiness
                      </p>
                      <p
                        className="premium-plaque-title"
                        style={{
                          fontSize: "1.2rem",
                          lineHeight: 1.15,
                          letterSpacing: "-0.02em",
                          color: "var(--color-primary)",
                          margin: 0,
                        }}
                      >
                        Treatment-aligned pumping &amp; distribution
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-anim="stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "1.25rem",
                marginTop: "2.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--color-line)",
              }}
            >
              {guarantees.map((g) => (
                <div key={g.step} style={{ borderTop: "1px solid var(--color-line)", paddingTop: "1rem" }}>
                  <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a8178", marginBottom: "0.5rem" }}>
                    {g.step}
                  </p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.35rem" }}>
                    {g.title}
                  </p>
                  <p style={{ fontSize: "0.8rem", lineHeight: 1.55, color: muted, margin: 0 }}>{g.text}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: label,
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-line)",
                  paddingBottom: "0.2rem",
                }}
              >
                Explore product range
                <Icon icon="solar:arrow-right-up-linear" width={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
