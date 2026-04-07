export default function EditorialBreak() {
  return (
    <section
      className="editorial-container"
      style={{
        position: "relative",
        width: "100%",
        height: "90vh",
        overflow: "hidden",
        backgroundColor: "#1c1917",
      }}
    >
      <img
        src="/assets/images/water%20pump-1.jpg"
        alt="Industrial pump installation"
        data-anim="scale-scrub-editorial"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: "center",
          willChange: "transform",
          scale: "1.04",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Caption */}
      <div
        className="reveal-fade"
        style={{
          position: "absolute",
          bottom: "clamp(12rem, 18vh, 16rem)",
          left: "clamp(1.5rem, 4vw, 4rem)",
          zIndex: 30,
          maxWidth: "32rem",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "0.625rem",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.15em",
            marginBottom: "1.5rem",
            textShadow: "0 2px 10px rgba(0,0,0,0.35)",
          }}
        >
          Afrotech — Water Pump Solutions
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            textShadow: "0 8px 26px rgba(0,0,0,0.45)",
          }}
        >
          Where reliability meets every drop of demand.
        </h2>
      </div>
    </section>
  );
}
