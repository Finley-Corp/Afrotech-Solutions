import Link from "next/link";

export default function PhilosophySection() {
  return (
    <section
      style={{
        paddingTop: "8rem",
        paddingBottom: "6rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        maxWidth: "1400px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          alignItems: "flex-start",
        }}
      >
        {/* Left Label */}
        <div
          style={{
            flex: "0 0 auto",
            width: "220px",
            paddingTop: "0.5rem",
            borderTop: "1px solid var(--color-primary)",
          }}
          className="reveal-fade"
        >
          <span
            style={{
              display: "block",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginTop: "1rem",
            }}
          >
            01 — Who We Are
          </span>
        </div>

        {/* Right Content */}
        <div style={{ flex: "1", minWidth: "280px" }}>
          <h2
            className="reveal-line-group"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              lineHeight: 1.3,
              color: "var(--color-primary)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              maxWidth: "48rem",
              marginBottom: "2.5rem",
            }}
          >
            <span className="line-mask">
              <span className="reveal-line">Engineering water solutions</span>
            </span>
            <span className="line-mask">
              <span className="reveal-line">built to last.</span>
            </span>
          </h2>

          {/* Pillars */}
          <div
            data-anim="stagger"
            style={{
              borderTop: "1px solid var(--color-line)",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
              marginBottom: "2.5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem 3rem",
              alignItems: "center",
            }}
          >
            {["Reliability First", "Energy Efficient", "Local Expert Support"].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--color-secondary)",
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Editorial Image */}
          <div
            className="reveal-fade img-zoom-container group"
            style={{
              width: "100%",
              aspectRatio: "21/9",
              overflow: "hidden",
              borderRadius: "2px",
              border: "1px solid var(--color-line)",
              marginBottom: "3.5rem",
            }}
          >
            <img
              src="/assets/images/afrotech-13.jpg"
              alt="Water pump installation"
              className="img-zoom"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Body text */}
          <div style={{ maxWidth: "36rem" }} className="reveal-fade">
            <p
              style={{
                color: "var(--color-secondary)",
                lineHeight: 1.75,
                fontWeight: 300,
                marginBottom: "2rem",
                fontSize: "0.9375rem",
              }}
            >
              Afrotech is driven by a single commitment — delivering water where
              it&apos;s needed most. From deep borehole submersibles to high-capacity
              industrial centrifugal pumps, every product is selected and tested
              for the demanding conditions of East Africa.
            </p>
            <Link
              href="/about"
              style={{
                display: "inline-block",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                borderBottom: "1px solid var(--color-primary)",
                paddingBottom: "0.25rem",
                color: "var(--color-primary)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.3s, border-color 0.3s",
              }}
              className="journal-link"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
