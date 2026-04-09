import Link from "next/link";
import { Icon } from "@iconify/react";
import { industries } from "../data/industries";

const muted = "#5f5851";
const label = "#6f675f";

const quickStats = [
  { label: "Active Installations", value: "250+" },
  { label: "Industries Supported", value: "9+" },
  { label: "Regional Support Hubs", value: "12" },
  { label: "Avg. Response", value: "<24h" },
];

const resources = [
  {
    title: "Pump Selection Guide",
    desc: "Match flow, head, and duty to your application.",
    href: "/products",
  },
  {
    title: "Industry Capabilities",
    desc: "Sector priorities from agriculture to utilities.",
    href: "/industries",
  },
  {
    title: "Project References",
    desc: "Outcomes from real sites across the region.",
    href: "/projects",
  },
];

const phases = [
  {
    step: "01 — Assess",
    title: "Site & duty profiling.",
    text: "We review source, demand, power, and water quality targets before recommending equipment.",
    img: "/assets/images/afrotech-3.jpg",
    icon: "solar:ruler-cross-pen-linear",
  },
  {
    step: "02 — Engineer",
    title: "System design & selection.",
    text: "Pump curves, controls, and redundancy are sized for your real operating envelope.",
    img: "/assets/images/afrotech-4.jpg",
    icon: "solar:palette-round-linear",
  },
  {
    step: "03 — Deliver",
    title: "Commissioning & support.",
    text: "Installation guidance, startup checks, and ongoing technical response when you need it.",
    img: "/assets/images/afrotech-5.jpg",
    icon: "solar:eye-linear",
  },
];

const featured = industries[0];
const sideA = industries[1];
const sideB = industries[2];

export default function LandingContentSections() {
  return (
    <>
      {/* Industries — showcase layout */}
      <section className="premium-landing-section" style={{ position: "relative", backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-line)", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at top right, rgba(0,51,102,0.05) 0%, transparent 28%), radial-gradient(circle at bottom left, rgba(24,21,18,0.03) 0%, transparent 26%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: "1380px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem 3rem",
              alignItems: "end",
              marginBottom: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            <div className="reveal-fade">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.14em", color: label, marginBottom: "1rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--color-accent)" }} />
                Industries We Serve
              </div>
              <p style={{ maxWidth: "15rem", fontSize: "0.8125rem", lineHeight: 1.75, color: muted, margin: 0 }}>
                Pumping and water movement tailored to sector-specific operating conditions.
              </p>
            </div>
            <div style={{ gridColumn: "span 1" }} className="reveal-fade">
              <h2
                style={{
                  color: "var(--color-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.02,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  margin: 0,
                  maxWidth: "18ch",
                }}
              >
                Solutions built to be{" "}
                <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>reliable</span>
                , scalable, and field-proven.
              </h2>
              <Link
                href="/industries"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  marginTop: "1.25rem",
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: label,
                  textDecoration: "none",
                }}
              >
                View all industries
                <Icon icon="solar:arrow-right-up-linear" width={16} />
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            <Link
              href={`/industries/${featured.id}`}
              className="img-zoom-container"
              style={{
                position: "relative",
                display: "block",
                minHeight: "420px",
                backgroundColor: "var(--color-background)",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img src={featured.image} alt={featured.title} className="img-zoom" style={{ width: "100%", height: "100%", minHeight: "420px", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(18,15,13,0.28), rgba(18,15,13,0.02) 45%, transparent)" }} />
              <div style={{ position: "absolute", inset: "clamp(1rem, 2.5vw, 2rem)", border: "1px solid rgba(255,255,255,0.46)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "clamp(1rem, 2.5vw, 2rem)", right: "clamp(1rem, 2.5vw, 2rem)" }}>
                <div style={{ padding: "0.35rem 0.65rem", border: "1px solid rgba(255,255,255,0.35)", backgroundColor: "rgba(24,21,18,0.2)", backdropFilter: "blur(6px)", color: "white", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Featured
                </div>
              </div>
              <div style={{ position: "absolute", left: "clamp(1rem, 2.5vw, 2rem)", right: "clamp(1rem, 2.5vw, 2rem)", bottom: "clamp(1rem, 2.5vw, 2rem)", maxWidth: "400px" }}>
                    <div style={{ border: "1px solid rgba(255,255,255,0.45)", backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", padding: "1.1rem 1.25rem", boxShadow: "0 14px 40px rgba(23,18,14,0.12)" }}>
                  <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: label, marginBottom: "0.35rem" }}>Sector focus</p>
                  <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", margin: "0 0 0.5rem 0", color: "var(--color-primary)", lineHeight: 1.05 }}>
                    {featured.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: muted, margin: 0 }}>{featured.description}</p>
                </div>
              </div>
            </Link>

            <div style={{ display: "grid", gap: "clamp(1.5rem, 3vw, 2rem)" }}>
              {[sideA, sideB].map((ind) => (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.id}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div className="img-zoom-container" style={{ position: "relative", minHeight: "200px", overflow: "hidden", backgroundColor: "var(--color-background)" }}>
                    <img src={ind.image} alt={ind.title} className="img-zoom" style={{ width: "100%", height: "100%", minHeight: "200px", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: "1rem", border: "1px solid rgba(255,255,255,0.44)", pointerEvents: "none" }} />
                  </div>
                  <div style={{ paddingTop: "1rem", borderBottom: "1px solid var(--color-line)", paddingBottom: "1.25rem" }}>
                    <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a8178", marginBottom: "0.35rem" }}>{ind.id}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                      <h4 style={{ fontSize: "1.35rem", margin: 0, color: "var(--color-primary)", fontWeight: 500 }}>{ind.title}</h4>
                      <Icon icon="solar:arrow-right-up-linear" width={20} style={{ color: "#8a8178", flexShrink: 0 }} />
                    </div>
                    <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: muted, marginTop: "0.65rem", marginBottom: 0 }}>{ind.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="premium-landing-section" style={{ padding: "3rem 0", backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3.5rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
            {quickStats.map((s) => (
              <div key={s.label} style={{ border: "1px solid var(--color-line)", padding: "1.1rem 1.2rem", backgroundColor: "var(--color-background)" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--color-primary)", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: label, marginTop: "0.25rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology — three phases */}
      <section className="premium-landing-section" style={{ position: "relative", backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-line)", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at top left, rgba(0,51,102,0.05) 0%, transparent 26%), radial-gradient(circle at bottom right, rgba(24,21,18,0.03) 0%, transparent 24%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: "1380px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", alignItems: "end", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            <div className="reveal-fade">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.14em", color: label, marginBottom: "1rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--color-accent)" }} />
                How We Work
              </div>
              <p style={{ maxWidth: "15rem", fontSize: "0.8125rem", lineHeight: 1.75, color: muted, margin: 0 }}>
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
              <p style={{ fontSize: "0.98rem", lineHeight: 1.75, color: muted, maxWidth: "42rem", margin: 0 }}>
                Clarity early in the project reduces rework later — we align hydraulic duty, electrical constraints, and service expectations before equipment ships.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {phases.map((p) => (
              <div key={p.step} className="img-zoom-container">
                <div style={{ position: "relative", minHeight: "320px", overflow: "hidden", backgroundColor: "var(--color-background)" }}>
                  <img src={p.img} alt="" className="img-zoom" style={{ width: "100%", height: "100%", minHeight: "320px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: "1rem", border: "1px solid rgba(255,255,255,0.48)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.45)",
                        backgroundColor: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-primary)",
                        boxShadow: "0 10px 24px rgba(23,18,14,0.1)",
                      }}
                    >
                      <Icon icon={p.icon} width={22} />
                    </div>
                  </div>
                </div>
                <div style={{ paddingTop: "1.1rem", borderBottom: "1px solid var(--color-line)", paddingBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a8178", marginBottom: "0.45rem" }}>{p.step}</p>
                  <h3 style={{ fontSize: "1.35rem", margin: "0 0 0.65rem 0", color: "var(--color-primary)", fontWeight: 500 }}>{p.title}</h3>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: muted, margin: 0 }}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers · Resources · Locations */}
      <section className="premium-landing-section" style={{ padding: "clamp(3.5rem, 7vw, 6rem) 0", backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3.5rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          <article style={{ border: "1px solid var(--color-line)", backgroundColor: "var(--color-surface)", overflow: "hidden" }}>
            <div className="img-zoom-container" style={{ position: "relative", height: "200px" }}>
              <img src="/assets/images/afrotech-6.jpg" alt="Careers" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: "0.75rem", border: "1px solid rgba(255,255,255,0.4)", pointerEvents: "none" }} />
            </div>
            <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
              <span style={{ display: "block", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.14em", color: label, marginBottom: "0.65rem" }}>Careers</span>
              <h3 style={{ fontSize: "1.65rem", color: "var(--color-primary)", margin: "0 0 0.65rem 0" }}>Join our engineering team.</h3>
              <p style={{ margin: "0 0 1.1rem 0", color: muted, lineHeight: 1.7, fontSize: "0.92rem" }}>
                Technical sales, field engineering, and operations roles across the region.
              </p>
              <Link href="/careers" style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-primary)", textDecoration: "none", borderBottom: "1px solid var(--color-line)", paddingBottom: "0.15rem", fontWeight: 600 }}>
                View openings
              </Link>
            </div>
          </article>

          <article style={{ border: "1px solid var(--color-line)", backgroundColor: "var(--color-surface)", overflow: "hidden" }}>
            <div className="img-zoom-container" style={{ position: "relative", height: "200px" }}>
              <img src="/assets/images/afrotech-7.jpg" alt="Resources" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: "0.75rem", border: "1px solid rgba(255,255,255,0.4)", pointerEvents: "none" }} />
            </div>
            <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
              <span style={{ display: "block", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.14em", color: label, marginBottom: "0.65rem" }}>Resource Center</span>
              <h3 style={{ fontSize: "1.65rem", color: "var(--color-primary)", margin: "0 0 0.85rem 0" }}>Technical references.</h3>
              <ul style={{ margin: 0, paddingLeft: "1rem", color: muted, display: "grid", gap: "0.5rem", fontSize: "0.88rem", lineHeight: 1.55 }}>
                {resources.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 500 }}>
                      {item.title}
                    </Link>
                    {" — "}
                    {item.desc}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article style={{ border: "1px solid var(--color-line)", backgroundColor: "var(--color-surface)", overflow: "hidden" }}>
            <div className="img-zoom-container" style={{ position: "relative", height: "200px" }}>
              <img src="/assets/images/afrotech-8.jpg" alt="Locations" className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: "0.75rem", border: "1px solid rgba(255,255,255,0.4)", pointerEvents: "none" }} />
            </div>
            <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
              <span style={{ display: "block", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.14em", color: label, marginBottom: "0.65rem" }}>Locations &amp; Contact</span>
              <h3 style={{ fontSize: "1.65rem", color: "var(--color-primary)", margin: "0 0 0.65rem 0" }}>East Africa support.</h3>
              <p style={{ margin: "0 0 1.1rem 0", color: muted, lineHeight: 1.7, fontSize: "0.92rem" }}>
                NML Towers, Tsavo Road, South B, Nairobi, Kenya.
              </p>
              <Link href="/contact" style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-primary)", textDecoration: "none", borderBottom: "1px solid var(--color-line)", paddingBottom: "0.15rem", fontWeight: 600 }}>
                Contact our team
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
