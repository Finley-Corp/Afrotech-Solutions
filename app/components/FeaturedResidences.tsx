import Link from "next/link";

const products = [
  {
    name: "AquaMax Submersible 3000",
    price: "From $850",
    spec1: "80m Max Head",
    spec2: "3 HP Motor",
    spec3: "5 m³/hr",
    desc: "Ideal for deep boreholes and wells. SS impeller, auto dry-run protection.",
    img: "/assets/images/afrotech-10.jpg",
    offsetY: false,
  },
  {
    name: "SolarFlow Pro",
    price: "From $1,200",
    spec1: "60m Max Head",
    spec2: "Solar-Powered",
    spec3: "3 m³/hr",
    desc: "Off-grid water supply for remote farms and rural communities.",
    img: "/assets/images/afrotech-11.jpg",
    offsetY: false,
  },
  {
    name: "TurboFlow Industrial",
    price: "From $2,100",
    spec1: "40m Max Head",
    spec2: "7.5 HP Motor",
    spec3: "30 m³/hr",
    desc: "Heavy-duty centrifugal pump for industrial and municipal applications.",
    img: "/assets/images/afrotech-13.jpg",
    offsetY: false,
  },
];

export default function FeaturedResidences() {
  return (
    <section
      style={{
        paddingTop: "8rem",
        paddingBottom: "10rem",
        backgroundColor: "#F6F2EC",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Intro */}
        <div className="reveal-fade" style={{ marginBottom: "5rem" }}>
          <span
            style={{
              display: "block",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(28,25,23,0.6)",
              marginBottom: "1.5rem",
              fontWeight: 500,
            }}
          >
            04 — Featured Products
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: "2rem",
              letterSpacing: "-0.02em",
            }}
          >
            Pumps Defined by
            <br />
            Power and Precision.
          </h2>
          <p
            style={{
              color: "var(--color-secondary)",
              fontWeight: 300,
              maxWidth: "48rem",
              fontSize: "1.125rem",
              lineHeight: 1.75,
            }}
          >
            Each pump in the Afrotech range is engineered for maximum performance
            and long-term reliability. Backed by full technical support and a
            2-year warranty.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          data-anim="stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem 2rem",
            alignItems: "stretch",
          }}
        >
          {products.map((p) => (
            <Link
              key={p.name}
              href="/products"
              className="residence-card"
              style={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                transition: "transform 0.3s",
                marginTop: 0,
                height: "100%",
              }}
            >
              {/* Image */}
              <div
                style={{
                  aspectRatio: "4/5",
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "2px",
                  border: "1px solid rgba(231,229,228,0.5)",
                  marginBottom: "1.5rem",
                  position: "relative",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="residence-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease, filter 0.3s",
                  }}
                />
                <span
                  className="view-details"
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "white",
                    borderBottom: "1px solid rgba(255,255,255,0.6)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  View Specs
                </span>
              </div>

              {/* Info */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                  marginBottom: "0.5rem",
                }}
              >
                <h4
                  className="card-title"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    color: "var(--color-primary)",
                    letterSpacing: "-0.01em",
                    transition: "color 0.3s",
                  }}
                >
                  {p.name}
                </h4>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontSize: "0.75rem",
                  color: "rgba(87,83,78,0.8)",
                  fontWeight: 300,
                  marginBottom: "0.75rem",
                }}
              >
                <span>{p.spec1}</span>
                <span style={{ color: "rgba(87,83,78,0.3)" }}>•</span>
                <span>{p.spec2}</span>
                <span style={{ color: "rgba(87,83,78,0.3)" }}>•</span>
                <span>{p.spec3}</span>
              </div>
              <p
                style={{
                  fontSize: "0.625rem",
                  color: "rgba(87,83,78,0.8)",
                  fontWeight: 300,
                  borderTop: "1px solid rgba(231,229,228,0.4)",
                  paddingTop: "0.75rem",
                  marginTop: "auto",
                }}
              >
                {p.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="reveal-fade"
          style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
        >
          <Link
            href="/products"
            style={{
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              border: "1px solid rgba(28,25,23,0.4)",
              padding: "1rem 2.5rem",
              borderRadius: "2px",
              color: "var(--color-primary)",
              textDecoration: "none",
              fontWeight: 500,
              transition: "background-color 0.3s, color 0.3s",
            }}
            className="browse-btn"
          >
            Browse All Pump Models
          </Link>
        </div>
      </div>
    </section>
  );
}
