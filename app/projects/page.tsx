"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";

const featuredProjects = [
  {
    title: "Mau Forest Highland Irrigation",
    location: "Nakuru, Kenya",
    metric: "150 Hectares Irrigated",
    date: "2024",
    desc: "Installed high-efficiency AquaMax solar pumping systems to automate irrigation for dairy and vegetable farmers, replacing fuel-based pumps and stabilizing daily output.",
    img: "/assets/images/afrotech-1.jpg",
    category: "Agricultural",
  },
  {
    title: "Mombasa Port Cooling Systems",
    location: "Kilindini, Kenya",
    metric: "35% Energy Savings",
    date: "2023",
    desc: "Upgraded port-side cooling and fire safety networks with high-volume TurboFlow centrifugal pumps, improving efficiency and reducing recurring utility costs.",
    img: "/assets/images/afrotech-14.jpg",
    category: "Industrial",
  },
  {
    title: "Kisumu Central Water Hub",
    location: "Kisumu, Kenya",
    metric: "50,000+ People Served",
    date: "2024",
    desc: "Modernized the central pumping station with synchronized multi-pump systems to improve pressure stability and continuity across the municipal distribution network.",
    img: "/assets/images/afrotech-9.jpg",
    category: "Municipal",
  },
  {
    title: "Industrial Supply Stabilization",
    location: "Nairobi, Kenya",
    metric: "99.9% Uptime Target",
    date: "2024",
    desc: "Delivered a duty/standby pumping architecture with monitoring points that improved reliability for continuous-duty process operations.",
    img: "/assets/images/afrotech-13.jpg",
    category: "Infrastructure",
  },
];

const impactStats = [
  { label: "Total Projects Delivered", value: "250+" },
  { label: "Industries Supported", value: "9+" },
  { label: "Regional Support Hubs", value: "12" },
  { label: "Average Response Time", value: "<24h" },
];

const projectPillars = [
  {
    title: "Reliable Engineering Design",
    icon: "solar:ruler-cross-pen-linear",
    text: "Each deployment begins with hydraulic profiling and practical field planning to reduce risk before installation starts.",
  },
  {
    title: "Operational Cost Efficiency",
    icon: "solar:chart-2-linear",
    text: "Our system recommendations prioritize energy performance and long-term maintainability, not one-time procurement alone.",
  },
  {
    title: "Long-Term Technical Support",
    icon: "solar:shield-check-linear",
    text: "From commissioning to troubleshooting, our support model helps clients sustain uptime after handover.",
  },
];

const testimonials = [
  {
    quote:
      "Afrotech helped us move from reactive maintenance to predictable operations. Their team understood both engineering and field realities.",
    author: "Regional Utility Operations Lead",
    location: "Kisumu, Kenya",
  },
  {
    quote:
      "The commissioning process was structured and practical. Performance improved immediately and our operators were fully prepared.",
    author: "Plant Engineering Supervisor",
    location: "Mombasa, Kenya",
  },
  {
    quote:
      "What stood out was response speed and technical clarity. We got decisions quickly and implementation stayed on schedule.",
    author: "Project Delivery Manager",
    location: "Nairobi, Kenya",
  },
];

export default function ProjectsPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)", color: "var(--color-primary)" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "0.75rem 0.75rem 4rem" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: "86vh",
            borderRadius: "2rem",
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/images/afrotech-14.jpg"
            alt="Afrotech engineering project"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(8,8,5,0.5), rgba(8,8,5,0.35), rgba(8,8,5,0.9))",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "clamp(1.5rem, 4vw, 3.5rem)",
              zIndex: 1,
              display: "grid",
              gap: "1.2rem",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{ width: 22, height: 3, borderRadius: 999, backgroundColor: "var(--color-accent)" }} />
              <span style={{ color: "var(--color-accent)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Projects
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2.3rem, 6vw, 5.4rem)",
                lineHeight: 1.02,
                margin: 0,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                maxWidth: "18ch",
                color: "#ffffff",
              }}
            >
              Proven water infrastructure for demanding environments.
            </h1>
            <p style={{ margin: 0, maxWidth: "42rem", color: "rgba(255,255,255,0.92)", fontSize: "1rem", lineHeight: 1.75, fontWeight: 300 }}>
              A selection of deployments across agriculture, industrial, and municipal sectors
              showing measurable impact in reliability, efficiency, and service continuity.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.2rem" }}>
              <Link
                href="/quote"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.85rem 1.1rem",
                  borderRadius: "0.85rem",
                  backgroundColor: "var(--color-accent)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Start a project
                <Icon icon="solar:arrow-right-linear" width={16} />
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.85rem 1.1rem",
                  borderRadius: "0.85rem",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                Talk to engineering
                <Icon icon="solar:arrow-right-linear" width={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About + Stats */}
      <section style={{ padding: "3rem clamp(1.5rem, 5vw, 4rem) 5rem" }}>
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem 5rem",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.8rem" }}>
              <span style={{ width: 22, height: 3, borderRadius: 999, backgroundColor: "var(--color-accent)" }} />
              <span style={{ color: "var(--color-accent)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                About Projects
              </span>
            </div>
            <h2 style={{ margin: "0 0 1rem 0", fontSize: "clamp(1.8rem, 4.2vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500 }}>
              Impact-focused execution across sectors.
            </h2>
            <p style={{ margin: 0, color: "var(--color-secondary)", maxWidth: "46ch", lineHeight: 1.75, fontWeight: 300 }}>
              Every case study reflects the same approach: site-specific analysis, practical design
              decisions, disciplined commissioning, and sustained support after handover.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(140px, 1fr))", gap: "1rem" }}>
            {impactStats.map((s) => (
              <div key={s.label} style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-line)", borderRadius: "1rem", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.2rem" }}>
                  <span style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.7rem)", letterSpacing: "-0.03em", fontWeight: 300 }}>{s.value}</span>
                </div>
                <span style={{ color: "var(--color-secondary)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: "1.5rem 0 5rem", overflow: "hidden" }}>
        <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)", maxWidth: "1440px", margin: "0 auto 1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.8rem" }}>
                <span style={{ width: 22, height: 3, borderRadius: 999, backgroundColor: "var(--color-accent)" }} />
                <span style={{ color: "var(--color-accent)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Featured Models
                </span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(2rem, 4.2vw, 3.8rem)", fontWeight: 500, letterSpacing: "-0.03em" }}>
                Selected Project Models
              </h2>
            </div>
            <Link
              href="/quote"
              style={{
                color: "var(--color-secondary)",
                textDecoration: "none",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderBottom: "1px solid var(--color-line)",
                paddingBottom: "0.35rem",
              }}
            >
              Start your deployment
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", overflowX: "auto", padding: "0 clamp(1.5rem, 5vw, 4rem) 1rem", scrollSnapType: "x mandatory" }}>
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              style={{
                minWidth: "320px",
                width: "380px",
                height: "500px",
                position: "relative",
                borderRadius: "1.6rem",
                overflow: "hidden",
                flexShrink: 0,
                scrollSnapAlign: "center",
                border: "1px solid var(--color-line)",
              }}
            >
              <img src={project.img} alt={project.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,14,0.78), rgba(15,15,14,0.18), transparent)" }} />
              <div style={{ position: "absolute", top: "1rem", left: "1rem", right: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "999px", padding: "0.35rem 0.65rem", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#ffffff" }}>
                  {project.category}
                </span>
                <span style={{ color: "var(--color-accent)", fontSize: "0.75rem", fontWeight: 400 }}>{project.date}</span>
              </div>
              <div style={{ position: "absolute", left: "1rem", right: "1rem", bottom: "1rem" }}>
                <h3 style={{ margin: "0 0 0.65rem 0", fontSize: "1.9rem", lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 500, color: "#ffffff" }}>
                  {project.title}
                </h3>
                <div style={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid var(--color-line)", borderRadius: "1rem", padding: "0.9rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.55rem", borderBottom: "1px solid var(--color-line)" }}>
                    <span style={{ color: "var(--color-secondary)", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Success Metric</span>
                    <span style={{ fontSize: "1rem", letterSpacing: "-0.02em", fontWeight: 500, color: "var(--color-primary)" }}>{project.metric}</span>
                  </div>
                  <div style={{ marginTop: "0.6rem", display: "flex", justifyContent: "space-between", color: "var(--color-secondary)", fontSize: "0.74rem" }}>
                    <span>{project.location}</span>
                    <span>{project.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "3rem clamp(1.5rem, 5vw, 4rem) 5rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.8rem" }}>
              <span style={{ width: 22, height: 3, borderRadius: 999, backgroundColor: "var(--color-accent)" }} />
              <span style={{ color: "var(--color-accent)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Why Afrotech
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(2rem, 4.2vw, 3.8rem)", fontWeight: 500, letterSpacing: "-0.03em" }}>
              Exceptional delivery across every phase.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {projectPillars.map((pillar) => (
              <article key={pillar.title} style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-line)", borderRadius: "1.35rem", padding: "1.5rem" }}>
                <div style={{ width: 52, height: 52, borderRadius: "1rem", backgroundColor: "var(--color-background)", border: "1px solid var(--color-line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-accent)", marginBottom: "1.2rem" }}>
                  <Icon icon={pillar.icon} width={22} />
                </div>
                <h3 style={{ margin: "0 0 0.65rem 0", fontSize: "1.2rem", fontWeight: 500, letterSpacing: "-0.01em" }}>{pillar.title}</h3>
                <p style={{ margin: 0, color: "var(--color-secondary)", lineHeight: 1.75, fontSize: "0.9rem", fontWeight: 300 }}>
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "3rem clamp(1.5rem, 5vw, 4rem) 6rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.8rem" }}>
              <span style={{ width: 22, height: 3, borderRadius: 999, backgroundColor: "var(--color-accent)" }} />
              <span style={{ color: "var(--color-accent)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Testimonials
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(2rem, 4.2vw, 3.8rem)", fontWeight: 500, letterSpacing: "-0.03em" }}>
              Trusted by teams running critical systems.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {testimonials.map((t) => (
              <article key={t.author} style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-line)", borderRadius: "1.35rem", padding: "1.5rem" }}>
                <p style={{ margin: "0 0 1rem 0", color: "var(--color-secondary)", lineHeight: 1.8, fontSize: "0.92rem", fontWeight: 300 }}>
                  "{t.quote}"
                </p>
                <div style={{ width: 32, height: 1, backgroundColor: "var(--color-line)", marginBottom: "0.85rem" }} />
                <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 500 }}>{t.author}</h4>
                <span style={{ color: "var(--color-secondary)", fontSize: "0.75rem" }}>{t.location}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
