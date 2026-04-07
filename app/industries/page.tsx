"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";

const industries = [
  {
    id: "agricultural",
    title: "Agricultural Sector",
    icon: "lucide:sprout",
    description: "Empowering farmers with reliable water supply for crop irrigation, livestock watering, and post-harvest processing. Our solar and submersible solutions thrive in off-grid environments.",
    benefits: [
      "Precision Irrigation Control",
      "Solar-Powered Off-Grid Capability",
      "Livestock Water Management",
      "Increased Crop Yield Reliability"
    ],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
    link: "/products#solar"
  },
  {
    id: "industrial",
    title: "Industrial & Manufacturing",
    icon: "lucide:factory",
    description: "High-volume water solutions for industrial cooling, process water handling, and fire safety. Engineered for continuous operation in demanding factory environments.",
    benefits: [
      "Process Cooling Systems",
      "Effluent & Wastewater Handling",
      "High-Pressure Wash Systems",
      "Fire Suppression Networks"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    link: "/products#industrial"
  },
  {
    id: "municipal",
    title: "Municipal & Utility",
    icon: "lucide:building-2",
    description: "Partnering with regional authorities to deliver consistent water supply to urban and rural communities. Our systems are built for scale and long-term infrastructure reliability.",
    benefits: [
      "Community Water Distribution",
      "Main Pumping Stations",
      "Borehole Network Management",
      "Energy-Efficient Upgrades"
    ],
    image: "https://images.unsplash.com/photo-1541888941294-118889412942?w=1200&q=80",
    link: "/products#submersible"
  },
  {
    id: "construction",
    title: "Construction & Dewatering",
    icon: "lucide:hard-hat",
    description: "Rapid water removal and site management solutions for construction projects. Portable, durable centrifugal pumps designed for heavy-duty site maintenance.",
    benefits: [
      "Site Excavation Dewatering",
      "Temporary Water Supply",
      "Concrete Batching Water",
      "Erosion Control Support"
    ],
    image: "https://images.unsplash.com/photo-1541888941294-118889412942?w=1200&q=80",
    link: "/products#industrial"
  }
];

export default function IndustriesPage() {
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
          backgroundColor: "#003366",
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
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&q=80"
          alt="Industrial water solutions"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
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
            Sectors We Serve
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
            Engineering for Every <br /> Industrial Demand.
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
            Specialized water pumping solutions tailored to the unique economic drivers of the East African region.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section style={{ padding: "8rem 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
          
          <div style={{ display: "grid", gap: "10rem" }}>
            {industries.map((ind, idx) => (
              <div 
                key={ind.id} 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: idx % 2 === 0 ? "1.2fr 1fr" : "1fr 1.2fr",
                  gap: "6rem",
                  alignItems: "center"
                }}
                className="reveal-fade"
              >
                {idx % 2 !== 0 && (
                  <div style={{ 
                    aspectRatio: "4/3", 
                    overflow: "hidden", 
                    borderRadius: "2px",
                    border: "1px solid var(--color-line)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.05)"
                  }}>
                    <img src={ind.image} alt={ind.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                
                <div>
                  <div style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "1rem", 
                    color: "var(--color-accent)",
                    marginBottom: "1.5rem" 
                  }}>
                    <Icon icon={ind.icon} width="24" />
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 500 }}>
                      0{idx + 1} — Sector
                    </span>
                  </div>
                  <h2 style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 300,
                    color: "var(--color-primary)",
                    letterSpacing: "-0.02em",
                    marginBottom: "2rem"
                  }}>
                    {ind.title}
                  </h2>
                  <p style={{ 
                    fontSize: "1.125rem", 
                    color: "var(--color-secondary)", 
                    fontWeight: 300, 
                    lineHeight: 1.75, 
                    marginBottom: "3rem" 
                  }}>
                    {ind.description}
                  </p>
                  
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 3rem 0", display: "grid", gap: "1.25rem" }}>
                    {ind.benefits.map((benefit, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.9375rem", color: "var(--color-primary)", fontWeight: 400 }}>
                        <Icon icon="lucide:check" style={{ color: "var(--color-accent)" }} />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={ind.link}
                    style={{ 
                      display: "inline-block",
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
                  >
                    View Relevant Solutions
                  </Link>
                </div>

                {idx % 2 === 0 && (
                  <div style={{ 
                    aspectRatio: "4/3", 
                    overflow: "hidden", 
                    borderRadius: "2px",
                    border: "1px solid var(--color-line)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.05)"
                  }}>
                    <img src={ind.image} alt={ind.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Call to Action */}
      <section style={{ padding: "8rem 0", backgroundColor: "#003366" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "0 2rem" }}>
           <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "white",
            marginBottom: "2rem",
            lineHeight: 1.15
          }}>
            Technical expertise for your specific sector.
          </h2>
          <p style={{ 
            color: "rgba(255,255,255,0.7)", 
            fontSize: "1.125rem", 
            fontWeight: 300, 
            marginBottom: "3rem",
            lineHeight: 1.6
          }}>
            Download our industry-specific capability statements or request a technical site visit from our regional engineering hub.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
            <Link 
              href="/contact"
              style={{ 
                padding: "1.25rem 3rem", 
                backgroundColor: "var(--color-accent)", 
                color: "white", 
                fontSize: "0.625rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.2em",
                borderRadius: "2px",
                textDecoration: "none",
                fontWeight: 500
              }}
            >
              Request Site Visit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
