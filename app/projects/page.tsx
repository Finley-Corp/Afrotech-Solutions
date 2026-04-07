"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";

const projectCaseStudies = [
  {
    category: "Agricultural Impact",
    id: "agriculture",
    projects: [
      {
        title: "Mau Forest Highland Irrigation",
        location: "Nakuru, Kenya",
        metric: "150 Hectares Irrigated",
        date: "2024",
        desc: "Installed high-efficiency AquaMax solar pumping systems to automate irrigation for dairy and vegetable farmers. Replaced unreliable petrol pumps, reducing fuel costs by 100%.",
        img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
      },
    ],
  },
  {
    category: "Industrial Infrastructure",
    id: "industrial",
    projects: [
      {
        title: "Mombasa Port Cooling Systems",
        location: "Kilindini, Kenya",
        metric: "35% Energy Savings",
        date: "2023",
        desc: "Upgraded port-side cooling and fire safety water networks with high-volume TurboFlow centrifugal pumps. Advanced motor optimization reduced daily energy consumption significantly.",
        img: "https://images.unsplash.com/photo-1541888941294-118889412942?w=1200&q=80",
      },
    ],
  },
  {
    category: "Municipal Supply",
    id: "municipal",
    projects: [
      {
        title: "Kisumu Central Water Hub",
        location: "Kisumu, Kenya",
        metric: "50,000+ People Served",
        date: "2024",
        desc: "Collaborated with regional water authorities to modernize the central pumping station. Installed synchronized multi-pump systems for consistent pressure throughout the city network.",
        img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&q=80",
      },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      {/* Projects Hero */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "65vh",
          minHeight: "450px",
          backgroundColor: "var(--color-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            backgroundColor: "rgba(0, 51, 102, 0.45)",
            zIndex: 1
          }} 
        />
        <img
          src="https://images.unsplash.com/photo-1541888941294-118889412942?w=1920&q=80"
          alt="Large-scale water project"
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
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 2rem",
            maxWidth: "60rem",
          }}
        >
          <span
            data-anim="hero-eyebrow"
            style={{
              display: "block",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "1.5rem",
            }}
          >
            Engineering Impact — Afrotech
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "white",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
            className="reveal-line-group"
          >
            Water for Development.
          </h1>
          <p
            data-anim="hero-p"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.125rem",
              fontWeight: 300,
              maxWidth: "36rem",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            A sample of the industrial and agricultural projects where Afrotech systems drive daily growth and reliable supply across East Africa.
          </p>
        </div>
      </section>

      {/* Case Studies Content */}
      <section style={{ paddingTop: "8rem", paddingBottom: "10rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>
          
          {projectCaseStudies.map((section, sectionIdx) => (
            <div 
              key={section.id} 
              id={section.id}
              style={{ 
                marginBottom: sectionIdx !== projectCaseStudies.length - 1 ? "12rem" : "0",
              }}
            >
              {/* Section Branding */}
              <div 
                className="reveal-fade"
                style={{ 
                  borderBottom: "1px solid var(--color-line)",
                  paddingBottom: "1.5rem",
                  marginBottom: "4rem",
                  width: "100%",
                }}
              >
                <span style={{ 
                  display: "block", 
                  fontSize: "0.625rem", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.15em", 
                  color: "var(--color-secondary)",
                  fontWeight: 500,
                }}>
                  Pillar {sectionIdx + 1} — {section.category}
                </span>
              </div>

              {/* Case Study Entry */}
              {section.projects.map((proj) => (
                <div 
                  key={proj.title}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1.2fr 1fr))",
                    gap: "4rem 8rem",
                    alignItems: "flex-start"
                  }}
                >
                  <div className="reveal-fade">
                    <div style={{
                      aspectRatio: "16/9",
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: "2px",
                      border: "1px solid var(--color-line)",
                      boxShadow: "0 14px 40px rgba(0,0,0,0.04)",
                      marginBottom: "2rem"
                    }}>
                      <img 
                        src={proj.img} 
                        alt={proj.title} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="reveal-fade" style={{ maxWidth: "34rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
                      <span style={{ 
                        fontSize: "0.75rem", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.15em", 
                        color: "var(--color-secondary)",
                        fontWeight: 300
                      }}>
                        {proj.location} • {proj.date}
                      </span>
                    </div>
                    <h3 style={{ 
                      fontFamily: "'Playfair Display', serif", 
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      fontWeight: 300,
                      color: "var(--color-primary)",
                      marginBottom: "2rem",
                      lineHeight: 1.25,
                      letterSpacing: "-0.02em"
                    }}>
                      {proj.title}
                    </h3>
                    <div style={{ 
                      backgroundColor: "white", 
                      padding: "2rem", 
                      border: "1px solid var(--color-line)",
                      borderRadius: "2px",
                      marginBottom: "2.5rem"
                    }}>
                      <span style={{ 
                        display: "block", 
                        fontSize: "0.625rem", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.1em", 
                        color: "var(--color-accent)",
                        marginBottom: "0.5rem",
                        fontWeight: 500
                      }}>
                        Success Metric
                      </span>
                      <span style={{ 
                        display: "block", 
                        fontSize: "1.5rem", 
                        fontWeight: 500, 
                        color: "var(--color-primary)",
                        letterSpacing: "-0.01em"
                      }}>
                        {proj.metric}
                      </span>
                    </div>
                    <p style={{ 
                      fontSize: "1rem", 
                      color: "var(--color-secondary)", 
                      fontWeight: 300, 
                      lineHeight: 1.75,
                      marginBottom: "2.5rem"
                    }}>
                      {proj.desc}
                    </p>
                    <Link 
                      href="/quote"
                      style={{ 
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.625rem", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.15em", 
                        fontWeight: 500,
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--color-primary)",
                        paddingBottom: "0.25rem",
                        transition: "opacity 0.3s"
                      }}
                      className="product-cta"
                    >
                      Start Your Project Consultation
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}

        </div>
      </section>

      {/* Global Impact Summary Section */}
      <section 
        style={{ 
          padding: "10rem 3rem", 
          backgroundColor: "var(--color-background)",
          borderTop: "1px solid var(--color-line)",
          textAlign: "center"
        }}
      >
        <div style={{ maxWidth: "50rem", margin: "0 auto" }} className="reveal-fade">
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "var(--color-primary)",
            marginBottom: "2rem",
            lineHeight: 1.15
          }}>
            Solutions that power regional growth.
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "2.5rem",
            marginTop: "5rem"
          }}>
            {[
              { label: "Installations", value: "250+" },
              { label: "Reliability", value: "99.9%" },
              { label: "Support Locations", value: "12" },
              { label: "East Africa Reach", value: "3 Countries" },
            ].map((stat) => (
              <div key={stat.label}>
                <span style={{ 
                  display: "block", 
                  fontSize: "1.75rem", 
                  fontWeight: 500, 
                  color: "var(--color-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.5rem"
                }}>
                  {stat.value}
                </span>
                <span style={{ 
                  fontSize: "0.625rem", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.15em", 
                  color: "rgba(87,83,78,0.6)"
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
