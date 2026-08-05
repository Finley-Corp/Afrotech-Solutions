import Link from "next/link";
import { Icon } from "@iconify/react";
import { services } from "../data/services";

const label = "#6f675f";
const muted = "#5f5851";

export default function ServicesSection() {
  return (
    <section
      className="premium-landing-section services-grid-section"
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
            "radial-gradient(circle at top left, rgba(0,51,102,0.05) 0%, transparent 28%), radial-gradient(circle at bottom right, rgba(214,28,44,0.03) 0%, transparent 24%)",
        }}
      />

      <div className="services-grid-wrap">
        <div
          className="reveal-fade services-grid__intro"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem 3rem",
            alignItems: "end",
            marginBottom: "clamp(2.5rem, 5vw, 3.5rem)",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: label,
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
            <p style={{ maxWidth: "16rem", fontSize: "0.8125rem", lineHeight: 1.75, color: muted, margin: 0 }}>
              Engineering support for domestic, agricultural, and industrial water systems across East Africa.
            </p>
          </div>
          <h2
            style={{
              color: "var(--color-primary)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              fontSize: "clamp(1.85rem, 4vw, 3.2rem)",
              margin: 0,
              maxWidth: "18ch",
              fontWeight: 500,
            }}
          >
            Practical services that keep your{" "}
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>water systems</span> dependable.
          </h2>
        </div>

        <div className="services-grid reveal-fade" data-anim="stagger">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={service.path}
              className="services-grid__card"
            >
              <div className="services-grid__icon-wrap">
                <Icon icon={service.icon} width={20} />
              </div>
              <h3 className="services-grid__title">{service.title}</h3>
              <p className="services-grid__text">{service.summary}</p>
              <span className="services-grid__link">
                Learn more
                <Icon icon="solar:arrow-right-up-linear" width={16} />
              </span>
            </Link>
          ))}
        </div>

        <div className="services-grid__footer reveal-fade">
          <Link href="/services" className="services-grid__all-link">
            View all services
            <Icon icon="solar:arrow-right-up-linear" width={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
