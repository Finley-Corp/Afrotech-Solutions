import Link from "next/link";

const features = [
  {
    name: "High-Efficiency Motors",
    tag: "Energy Saving",
    desc: "Up to 40% lower power consumption vs. standard pumps",
  },
  {
    name: "Corrosion-Resistant Casing",
    tag: "Stainless Steel",
    desc: "316 stainless steel impellers for long-term durability",
  },
  {
    name: "Auto Dry-Run Protection",
    tag: "Smart Control",
    desc: "Automatic shutdown prevents motor burnout in low-water conditions",
  },
  {
    name: "2-Year Manufacturer Warranty",
    tag: "Guaranteed",
    desc: "Full parts and labour coverage on all Afrotech pumps",
  },
];

export default function AmenitiesSection() {
  return (
    <section
      style={{
        paddingTop: "7rem",
        paddingBottom: "8rem",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "3rem",
          paddingRight: "3rem",
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
            03 — Why Afrotech
          </span>
        </div>

        {/* Right Content */}
        <div style={{ flex: "1", minWidth: "280px" }}>
          <div className="reveal-fade" style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "var(--color-primary)",
                marginBottom: "1.5rem",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
              }}
            >
              Engineered for Africa&apos;s toughest conditions.
            </h2>
            <p
              style={{
                color: "var(--color-secondary)",
                fontWeight: 300,
                fontSize: "0.9375rem",
                maxWidth: "36rem",
                lineHeight: 1.75,
              }}
            >
              Every Afrotech pump is tested and certified for the unique demands
              of East African operating environments — from remote off-grid
              installations to high-pressure urban water networks.
            </p>
          </div>

          {/* Row: Image + List */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "3rem",
              alignItems: "center",
              borderTop: "1px solid rgba(231,229,228,0.6)",
              paddingTop: "4rem",
              paddingBottom: "4rem",
            }}
          >
            {/* Image */}
            <div className="reveal-fade img-zoom-container" style={{ borderRadius: "2px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
                  alt="High-efficiency water pump"
                  className="img-zoom"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(10%)",
                    transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1), filter 0.7s",
                  }}
                />
              </div>
            </div>

            {/* Feature List */}
            <div>
              <span
                className="reveal-fade"
                style={{
                  display: "block",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  color: "rgba(87,83,78,0.6)",
                  letterSpacing: "0.15em",
                  marginBottom: "2rem",
                }}
              >
                Built to Perform
              </span>
              <ul
                data-anim="stagger"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {features.map(({ name, tag, desc }) => (
                  <li
                    key={name}
                    className="amenity-item"
                    style={{ marginBottom: "2rem" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.25rem",
                          color: "var(--color-primary)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {name}
                      </span>
                      <span
                        className="amenity-tag"
                        style={{
                          opacity: 0,
                          transition: "opacity 0.5s",
                          fontSize: "0.625rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          color: "rgba(28,25,23,0.4)",
                        }}
                      >
                        {tag}
                      </span>
                    </div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--color-secondary)",
                        fontWeight: 300,
                        borderBottom: "1px solid rgba(231,229,228,0.4)",
                        paddingBottom: "1rem",
                        transition: "border-color 0.3s",
                      }}
                    >
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "3rem" }} className="reveal-fade">
                <Link
                  href="/products"
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
                  className="amenities-link"
                >
                  View All Product Specs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
