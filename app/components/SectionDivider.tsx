export default function SectionDivider({ label }: { label: string }) {
  return (
    <div
      className="reveal-fade"
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "3rem 3rem",
      }}
    >
      <div
        style={{
          width: "100%",
          borderTop: "1px solid var(--color-line)",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            transform: "translateY(-50%)",
            backgroundColor: "var(--color-background)",
            padding: "0 1rem",
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(87,83,78,0.6)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
