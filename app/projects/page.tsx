"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { testimonials } from "../data/testimonials";
import ProjectsGrid from "./components/ProjectsGrid";

const impactStats = [
  { label: "Total Projects Delivered", value: "250+" },
  { label: "Industries Supported", value: "9+" },
  { label: "Regional Coverage", value: "E. Africa" },
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

export default function ProjectsPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)", color: "var(--color-primary)" }}>
      <Navbar />

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
              Featured case studies across agriculture, industrial, and municipal sectors —
              with measurable impact in reliability, efficiency, and service continuity.
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
              href="/quote?service=system-design-integration"
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
              Company-wide delivery volume includes installations and support engagements across
              East Africa. The case studies below are a curated selection with documented outcomes —
              not an exhaustive catalogue of every project.
            </p>
          </div>
          <div>
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
            <p style={{ margin: "1rem 0 0", fontSize: "0.8125rem", lineHeight: 1.6, color: "var(--color-secondary)" }}>
              Featured case studies below — additional projects available on request.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "1.5rem 0 5rem" }} id="case-studies">
        <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)", maxWidth: "1440px", margin: "0 auto 1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.8rem" }}>
                <span style={{ width: 22, height: 3, borderRadius: 999, backgroundColor: "var(--color-accent)" }} />
                <span style={{ color: "var(--color-accent)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Case Studies
                </span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(2rem, 4.2vw, 3.8rem)", fontWeight: 500, letterSpacing: "-0.03em" }}>
                Featured projects
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
        <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)", maxWidth: "1440px", margin: "0 auto" }}>
          <ProjectsGrid />
        </div>
      </section>

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
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ width: 32, height: 1, backgroundColor: "var(--color-line)", marginBottom: "0.85rem" }} />
                <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 500 }}>{t.author}</h4>
                {t.location && (
                  <span style={{ color: "var(--color-secondary)", fontSize: "0.75rem" }}>{t.location}</span>
                )}
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
