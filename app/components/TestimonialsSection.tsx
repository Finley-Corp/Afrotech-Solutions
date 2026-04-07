import Link from "next/link";

const testimonials = [
  {
    quote:
      "The AquaMax submersible has been running our borehole for two years without a single fault. Our farm irrigation runs 18 hours a day — it hasn't missed a beat.",
    author: "James Mwangi, Farmer — Nakuru, Kenya",
  },
  {
    quote:
      "Afrotech's team helped us spec the right dewatering pump for our construction site. Fast delivery and the technical support was excellent throughout the project.",
    author: "Priya Sharma, Site Engineer — Dar es Salaam, Tanzania",
  },
  {
    quote:
      "We switched our entire municipal supply pumping station to Afrotech TurboFlow units. Energy consumption dropped 35% in the first quarter.",
    author: "David Otieno, Water Authority Director — Kisumu, Kenya",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      style={{
        paddingTop: "7rem",
        paddingBottom: "9rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        backgroundColor: "var(--color-background)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "3rem 6rem",
          alignItems: "flex-start",
        }}
      >
        {/* Left Header */}
        <div className="reveal-fade">
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
            05 — Customer Stories
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 300,
              color: "var(--color-primary)",
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              marginTop: "1.5rem",
            }}
          >
            Trusted across East Africa.
          </h2>
          <p
            style={{
              color: "var(--color-secondary)",
              lineHeight: 1.75,
              fontSize: "0.9375rem",
              fontWeight: 300,
              maxWidth: "22rem",
              marginTop: "1.25rem",
            }}
          >
            Hear from the farmers, engineers, and water authorities who depend
            on Afrotech every day.
          </p>
        </div>

        {/* Testimonials */}
        <div style={{ gridColumn: "span 2" }}>
          <div
            data-anim="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem 1.5rem",
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--color-line)",
                  borderRadius: "2px",
                  padding: "2rem",
                  boxShadow: "0 18px 60px rgba(0,0,0,0.04)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.125rem",
                    color: "var(--color-primary)",
                    lineHeight: 1.65,
                    fontWeight: 300,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <span
                  style={{
                    display: "block",
                    marginTop: "1.25rem",
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "rgba(87,83,78,0.7)",
                  }}
                >
                  — {t.author}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem" }} className="reveal-fade">
            <Link
              href="/projects"
              style={{
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
              View Our Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
