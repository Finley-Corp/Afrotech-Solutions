"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import { Icon } from "@iconify/react";
import Link from "next/link";

const openPositions = [
  {
    title: "Senior Technical Sales Engineer",
    location: "Nairobi Hub",
    type: "Full-time",
    department: "Sales & Consulting",
  },
  {
    title: "Borehole Systems Specialist",
    location: "Regional (East Africa)",
    type: "Contract",
    department: "Engineering",
  },
  {
    title: "Supply Chain Manager",
    location: "Mombasa Office",
    type: "Full-time",
    department: "Operations",
  },
];

export default function CareersPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          padding: "10rem 2rem 6rem",
          maxWidth: "1400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          data-anim="hero-eyebrow"
          style={{
            display: "block",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--color-secondary)",
            marginBottom: "1.5rem",
          }}
        >
          Work With Purpose — Afrotech
        </span>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "var(--color-primary)",
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
          }}
        >
          Building the Future of <br /> Water Security.
        </h1>
        <p
          data-anim="hero-p"
          style={{
            color: "var(--color-secondary)",
            fontSize: "1.125rem",
            fontWeight: 300,
            maxWidth: "36rem",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Join a team of engineers, innovators, and problem-solvers dedicated to delivering reliable water solutions across East Africa.
        </p>
      </section>

      {/* Why Join Us */}
      <section style={{ paddingBottom: "8rem" }}>
        <div 
          style={{ 
            maxWidth: "1400px", 
            margin: "0 auto", 
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem"
          }}
        >
          {[
            {
              title: "Regional Impact",
              desc: "Every pump we install empowers a community, farm, or factory. Your work directly drives growth.",
              icon: "lucide:globe",
            },
            {
              title: "Engineering Excellence",
              desc: "We work with the highest industrial standards, ensuring technical integrity in everything we build.",
              icon: "lucide:settings-2",
            },
            {
              title: "Continuous Growth",
              desc: "From technical certifications to leadership tracks, we invest in the people who power our mission.",
              icon: "lucide:trending-up",
            },
          ].map((item) => (
            <div 
              key={item.title}
              className="reveal-fade"
              style={{ 
                padding: "3rem", 
                backgroundColor: "white", 
                border: "1px solid var(--color-line)",
                borderRadius: "2px"
              }}
            >
              <Icon icon={item.icon} width="32" style={{ color: "var(--color-accent)", marginBottom: "1.5rem" }} />
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "1.5rem", 
                fontWeight: 300,
                color: "var(--color-primary)",
                marginBottom: "1rem"
              }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-secondary)", fontWeight: 300, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ padding: "8rem 2rem", backgroundColor: "white", borderTop: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem" }} className="reveal-fade">
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "2.5rem", 
              fontWeight: 300, 
              color: "var(--color-primary)",
              marginBottom: "1rem"
            }}>Current Openings.</h2>
            <p style={{ color: "var(--color-secondary)", fontSize: "1rem", fontWeight: 300 }}>
              Build your career with the leaders in industrial water solutions.
            </p>
          </div>

          <div style={{ display: "grid", gap: "1rem" }} className="reveal-fade">
            {openPositions.map((post) => (
              <div 
                key={post.title}
                style={{ 
                  padding: "2rem", 
                  border: "1px solid var(--color-line)", 
                  borderRadius: "2px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "2rem",
                  transition: "background-color 0.3s"
                }}
                className="career-card"
              >
                <div>
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: "1.25rem", 
                    fontWeight: 500,
                    color: "var(--color-primary)",
                    marginBottom: "0.5rem"
                  }}>{post.title}</h3>
                  <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 300 }}>
                    <span>{post.location}</span>
                    <span>{post.department}</span>
                    <span>{post.type}</span>
                  </div>
                </div>
                <Link 
                  href="/contact"
                  style={{ 
                    padding: "0.75rem 2rem", 
                    backgroundColor: "white", 
                    color: "var(--color-primary)", 
                    border: "1px solid var(--color-primary)",
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    borderRadius: "2px",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "all 0.3s"
                  }}
                  className="apply-btn"
                >
                  Inquire Now
                </Link>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "6rem", textAlign: "center" }} className="reveal-fade">
            <p style={{ color: "var(--color-secondary)", fontSize: "0.875rem", fontWeight: 300, marginBottom: "2rem" }}>
              Don&apos;t see a matching role? We are always looking for technical talent.
            </p>
            <Link 
              href="mailto:careers@afrotech-solutions.com"
              style={{ 
                color: "var(--color-primary)", 
                fontSize: "0.625rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.2em", 
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: "1px solid var(--color-primary)",
                paddingBottom: "0.25rem"
              }}
            >
              Send Your CV
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
