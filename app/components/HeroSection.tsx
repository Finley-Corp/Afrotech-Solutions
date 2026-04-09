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
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 60%, transparent 100%)",
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
                High Purity Water
              </span>
            </span>
            <span className="line-mask">
              <span className="reveal-line" data-anim="hero-line">
                Solutions.
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
            Reliable treatment-ready pumping systems and technical support for
            industrial, municipal, and agricultural water applications across
            East Africa.
          </p>

          <div
            data-anim="hero-search"
            style={{
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/quote"
              style={{
                display: "inline-block",
                textAlign: "center",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                backgroundColor: "var(--color-accent)",
                color: "white",
                padding: "1rem 2.25rem",
                borderRadius: "2px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background-color 0.3s, opacity 0.3s",
              }}
              className="hero-cta-btn"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
