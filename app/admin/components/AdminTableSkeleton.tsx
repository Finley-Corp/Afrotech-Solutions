export function AdminTableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <tr key={row} style={{ borderBottom: "1px solid var(--color-line)" }}>
          {Array.from({ length: cols }).map((__, col) => (
            <td key={col} style={{ padding: "1.25rem 1.5rem" }}>
              <div
                style={{
                  height: "0.875rem",
                  width: col === 0 ? "5rem" : "70%",
                  maxWidth: "12rem",
                  backgroundColor: "#E5E7EB",
                  borderRadius: "2px",
                  animation: "admin-pulse 1.2s ease-in-out infinite",
                }}
              />
            </td>
          ))}
        </tr>
      ))}
      <style jsx>{`
        @keyframes admin-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.45;
          }
        }
      `}</style>
    </>
  );
}
