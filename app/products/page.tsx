"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { supabase } from "../lib/supabase";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const productCategories = [
    {
      category: "Submersible Pumps",
      id: "submersible",
      description: "High-pressure borehole and well pumps engineered for industrial and agricultural water supply.",
      products: products.filter(p => p.category_id === "submersible"),
    },
    {
      category: "Solar Pumping Systems",
      id: "solar",
      description: "Sustainable, off-grid water solutions for remote locations and rural communities.",
      products: products.filter(p => p.category_id === "solar"),
    },
    {
      category: "Industrial Centrifugal",
      id: "industrial",
      description: "High-volume pumps for industrial process, municipal supply, and construction dewatering.",
      products: products.filter(p => p.category_id === "industrial"),
    },
  ];

  if (loading) {
    return (
      <main style={{ backgroundColor: "var(--color-background)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon icon="lucide:loader-2" className="animate-spin" width="32" color="var(--color-primary)" />
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "450px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-primary)",
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/images/water%20pump-1.jpg"
          alt="Afrotech Product Catalog"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4,
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
            Engineering Excellence
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
            Our Product Range
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
            Industrial-grade water solutions tested for the demanding conditions of East Africa. From borehole submersibles to high-volume solar systems.
          </p>
        </div>
      </section>

      {/* Categories Content */}
      <section style={{ paddingTop: "6rem", paddingBottom: "10rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
          
          {productCategories.map((cat, catIdx) => (
            <div 
              key={cat.id} 
              id={cat.id}
              style={{ 
                marginBottom: catIdx !== productCategories.length - 1 ? "10rem" : "0",
              }}
            >
              {/* Category Header */}
              <div 
                className="reveal-fade"
                style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  justifyContent: "space-between", 
                  alignItems: "flex-end",
                  borderBottom: "1px solid var(--color-line)",
                  paddingBottom: "2rem",
                  marginBottom: "4rem",
                  gap: "2rem"
                }}
              >
                <div style={{ maxWidth: "32rem" }}>
                  <span style={{ 
                    display: "block", 
                    fontSize: "0.625rem", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.15em", 
                    color: "var(--color-secondary)",
                    marginBottom: "1rem"
                  }}>
                    0{catIdx + 1} — {cat.category}
                  </span>
                  <h2 style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    fontWeight: 300,
                    color: "var(--color-primary)",
                    letterSpacing: "-0.02em"
                  }}>
                    {cat.category}
                  </h2>
                </div>
                <p style={{ 
                  maxWidth: "24rem", 
                  color: "var(--color-secondary)", 
                  fontSize: "0.9375rem", 
                  fontWeight: 300,
                  lineHeight: 1.6
                }}>
                  {cat.description}
                </p>
              </div>

              {/* Product Grid */}
              <div 
                data-anim="stagger"
                className="product-grid-4"
              >
                {cat.products.map((p) => (
                  <div 
                    key={p.id}
                    className="residence-card"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                      <div style={{ 
                        aspectRatio: "4/5", 
                        overflow: "hidden", 
                        borderRadius: "2px", 
                        border: "1px solid var(--color-line)",
                        marginBottom: "1.5rem",
                        position: "relative"
                      }}>
                        <img 
                          src={p.main_img} 
                          alt={p.name} 
                          className="residence-img"
                          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                        />
                      </div>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "flex-start", 
                        alignItems: "baseline",
                        marginBottom: "0.5rem"
                      }}>
                        <h3 style={{ 
                          fontFamily: "'Playfair Display', serif", 
                          fontSize: "1.5rem", 
                          fontWeight: 300,
                          color: "var(--color-primary)"
                        }}>
                          {p.name}
                        </h3>
                      </div>
                    </Link>
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap",
                      gap: "0.75rem", 
                      fontSize: "0.75rem", 
                      color: "rgba(87,83,78,0.7)", 
                      marginBottom: "1rem"
                    }}>
                      {(p.specs || []).map((s: string, i: number) => (
                        <span key={i}>
                          {s}{i !== p.specs.length - 1 && " • "}
                        </span>
                      ))}
                    </div>
                    <p style={{ 
                      fontSize: "0.875rem", 
                      color: "var(--color-secondary)", 
                      fontWeight: 300, 
                      lineHeight: 1.6,
                      marginBottom: "1.5rem"
                    }}>
                      {p.short_desc}
                    </p>
                    <Link 
                      href={`/products/${p.id}`}
                      style={{ 
                        fontSize: "0.625rem", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.15em", 
                        fontWeight: 500,
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--color-primary)",
                        paddingBottom: "0.25rem",
                        display: "inline-block",
                        width: "fit-content",
                        transition: "opacity 0.3s"
                      }}
                      className="product-cta"
                    >
                      View Full Specifications
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Technical Consulting CTA */}
          <div 
            className="reveal-fade"
            style={{ 
              marginTop: "10rem", 
              padding: "5rem 3rem", 
              backgroundColor: "white", 
              textAlign: "center",
              border: "1px solid var(--color-line)",
              borderRadius: "2px"
            }}
          >
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 300,
              color: "var(--color-primary)",
              marginBottom: "1.5rem"
            }}>
              Unsure which pump you need?
            </h2>
            <p style={{ 
              color: "var(--color-secondary)", 
              fontSize: "1rem", 
              fontWeight: 300, 
              maxWidth: "32rem", 
              margin: "0 auto 2.5rem",
              lineHeight: 1.6
            }}>
              Our technical advisors provide full assessment of your borehole depth, flow requirements, and site conditions.
            </p>
            <Link 
              href="/contact"
              style={{ 
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2.5rem",
                backgroundColor: "var(--color-accent)",
                color: "white",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                borderRadius: "2px",
                textDecoration: "none",
                fontWeight: 500,
                transition: "opacity 0.3s"
              }}
              className="consult-btn"
            >
              Consult an Advisor
            </Link>
          </div>

        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
