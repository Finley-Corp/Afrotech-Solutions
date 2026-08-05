import Image from "next/image";

const muted = "#5f5851";
const label = "#6f675f";

const phases = [
  {
    step: "01 — Assess",
    title: "Site & duty profiling.",
    text: "We review source, demand, power, and operating conditions before recommending equipment.",
    img: "/assets/images/afrotech-3.jpg",
  },
  {
    step: "02 — Engineer",
    title: "System design & selection.",
    text: "Pump curves, controls, and redundancy are sized for your real operating envelope.",
    img: "/assets/images/afrotech-4.jpg",
  },
  {
    step: "03 — Deliver",
    title: "Commissioning & support.",
    text: "Installation guidance, startup checks, and ongoing technical response when you need it.",
    img: "/assets/images/afrotech-5.jpg",
  },
];

export default function HowWeWorkSection() {
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
            "radial-gradient(circle at top left, rgba(0,51,102,0.05) 0%, transparent 26%), radial-gradient(circle at bottom right, rgba(24,21,18,0.03) 0%, transparent 24%)",
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
            gap: "2rem",
            alignItems: "end",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
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
              How We Work
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
              A clear process from first conversation to reliable operation in the field.
            </p>
          </div>
          <div>
            <h2
              style={{
                color: "var(--color-primary)",
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                fontSize: "clamp(1.85rem, 3.8vw, 3.2rem)",
                margin: "0 0 0.75rem 0",
                maxWidth: "16ch",
              }}
            >
              Three phases that guide every{" "}
              <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>deployment</span>.
            </h2>
            <p
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.75,
                color: muted,
                maxWidth: "42rem",
                margin: 0,
              }}
            >
              Clarity early in the project reduces rework later — we align hydraulic duty, electrical
              constraints, and service expectations before equipment ships.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {phases.map((p) => (
            <div key={p.step} className="img-zoom-container">
              <div
                style={{
                  position: "relative",
                  minHeight: "320px",
                  overflow: "hidden",
                  backgroundColor: "var(--color-background)",
                }}
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="img-zoom"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "1rem",
                    border: "1px solid rgba(255,255,255,0.48)",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div
                style={{
                  paddingTop: "1.1rem",
                  borderBottom: "1px solid var(--color-line)",
                  paddingBottom: "1.25rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#8a8178",
                    marginBottom: "0.45rem",
                  }}
                >
                  {p.step}
                </p>
                <h3
                  style={{
                    fontSize: "1.35rem",
                    margin: "0 0 0.65rem 0",
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: muted, margin: 0 }}>
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
