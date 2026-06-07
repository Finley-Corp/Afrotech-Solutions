export function AdminStatsSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            padding: "2rem",
            backgroundColor: "white",
            border: "1px solid var(--color-line)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#E5E7EB",
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ height: 10, width: "60%", backgroundColor: "#E5E7EB", marginBottom: 12, borderRadius: 2 }} />
            <div style={{ height: 20, width: "30%", backgroundColor: "#E5E7EB", borderRadius: 2 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
