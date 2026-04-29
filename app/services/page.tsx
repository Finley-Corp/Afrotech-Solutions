"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";

const services = [
  {
    title: "Pump Selection & Sizing",
    text: "We evaluate duty points, head, flow, and source conditions to recommend the right model for long-term performance.",
    icon: "solar:tuning-2-linear",
  },
  {
    title: "System Design & Integration",
    text: "From borehole abstraction to distribution and control, we design complete systems aligned to your site constraints.",
    icon: "solar:settings-minimalistic-linear",
  },
  {
    title: "Installation & Commissioning",
    text: "Our team supports installation quality checks, startup verification, and handover testing before live operation.",
    icon: "solar:shield-check-linear",
  },
  {
    title: "Maintenance & Technical Support",
    text: "Preventive service plans, diagnostics, and responsive support keep your water systems reliable and productive.",
    icon: "solar:headphones-round-sound-linear",
  },
  {
    title: "Remote Pump Monitoring",
    text: "Visibility into pump health, runtime trends, and fault alerts to support faster decisions and reduce downtime.",
    icon: "solar:monitor-smartphone-linear",
  },
];

export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "520px",
          padding: "10rem 2rem 6rem",
          backgroundColor: "var(--color-primary)",
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/images/afrotech-7.jpg"
          alt="Afrotech service team"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.45) 45%, rgba(8,8,8,0.25) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1300px", margin: "0 auto", textAlign: "center" }}>
          <span
            data-anim="hero-eyebrow"
            style={{
              display: "block",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "1.25rem",
            }}
          >
            Engineering Support
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.3rem, 6vw, 4.2rem)",
              color: "white",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: "1rem",
            }}
          >
            Services.
          </h1>
          <p
            data-anim="hero-p"
            style={{
              maxWidth: "44rem",
              margin: "0 auto",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.7,
              fontWeight: 300,
              fontSize: "1rem",
            }}
          >
            We provide end-to-end water system support from design and selection to commissioning and after-sales technical response.
          </p>
        </div>
      </section>

      <section className="premium-landing-section" style={{ padding: "clamp(3.5rem, 7vw, 6rem) 0", borderBottom: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3.5rem)" }}>
          <div data-anim="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {services.map((service) => (
              <article
                key={service.title}
                style={{
                  border: "1px solid var(--color-line)",
                  backgroundColor: "var(--color-surface)",
                  padding: "1.4rem 1.25rem",
                  minHeight: "220px",
                  display: "grid",
                  alignContent: "start",
                  gap: "0.9rem",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "999px",
                    border: "1px solid rgba(0,51,102,0.2)",
                    color: "var(--color-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon icon={service.icon} width={20} />
                </div>
                <h2 style={{ margin: 0, color: "var(--color-primary)", fontSize: "1.25rem", lineHeight: 1.25 }}>
                  {service.title}
                </h2>
                <p style={{ margin: 0, color: "var(--color-secondary)", lineHeight: 1.68, fontSize: "0.9rem" }}>
                  {service.text}
                </p>
              </article>
            ))}
          </div>

          <div className="reveal-fade" style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/quote" className="schedule-btn">
              Request Technical Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
