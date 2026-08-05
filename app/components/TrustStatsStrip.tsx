const label = "#6f675f";

const quickStats = [
  { label: "Active Installations", value: "250+" },
  { label: "Industries Supported", value: "9+" },
  { label: "Regional Coverage", value: "E. Africa" },
  { label: "Avg. Response", value: "<24h" },
];

export default function TrustStatsStrip() {
  return (
    <section
      className="premium-landing-section"
      style={{
        padding: "3rem 0",
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3.5rem)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
          }}
        >
          {quickStats.map((s) => (
            <div
              key={s.label}
              style={{
                border: "1px solid var(--color-line)",
                padding: "1.1rem 1.2rem",
                backgroundColor: "var(--color-background)",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--color-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: label,
                  marginTop: "0.25rem",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
