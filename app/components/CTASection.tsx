import Link from "next/link";

export default function CTASection() {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#EDE7DE",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingTop: "7rem",
        paddingBottom: "9rem",
        zIndex: 20,
        overflow: "hidden",
        marginTop: "-8rem",
      }}
    >
      <div
        data-anim="stagger"
        style={{ maxWidth: "36rem", margin: "0 auto", textAlign: "center" }}
      >
        <p
          style={{
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(28, 25, 23, 0.6)",
            marginBottom: "1.5rem",
          }}
        >
          Fast response · Across East Africa
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "var(--color-primary)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          Ready to find the right pump?
        </h2>
        <p
          style={{
            color: "rgba(28, 25, 23, 0.7)",
            lineHeight: 1.75,
            fontSize: "0.9375rem",
            fontWeight: 300,
            marginBottom: "2.5rem",
          }}
        >
          Tell us your application and flow requirements — we&apos;ll recommend
          the ideal pump and deliver anywhere in East Africa.
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Link href="/quote" className="schedule-btn">
            Get A Quote
          </Link>
          <Link href="/products" className="floorplan-link">
            Browse All Products First
          </Link>
        </div>
        <p
          style={{
            color: "rgba(28,25,23,0.5)",
            fontSize: "0.75rem",
            fontWeight: 300,
            marginTop: "2.5rem",
          }}
        >
          Technical support response within 24 hours.
        </p>
      </div>
    </section>
  );
}
