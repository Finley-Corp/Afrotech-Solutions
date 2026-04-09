import Link from "next/link";

const applications = [
  { area: "Agriculture", detail: "Irrigation & livestock" },
  { area: "Construction", detail: "Dewatering & site supply" },
  { area: "Municipal", detail: "Water supply networks" },
  { area: "Industrial", detail: "Process & cooling systems" },
];

export default function NeighbourhoodSection() {
  return (
    <section
      style={{
        width: "100%",
        position: "relative",
        paddingTop: "6rem",
        paddingBottom: "10rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        maxWidth: "1400px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative" }}>
          <div
            className="reveal-fade"
            style={{
              aspectRatio: "16/9",
              width: "100%",
              overflow: "hidden",
              position: "relative",
              border: "1px solid var(--color-line)",
              boxShadow: "0 18px 60px rgba(0,0,0,0.06)",
            }}
          >
            <img
              src="/assets/images/afrotech-1.jpg"
              alt="Agricultural irrigation application"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s ease, filter 0.7s ease",
              }}
              className="neighbourhood-img"
            />
          </div>
          <div
            data-anim="fade-delayed"
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              backgroundColor: "rgba(255,255,255,0.60)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(0,0,0,0.10)",
              padding: "0.5rem 1rem",
              borderRadius: "2px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              zIndex: 5,
            }}
          >
            <span
              style={{
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 500,
                color: "var(--color-primary)",
              }}
            >
              Agricultural Irrigation
            </span>
          </div>
        </div>

        {/* Text */}
        <div style={{ maxWidth: "28rem" }}>
          <span
            className="reveal-fade"
            style={{
              display: "block",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--color-secondary)",
              marginBottom: "1.5rem",
            }}
          >
            02 — Applications
          </span>

          <h3
            className="reveal-fade"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 300,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Built for every demand.
          </h3>

          <p
            className="reveal-fade"
            style={{
              color: "var(--color-secondary)",
              lineHeight: 1.75,
              fontWeight: 300,
              marginBottom: "2rem",
              fontSize: "0.9375rem",
            }}
          >
            From remote irrigation systems to high-capacity industrial
            installations, Afrotech pumps are engineered for the full spectrum
            of water demands — reliable under pressure, in any environment.
          </p>

          {/* Application List */}
          <div
            data-anim="stagger"
            style={{
              borderTop: "1px solid var(--color-line)",
              paddingTop: "1.5rem",
              marginTop: "2rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem 1rem",
              marginBottom: "2.5rem",
            }}
          >
            {applications.map(({ area, detail }) => (
              <div
                key={area}
                style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--color-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {area}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-primary)",
                    fontWeight: 300,
                  }}
                >
                  {detail}
                </span>
              </div>
            ))}
          </div>

          {/* Mood */}
          <div
            className="reveal-fade"
            style={{
              borderTop: "1px solid var(--color-line)",
              paddingTop: "1.5rem",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(87,83,78,0.6)",
                fontWeight: 300,
              }}
            >
              Farm fields · Borehole wells · Construction sites · Municipal networks
            </span>
          </div>

          {/* CTAs */}
          <div
            className="reveal-fade"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <Link
              href="/products"
              style={{
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                border: "1px solid rgba(28,25,23,0.6)",
                borderRadius: "2px",
                padding: "0.75rem 2rem",
                color: "var(--color-primary)",
                textDecoration: "none",
                transition: "background-color 0.3s, color 0.3s",
              }}
              className="explore-btn"
            >
              Explore All Applications
            </Link>
            <Link
              href="/contact"
              style={{
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(87,83,78,0.7)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(87,83,78,0.3)",
                paddingBottom: "2px",
                transition: "color 0.3s, border-color 0.3s",
              }}
              className="transit-link"
            >
              Speak to a technical advisor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
