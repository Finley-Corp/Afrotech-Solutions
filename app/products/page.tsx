"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";

const productCategories = [
  {
    category: "Submersible Pumps",
    id: "submersible",
    description: "High-pressure borehole and well pumps engineered for industrial and agricultural water supply.",
    products: [
      {
        name: "AquaMax 3000",
        specs: ["80m Max Head", "3 HP Motor", "5 m³/hr"],
        price: "From $850",
        desc: "Ideal for deep boreholes and wells. Stainless steel impeller, auto dry-run protection.",
        img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
      },
      {
        name: "AquaMax 5000",
        specs: ["120m Max Head", "5.5 HP Motor", "10 m³/hr"],
        price: "From $1,450",
        desc: "Heavy-duty borehole pump for large-scale agricultural irrigation.",
        img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
      },
    ],
  },
  {
    category: "Solar Pumping Systems",
    id: "solar",
    description: "Sustainable, off-grid water solutions for remote locations and rural communities.",
    products: [
      {
        name: "SolarFlow Pro",
        specs: ["60m Max Head", "Solar-Powered", "3 m³/hr"],
        price: "From $1,200",
        desc: "Complete solar borehole kit. High efficiency, low maintenance for remote farms.",
        img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
      },
      {
        name: "SolarFlow Hybrid",
        specs: ["45m Max Head", "Dual Power (AC/DC)", "8 m³/hr"],
        price: "From $1,850",
        desc: "Connects to solar and grid power. Seamless power switching for reliability.",
        img: "https://images.unsplash.com/photo-1542336391-ae2936d8efe4?w=800&q=80",
      },
    ],
  },
  {
    category: "Industrial Centrifugal",
    id: "industrial",
    description: "High-volume pumps for industrial process, municipal supply, and construction dewatering.",
    products: [
      {
        name: "TurboFlow Industrial",
        specs: ["40m Max Head", "7.5 HP Motor", "30 m³/hr"],
        price: "From $2,100",
        desc: "Heavy-duty surface pump for municipal water networks and construction sites.",
        img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      },
      {
        name: "TurboFlow Max",
        specs: ["55m Max Head", "15 HP Motor", "65 m³/hr"],
        price: "From $3,800",
        desc: "Ultra-high volume pumping for large-scale industrial cooling and supply.",
        img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
      },
    ],
  },
];

export default function ProductsPage() {
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
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
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
                    key={p.name}
                    className="residence-card"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ 
                      aspectRatio: "4/5", 
                      overflow: "hidden", 
                      borderRadius: "2px", 
                      border: "1px solid var(--color-line)",
                      marginBottom: "1.5rem",
                      position: "relative"
                    }}>
                      <img 
                        src={p.img} 
                        alt={p.name} 
                        className="residence-img"
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      />
                    </div>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
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
                      <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-primary)" }}>
                        {p.price}
                      </span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      gap: "0.75rem", 
                      fontSize: "0.75rem", 
                      color: "rgba(87,83,78,0.7)", 
                      marginBottom: "1rem"
                    }}>
                      {p.specs.map((s, i) => (
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
                      {p.desc}
                    </p>
                    <Link 
                      href="/quote"
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
                      Get Technical Quote
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
                backgroundColor: "var(--color-primary)",
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
