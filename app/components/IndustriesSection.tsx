import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { industries } from "../data/industries";

const muted = "#5f5851";
const label = "#6f675f";

/**
 * Homepage teaser shows 3 of 9 industries intentionally:
 * Construction (featured), Industrial, and Municipal — treated as high-visibility /
 * frequently requested sectors. Do not expand or reshuffle without stakeholder confirmation.
 * Full set lives on /industries.
 */
const featured = industries.find((i) => i.id === "construction") ?? industries[3];
const sideA = industries.find((i) => i.id === "industrial") ?? industries[1];
const sideB = industries.find((i) => i.id === "municipal") ?? industries[2];

export default function IndustriesSection() {
  return (
    <section
      className="premium-landing-section"
      style={{
        position: "relative",
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-line)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top right, rgba(0,51,102,0.05) 0%, transparent 28%), radial-gradient(circle at bottom left, rgba(24,21,18,0.03) 0%, transparent 26%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem 3rem",
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
              Industries We Serve
            </div>
            <p
              style={{
                maxWidth: "15rem",
                fontSize: "0.8125rem",
                lineHeight: 1.75,
                color: muted,
                margin: 0,
              }}
            >
              Pumping and water movement tailored to sector-specific operating conditions.
            </p>
          </div>
          <div style={{ gridColumn: "span 1" }} className="reveal-fade">
            <h2
              style={{
                color: "var(--color-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                margin: 0,
                maxWidth: "18ch",
              }}
            >
              Solutions built to be{" "}
              <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>reliable</span>
              , scalable, and field-proven.
            </h2>
            <Link
              href="/industries"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                marginTop: "1.25rem",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: label,
                textDecoration: "none",
              }}
            >
              View all industries
              <Icon icon="solar:arrow-right-up-linear" width={16} />
            </Link>
          </div>
        </div>

        <div
          className="home-industries-showcase"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(224px, 1fr))",
            gap: "clamp(1.2rem, 2.4vw, 2rem)",
            maxWidth: "80%",
            margin: "0 auto",
            alignItems: "stretch",
          }}
        >
          <Link
            href={`/industries/${featured.id}`}
            className="img-zoom-container home-industries-featured"
            style={{
              position: "relative",
              display: "block",
              height: "100%",
              minHeight: "100%",
              backgroundColor: "var(--color-background)",
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
              className="img-zoom"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(18,15,13,0.28), rgba(18,15,13,0.02) 45%, transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "clamp(1rem, 2.5vw, 2rem)",
                border: "1px solid rgba(255,255,255,0.46)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "clamp(1rem, 2.5vw, 2rem)",
                right: "clamp(1rem, 2.5vw, 2rem)",
              }}
            >
              <div
                style={{
                  padding: "0.35rem 0.65rem",
                  border: "1px solid rgba(255,255,255,0.35)",
                  backgroundColor: "rgba(24,21,18,0.2)",
                  backdropFilter: "blur(6px)",
                  color: "white",
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Featured
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "clamp(1rem, 2.5vw, 2rem)",
                right: "clamp(1rem, 2.5vw, 2rem)",
                bottom: "clamp(1rem, 2.5vw, 2rem)",
                maxWidth: "320px",
              }}
            >
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.45)",
                  backgroundColor: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                  padding: "1.1rem 1.25rem",
                  boxShadow: "0 14px 40px rgba(23,18,14,0.12)",
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
                  Sector focus
                </p>
                <h3
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
                    margin: "0 0 0.5rem 0",
                    color: "var(--color-primary)",
                    lineHeight: 1.05,
                  }}
                >
                  {featured.title}
                </h3>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: muted, margin: 0 }}>
                  {featured.description}
                </p>
              </div>
            </div>
          </Link>

          <div className="home-industries-side">
            {[sideA, sideB].map((ind) => (
              <Link key={ind.id} href={`/industries/${ind.id}`} className="home-industries-side__card">
                <div className="img-zoom-container home-industries-side__media">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(max-width: 767px) 50vw, 20vw"
                    className="img-zoom"
                  />
                  <div className="home-industries-side__frame" aria-hidden />
                </div>
                <div className="home-industries-side__copy">
                  <p className="home-industries-side__label">{ind.id}</p>
                  <div className="home-industries-side__title-row">
                    <h4 className="home-industries-side__title">{ind.title}</h4>
                    <Icon icon="solar:arrow-right-up-linear" width={18} className="home-industries-side__arrow" />
                  </div>
                  <p className="home-industries-side__desc">{ind.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
