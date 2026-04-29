"use client";

import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GSAPAnimations from "../../components/GSAPAnimations";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { PostgrestError } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { catalogMainImgForId, getCatalogProductRowById } from "../../data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const id = params.id as string;
      let data: Record<string, unknown> | null = null;
      let error: PostgrestError | null = null;

      if (isSupabaseConfigured) {
        const res = await supabase.from("products").select("*").eq("id", id).single();
        data = res.data as Record<string, unknown> | null;
        error = res.error;
        if (res.error && res.error.code !== "PGRST116") {
          console.error(`Error fetching product ${id}:`, res.error.message);
        }
      }

      const fallback = getCatalogProductRowById(id);
      const fromDb = data && !error ? data : null;
      const row = fromDb
        ? { ...fromDb, main_img: catalogMainImgForId(id) ?? fromDb.main_img }
        : fallback;

      if (!row) {
        if (error && error.code !== "PGRST116") {
          console.error(`Error resolving product ${id}:`, error.message);
        }
        router.push("/products");
        setLoading(false);
        return;
      }

      setProduct(row);
      setLoading(false);
    }
    fetchProduct();
  }, [params.id, router]);

  if (loading) {
    return (
      <main style={{ backgroundColor: "var(--color-background)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon icon="lucide:loader-2" className="animate-spin" width="32" color="var(--color-primary)" />
      </main>
    );
  }

  if (!product) return null;

  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      {/* Product Hero: Image + Primary Info */}
      <section style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div 
          style={{ 
            maxWidth: "1400px", 
            margin: "0 auto", 
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "5rem",
            alignItems: "center"
          }}
          className="product-detail-hero"
        >
          {/* Left: Product Image */}
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
                src={product.main_img} 
                alt={product.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          </div>

          {/* Right: Primary Info */}
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
              maxWidth: "36rem"
            }}>
              {product.full_desc}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
              <Link 
                href="/quote" 
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
                Inquire About Model
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Technical Specs & Applications (Below Hero) */}
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
            {/* Detailed Stats Table */}
            <div className="reveal-fade">
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "2rem", 
                fontWeight: 300, 
                color: "var(--color-primary)",
                marginBottom: "3rem"
              }}>
                Technical specifications.
              </h2>
              <div style={{ borderTop: "1px solid var(--color-line)" }}>
                {(product.detailed_specs || []).map((spec: any, i: number) => (
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

            {/* Application Use Cases */}
            <div className="reveal-fade" style={{ paddingTop: "2rem" }}>
              <div style={{ backgroundColor: "var(--color-background)", padding: "4rem", borderRadius: "2px" }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: "1.5rem", 
                  fontWeight: 300, 
                  color: "var(--color-primary)",
                  marginBottom: "2rem"
                }}>
                  Primary applications.
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1.5rem" }}>
                  {(product.applications || []).map((app: string, i: number) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--color-secondary)", fontSize: "1rem", fontWeight: 300 }}>
                      <Icon icon="lucide:check" width="18" style={{ color: "var(--color-primary)" }} />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: "4rem", display: "grid", gap: "1.5rem" }}>
                <span style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(87,83,78,0.6)" }}>Reliability standards</span>
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
