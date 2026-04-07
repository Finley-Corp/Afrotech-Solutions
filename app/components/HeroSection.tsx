"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "8rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1920&q=80"
          alt="Industrial water pump system"
          style={{
            width: "100%",
            height: "110%",
            objectFit: "cover",
            willChange: "transform",
            position: "absolute",
            top: "-5%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 51, 102, 0.45)", // Navy Tint
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0, 51, 102, 0.7) 0%, rgba(0, 51, 102, 0.2) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: "60rem" }}>
          <span
            data-anim="hero-eyebrow"
            style={{
              display: "block",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "2rem",
            }}
          >
            AFROTECH WATER SOLUTIONS — EAST AFRICA
          </span>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: "1.5rem",
            }}
          >
            <span className="line-mask">
              <span className="reveal-line" data-anim="hero-line">
                Power Your Water,
              </span>
            </span>
            <span className="line-mask">
              <span className="reveal-line" data-anim="hero-line">
                Anywhere.
              </span>
            </span>
          </h1>

          <p
            data-anim="hero-p"
            style={{
              fontSize: "0.9375rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: "36rem",
              marginBottom: "3rem",
              lineHeight: 1.6,
            }}
          >
            Industrial-grade submersible, solar, and centrifugal pumps for
            agriculture, construction, and municipal applications across East
            Africa.
          </p>

          {/* Filter Bar */}
          <div
            data-anim="hero-search"
            style={{
              marginTop: "2rem",
              backgroundColor: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.20)",
              borderRadius: "2px",
              padding: "1.5rem 2rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              gap: "1.5rem",
              maxWidth: "1000px",
            }}
          >
            {/* Pump Type */}
            <div
              data-anim="hero-search-item"
              style={{ flex: "1", minWidth: "130px", cursor: "pointer" }}
            >
              <span
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "0.5rem",
                }}
              >
                Pump Type
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.20)",
                  paddingBottom: "0.5rem",
                }}
              >
                <span style={{ color: "white", fontSize: "0.875rem", fontWeight: 300 }}>
                  Submersible
                </span>
                <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Application */}
            <div
              data-anim="hero-search-item"
              style={{ flex: "1", minWidth: "130px", cursor: "pointer" }}
            >
              <span
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "0.5rem",
                }}
              >
                Application
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.20)",
                  paddingBottom: "0.5rem",
                }}
              >
                <span style={{ color: "white", fontSize: "0.875rem", fontWeight: 300 }}>
                  Agriculture
                </span>
                <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Flow Rate */}
            <div
              data-anim="hero-search-item"
              style={{ flex: "1", minWidth: "130px", cursor: "pointer" }}
            >
              <span
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "0.5rem",
                }}
              >
                Flow Rate
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.20)",
                  paddingBottom: "0.5rem",
                }}
              >
                <span style={{ color: "white", fontSize: "0.875rem", fontWeight: 300 }}>
                  High — 30+ m³/hr
                </span>
                <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* CTA */}
            <div
              data-anim="hero-search-item"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "0.75rem",
                  textAlign: "center",
                }}
              >
                FAST DELIVERY · ACROSS EAST AFRICA
              </span>
              <Link
                href="/products"
                style={{
                  display: "inline-block",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "2px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background-color 0.3s, opacity 0.3s",
                }}
                className="hero-cta-btn"
              >
                Find My Pump
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
