import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const label = "#6f675f";
const muted = "#5f5851";

export default function ServicesSection() {
  return (
    <section
      className="premium-landing-section services-bento-section"
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

      <div className="services-bento-wrap">
        <div
          className="reveal-fade services-bento__intro"
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

        <div className="services-bento reveal-fade" data-anim="stagger">
          <article className="services-bento__card services-bento__card--trusted">
            <div className="services-bento__media">
              <Image
                src="/assets/images/afrotech-14.jpg"
                alt="Afrotech field installation"
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="services-bento__card-bg"
              />
              <div className="services-bento__frame" aria-hidden />
              <div className="services-bento__card-overlay" />
            </div>
            <div className="services-bento__card-content services-bento__card-content--light">
              <span className="services-bento__step">Field-proven</span>
              <p className="services-bento__stat-lg">250+</p>
              <span className="services-bento__caption">Active installations across the region</span>
            </div>
          </article>

          <article className="services-bento__card services-bento__card--surface">
            <span className="services-bento__step">01 — Selection</span>
            <div className="services-bento__product-visual">
              <Image
                src="/assets/products/product-1.jpg"
                alt="Pump selection and sizing"
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
              />
            </div>
            <h3 className="services-bento__card-title">Pump selection &amp; sizing</h3>
            <p className="services-bento__card-text">
              Duty-point analysis, head calculations, and model matching for reliable operation.
            </p>
          </article>

          <article className="services-bento__card services-bento__card--hero">
            <div className="services-bento__media services-bento__media--tall">
              <Image
                src="/assets/images/afrotech-9.jpg"
                alt="Technical support"
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="services-bento__card-bg"
              />
              <div className="services-bento__frame" aria-hidden />
              <div className="services-bento__card-overlay services-bento__card-overlay--navy" />
            </div>
            <div className="services-bento__card-content services-bento__card-content--light">
              <span className="services-bento__step">04 — Support</span>
              <h3 className="services-bento__hero-title">Maintenance &amp; technical support</h3>
              <p className="services-bento__hero-meta">Response within 24 hours for critical operations</p>
            </div>
          </article>

          <article className="services-bento__card services-bento__card--wide">
            <span className="services-bento__step">02 — Engineering</span>
            <h3 className="services-bento__wide-title">
              System design &amp; integration for borehole, booster, and transfer systems.
            </h3>
            <p className="services-bento__card-text">
              End-to-end layouts with controls, redundancy planning, and commissioning support.
            </p>
            <Link href="/services" className="services-bento__link">
              View all services
              <Icon icon="solar:arrow-right-up-linear" width={16} />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
