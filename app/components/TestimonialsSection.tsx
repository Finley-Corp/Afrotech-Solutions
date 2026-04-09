import Link from "next/link";
import { Icon } from "@iconify/react";

const muted = "#5f5851";
const label = "#6f675f";

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
  const primary = testimonials[0];

  return (
    <section className="premium-landing-section" style={{ position: "relative", backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-line)", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top right, rgba(0,51,102,0.05) 0%, transparent 26%), radial-gradient(circle at bottom left, rgba(24,21,18,0.03) 0%, transparent 24%)",
        }}
      />
      <div style={{ position: "relative", maxWidth: "1380px", margin: "0 auto", padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 4vw, 3.5rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem 4rem", alignItems: "end", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <div className="reveal-fade">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.14em", color: label, marginBottom: "1rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--color-accent)" }} />
              Statistics &amp; Customer Testimonials
            </div>
            <p style={{ maxWidth: "15rem", fontSize: "0.8125rem", lineHeight: 1.75, color: muted, margin: 0 }}>
              Proof in the field — uptime, delivery, and support when projects are under pressure.
            </p>
          </div>
          <h2
            style={{
              color: "var(--color-primary)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            Built with precision,{" "}
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>trusted</span> where it runs.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(1.5rem, 3vw, 2.5rem)", alignItems: "stretch" }}>
          {/* Main quote panel */}
          <div
            style={{
              border: "1px solid var(--color-line)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 3px rgba(0,51,102,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid var(--color-line)",
                  backgroundColor: "var(--color-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-primary)",
                }}
              >
                <Icon icon="solar:chat-round-linear" width={20} />
              </span>
              <span style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: label }}>Client perspective</span>
            </div>
            <blockquote
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.35rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "var(--color-primary)",
                margin: "0 0 1.5rem 0",
              }}
            >
              &ldquo;{primary.quote}&rdquo;
            </blockquote>
            <p style={{ fontSize: "0.85rem", color: muted, margin: "0 0 auto 0" }}>— {primary.author}</p>

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-line)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
              <div>
                <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a8178", marginBottom: "0.35rem" }}>Quality assurance</p>
                <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-primary)", lineHeight: 1.25, margin: "0 0 0.35rem 0" }}>
                  Tested equipment &amp; documented handover
                </p>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: muted, margin: 0 }}>
                  Commissioning checks aligned to your duty profile and site constraints.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a8178", marginBottom: "0.35rem" }}>Transparency</p>
                <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-primary)", lineHeight: 1.25, margin: "0 0 0.35rem 0" }}>
                  Clear timelines &amp; technical communication
                </p>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: muted, margin: 0 }}>
                  You know what ships, when it arrives, and who supports it after install.
                </p>
              </div>
            </div>
          </div>

          {/* Supporting image + plaque */}
          <div className="img-zoom-container" style={{ position: "relative", minHeight: "360px", backgroundColor: "var(--color-background)", overflow: "hidden" }}>
            <img
              src="/assets/images/afrotech-9.jpg"
              alt="Industrial water installation"
              className="img-zoom"
              style={{ width: "100%", height: "100%", minHeight: "360px", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: "1.25rem", border: "1px solid rgba(255,255,255,0.48)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "1.25rem", right: "1.25rem", bottom: "1.25rem" }}>
              <div style={{ border: "1px solid rgba(255,255,255,0.45)", backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", padding: "1rem 1.1rem", boxShadow: "0 14px 36px rgba(23,18,14,0.1)" }}>
                <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: label, marginBottom: "0.35rem" }}>Field reliability</p>
                <p className="premium-plaque-title" style={{ fontSize: "1.2rem", lineHeight: 1.15, color: "var(--color-primary)", margin: 0 }}>
                  Pumps engineered for East African duty cycles and support you can reach.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary quotes */}
        <div
          data-anim="stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {testimonials.slice(1).map((t, i) => (
            <div key={i} style={{ border: "1px solid var(--color-line)", padding: "1.5rem", backgroundColor: "var(--color-background)" }}>
              <p className="premium-quote-secondary" style={{ fontSize: "1.05rem", lineHeight: 1.55, color: "var(--color-primary)", margin: "0 0 1rem 0", fontWeight: 300 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <span style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: label }}>— {t.author}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: label,
              textDecoration: "none",
              borderBottom: "1px solid var(--color-line)",
              paddingBottom: "0.2rem",
            }}
          >
            View project highlights
            <Icon icon="solar:arrow-right-up-linear" width={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
