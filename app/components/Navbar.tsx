"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 50) {
        navRef.current.style.backgroundColor = "rgba(255,255,255,0.85)";
        navRef.current.style.boxShadow = "0 6px 24px rgba(0,0,0,0.03)";
      } else {
        navRef.current.style.backgroundColor = "rgba(255,255,255,0.60)";
        navRef.current.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(255,255,255,0.60)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          transition: "background-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            minHeight: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          {/* Placeholder for center alignment on mobile */}
          <div className="mobile-only" style={{ width: "2rem" }} />

          {/* Left Links (Desktop Only) */}
          <div
            className="mobile-hidden"
            style={{
              gap: "3rem",
              flex: "1",
              alignItems: "center",
            }}
          >
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/products" className="nav-link">
              Our Products
            </Link>
            <Link href="/industries" className="nav-link">
              Industries
            </Link>
            <Link href="/about" className="nav-link">
              About Us
            </Link>
          </div>

          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", flex: "1" }}>
            <Link
              href="/"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-primary)",
                textDecoration: "none",
              }}
            >
              AFROTECH
            </Link>
          </div>

          {/* Right Links (Desktop Only) */}
          <div
            className="mobile-hidden"
            style={{
              alignItems: "center",
              gap: "3rem",
              flex: "1",
              justifyContent: "flex-end",
            }}
          >
            <Link href="/projects" className="nav-link">
              Projects
            </Link>
            <Link href="/contact" className="nav-link">
              Contact Us
            </Link>
            <Link href="/quote" className="nav-cta-link">
              Get A quote
            </Link>
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            className="mobile-only"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: "0.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-primary)",
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
            }}
          >
            <Icon icon={isOpen ? "lucide:x" : "lucide:menu"} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? "is-open" : ""}`}>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          <Link href="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            href="/products"
            className="mobile-nav-link text-reveal"
            style={{ transitionDelay: "0.1s" }}
            onClick={() => setIsOpen(false)}
          >
            Our Products
          </Link>
          <Link
            href="/about"
            className="mobile-nav-link text-reveal"
            style={{ transitionDelay: "0.2s" }}
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/industries"
            className="mobile-nav-link text-reveal"
            style={{ transitionDelay: "0.25s" }}
            onClick={() => setIsOpen(false)}
          >
            Industries
          </Link>
          <Link
            href="/projects"
            className="mobile-nav-link text-reveal"
            style={{ transitionDelay: "0.3s" }}
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="mobile-nav-link text-reveal"
            style={{ transitionDelay: "0.4s" }}
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            href="/quote"
            className="nav-cta-link"
            style={{
              alignSelf: "flex-start",
              marginTop: "1rem",
              fontSize: "1rem",
              padding: "1rem 2rem",
            }}
            onClick={() => setIsOpen(false)}
          >
            Get A quote
          </Link>
        </nav>
      </div>
    </>
  );
}
