"use client";

import { useParams, useRouter } from "next/navigation";
import { productsList } from "../../data/products";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GSAPAnimations from "../../components/GSAPAnimations";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = productsList.find((p) => p.id === params.id);

  // If product not found, redirect to catalog
  useEffect(() => {
    if (!product) {
      router.push("/products");
    }
  }, [product, router]);

  if (!product) return null;

  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      {/* Product Hero & Specs Grid */}
      <section style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div 
          style={{ 
            maxWidth: "1400px", 
            margin: "0 auto", 
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 0.7fr 1.3fr 1fr))",
            gap: "4rem",
            alignItems: "start"
          }}
        >
          {/* Column 1: Small Product Image */}
          <div className="reveal-fade">
            <div style={{ 
              aspectRatio: "1/1", 
              width: "100%", 
              backgroundColor: "white", 
              borderRadius: "2px",
              border: "1px solid var(--color-line)",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.02)"
            }}>
              <img 
                src={product.mainImg} 
                alt={product.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          </div>

          {/* Column 2: Product Info */}
          <div className="reveal-fade">
            <span style={{ 
              display: "block", 
              fontSize: "0.625rem", 
              textTransform: "uppercase", 
              letterSpacing: "0.2em", 
              color: "var(--color-secondary)",
              marginBottom: "1rem"
            }}>
              {product.category}
            </span>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(2rem, 4vw, 3rem)", 
              fontWeight: 300, 
              color: "var(--color-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "1.5rem"
            }}>
              {product.name}
            </h1>
            <p style={{ 
              fontSize: "1rem", 
              color: "var(--color-secondary)", 
              fontWeight: 300, 
              lineHeight: 1.7, 
              marginBottom: "2.5rem",
              maxWidth: "28rem"
            }}>
              {product.fullDesc}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
              <Link 
                href="/quote" 
                style={{ 
                  padding: "1rem 2.5rem", 
                  backgroundColor: "var(--color-primary)", 
                  color: "white", 
                  fontSize: "0.625rem", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.2em",
                  borderRadius: "2px",
                  textDecoration: "none",
                  fontWeight: 500
                }}
              >
                Inquire About Model
              </Link>
              <span style={{ 
                padding: "1rem 0", 
                fontSize: "1.125rem", 
                color: "var(--color-primary)", 
                fontWeight: 500
              }}>
                {product.price}
              </span>
            </div>
          </div>

          {/* Column 3: Technical Specifications (Moved up) */}
          <div className="reveal-fade">
            <h3 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "1.25rem", 
              fontWeight: 300, 
              color: "var(--color-primary)",
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--color-line)",
              paddingBottom: "0.75rem"
            }}>
              Technical Specs.
            </h3>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {product.detailedSpecs.map((spec, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    fontSize: "0.8125rem",
                    borderBottom: "1px solid rgba(0,0,0,0.03)",
                    paddingBottom: "0.5rem"
                  }}
                >
                  <span style={{ color: "var(--color-secondary)", fontWeight: 300 }}>{spec.label}</span>
                  <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications & Reliability Section */}
      <section style={{ padding: "8rem 2rem", backgroundColor: "white", borderTop: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1.2fr 1fr))",
              gap: "8rem",
              alignItems: "start"
            }}
          >
            {/* Left: Applications */}
            <div className="reveal-fade">
              <div style={{ backgroundColor: "var(--color-background)", padding: "4rem", borderRadius: "2px" }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: "1.5rem", 
                  fontWeight: 300, 
                  color: "var(--color-primary)",
                  marginBottom: "2rem"
                }}>
                  Primary Applications.
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                  {product.applications.map((app, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--color-secondary)", fontSize: "1rem", fontWeight: 300 }}>
                      <Icon icon="lucide:check" width="18" style={{ color: "var(--color-primary)" }} />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Reliability Standards */}
            <div className="reveal-fade" style={{ paddingTop: "2rem" }}>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "1.5rem", 
                fontWeight: 300, 
                color: "var(--color-primary)",
                marginBottom: "2rem"
              }}>
                Reliability Standards.
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--color-secondary)", fontWeight: 300, lineHeight: 1.75, marginBottom: "2rem" }}>
                All components in the {product.name} series undergo our rigorous 12-point quality testing cycle, including high-pressure endurance and motor winding integrity checks.
              </p>
              <div style={{ display: "flex", gap: "2rem" }}>
                <div style={{ borderLeft: "1px solid var(--color-line)", paddingLeft: "1.5rem" }}>
                  <span style={{ display: "block", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(87,83,78,0.6)", marginBottom: "0.25rem" }}>Test Cycle</span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--color-primary)" }}>12-Point</span>
                </div>
                <div style={{ borderLeft: "1px solid var(--color-line)", paddingLeft: "1.5rem" }}>
                  <span style={{ display: "block", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(87,83,78,0.6)", marginBottom: "0.25rem" }}>Approval</span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--color-primary)" }}>ISO 9001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section style={{ padding: "6rem 2rem", borderTop: "1px solid var(--color-line)", textAlign: "center" }}>
        <Link 
          href="/products" 
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.75rem", 
            color: "var(--color-primary)", 
            textDecoration: "none",
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontWeight: 500
          }}
        >
          <Icon icon="lucide:arrow-left" width="16" />
          Back to Catalog
        </Link>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
