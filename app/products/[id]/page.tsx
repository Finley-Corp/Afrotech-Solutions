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

      {/* Product Hero Split */}
      <section style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div 
          style={{ 
            maxWidth: "1400px", 
            margin: "0 auto", 
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1.2fr 1fr))",
            gap: "5rem",
            alignItems: "center"
          }}
        >
          {/* Product Image */}
          <div className="reveal-fade">
            <div style={{ 
              aspectRatio: "1/1", 
              width: "100%", 
              backgroundColor: "white", 
              borderRadius: "2px",
              border: "1px solid var(--color-line)",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.03)"
            }}>
              <img 
                src={product.mainImg} 
                alt={product.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="reveal-fade">
            <span style={{ 
              display: "block", 
              fontSize: "0.75rem", 
              textTransform: "uppercase", 
              letterSpacing: "0.2em", 
              color: "var(--color-secondary)",
              marginBottom: "1.5rem"
            }}>
              {product.category}
            </span>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(2.5rem, 5vw, 4rem)", 
              fontWeight: 300, 
              color: "var(--color-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "2rem"
            }}>
              {product.name}
            </h1>
            <p style={{ 
              fontSize: "1.125rem", 
              color: "var(--color-secondary)", 
              fontWeight: 300, 
              lineHeight: 1.75, 
              marginBottom: "3rem",
              maxWidth: "32rem"
            }}>
              {product.fullDesc}
            </p>

            <div style={{ display: "flex", gap: "2rem", marginBottom: "4rem" }}>
              {product.specs.slice(0, 2).map((spec, i) => (
                <div key={i} style={{ borderLeft: "1px solid var(--color-line)", paddingLeft: "1.5rem" }}>
                  <span style={{ display: "block", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(87,83,78,0.6)", marginBottom: "0.25rem" }}>Performance</span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--color-primary)" }}>{spec}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
              <Link 
                href="/quote" 
                style={{ 
                  padding: "1.25rem 3rem", 
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
                Inquire About This Model
              </Link>
              <span style={{ 
                padding: "1.25rem 0", 
                fontSize: "1.25rem", 
                color: "var(--color-primary)", 
                fontWeight: 500,
                marginLeft: "auto"
              }}>
                {product.price}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Specs Section */}
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
            {/* Tech Table */}
            <div className="reveal-fade">
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "2rem", 
                fontWeight: 300, 
                color: "var(--color-primary)",
                marginBottom: "3rem"
              }}>
                Technical Specifications.
              </h2>
              <div style={{ borderTop: "1px solid var(--color-line)" }}>
                {product.detailedSpecs.map((spec, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      padding: "1.5rem 0", 
                      borderBottom: "1px solid var(--color-line)",
                      fontSize: "0.9375rem"
                    }}
                  >
                    <span style={{ color: "var(--color-secondary)", fontWeight: 300 }}>{spec.label}</span>
                    <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="reveal-fade" style={{ paddingTop: "2rem" }}>
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
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1.5rem" }}>
                  {product.applications.map((app, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--color-secondary)", fontSize: "1rem", fontWeight: 300 }}>
                      <Icon icon="lucide:check" width="18" style={{ color: "var(--color-primary)" }} />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: "4rem", display: "grid", gap: "1.5rem" }}>
                <span style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(87,83,78,0.6)" }}>Reliability Standards</span>
                <p style={{ fontSize: "0.875rem", color: "var(--color-secondary)", fontWeight: 300, lineHeight: 1.6 }}>
                  All components in the {product.name} series undergo our rigorous 12-point quality testing cycle, including high-pressure endurance and motor winding integrity checks.
                </p>
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
