import Link from "next/link";
import { Icon } from "@iconify/react";

const services = [
  {
    title: "Pump Selection & Sizing",
    text: "Duty-point analysis, head calculations, and model matching for reliable long-term operation.",
    icon: "solar:tuning-2-linear",
  },
  {
    title: "System Design & Integration",
    text: "End-to-end design for borehole, booster, and transfer systems with controls and redundancy planning.",
    icon: "solar:settings-minimalistic-linear",
  },
  {
    title: "Installation & Commissioning",
    text: "On-site setup guidance, performance checks, and startup validation to ensure systems run correctly.",
    icon: "solar:shield-check-linear",
  },
  {
    title: "Maintenance & Technical Support",
    text: "Preventive maintenance, troubleshooting, and rapid response support for critical water operations.",
    icon: "solar:headphones-round-sound-linear",
  },
];

export default function ServicesSection() {
  return (
    <section
      className="premium-landing-section"
      style={{
        position: "relative",
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-line)",
        padding: "clamp(3.5rem, 7vw, 6rem) 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top left, rgba(0,51,102,0.05) 0%, transparent 28%), radial-gradient(circle at bottom right, rgba(24,21,18,0.03) 0%, transparent 24%)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3.5rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem",
            alignItems: "end",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <div className="reveal-fade">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#6f675f",
                marginBottom: "1rem",
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
              Services
            </div>
            <p style={{ maxWidth: "16rem", fontSize: "0.85rem", lineHeight: 1.75, color: "#5f5851", margin: 0 }}>
              Engineering support designed for domestic, agricultural, and industrial water systems.
            </p>
          </div>

          <div className="reveal-fade">
            <h2
              style={{
                color: "var(--color-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.03,
                fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Practical services that keep your{" "}
              <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>water systems</span> dependable.
            </h2>
          </div>
        </div>

        <div
          data-anim="stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "1rem",
          }}
        >
          {services.map((service) => (
            <article
              key={service.title}
              style={{
                border: "1px solid var(--color-line)",
                backgroundColor: "var(--color-background)",
                padding: "1.2rem 1.15rem",
                minHeight: "210px",
                display: "grid",
                alignContent: "start",
                gap: "0.85rem",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "999px",
                  border: "1px solid rgba(0,51,102,0.2)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-primary)",
                }}
              >
                <Icon icon={service.icon} width={18} />
              </div>
              <h3 style={{ color: "var(--color-primary)", margin: 0, fontSize: "1.2rem", lineHeight: 1.2 }}>
                {service.title}
              </h3>
              <p style={{ color: "#5f5851", margin: 0, lineHeight: 1.65, fontSize: "0.88rem" }}>{service.text}</p>
            </article>
          ))}
        </div>

        <div className="reveal-fade" style={{ marginTop: "1.75rem" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              textDecoration: "none",
              color: "var(--color-primary)",
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 600,
            }}
          >
            Talk to our service team
            <Icon icon="solar:arrow-right-up-linear" width={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
