"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { type ProductDbRow } from "../data/products";

const BRANDS = [
  { id: "all", label: "All Brands", count: null },
  { id: "grundfos", label: "Grundfos", count: null },
  { id: "ksb", label: "KSB", count: null },
  { id: "wilo", label: "Wilo", count: null },
] as const;

const BRAND_COLOR: Record<string, string> = {
  grundfos: "#00526E",
  ksb: "#C8102E",
  wilo: "#002D62",
};

const BRAND_BG: Record<string, string> = {
  grundfos: "#E6F3F6",
  ksb: "#FCE9EC",
  wilo: "#E6EBF4",
};

function BrandBadge({ brand }: { brand: string }) {
  const color = BRAND_COLOR[brand.toLowerCase()] ?? "#003366";
  const bg = BRAND_BG[brand.toLowerCase()] ?? "#E8EDF5";
  return (
    <span
      className="pc-brand-badge"
      style={{ color, background: bg }}
    >
      {brand.toUpperCase()}
    </span>
  );
}

function SpecChip({ label }: { label: string }) {
  return <span className="pc-spec-chip">{label}</span>;
}

function ProductCard({ product }: { product: ProductDbRow }) {
  const specs = product.detailed_specs?.slice(0, 2) ?? [];

  return (
    <article className="pc-card">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="pc-card__media" tabIndex={-1} aria-hidden>
        <div className="pc-card__img-wrap">
          <img
            src={product.main_img}
            alt={product.name}
            className="pc-card__img"
            loading="lazy"
          />
        </div>
        <span className="pc-card__zoom-hint" aria-hidden>
          <Icon icon="solar:arrow-right-up-linear" width={16} />
        </span>
      </Link>

      {/* Body */}
      <div className="pc-card__body">
        <div className="pc-card__meta-row">
          <BrandBadge brand={product.category_id} />
          {specs.length > 0 && (
            <SpecChip label={`${specs[0].label}: ${specs[0].value}`} />
          )}
        </div>

        <Link href={`/products/${product.id}`} className="pc-card__name">
          {product.name}
        </Link>

        <p className="pc-card__desc">{product.short_desc}</p>

        <div className="pc-card__footer">
          <span className="pc-card__price">{product.price}</span>
          <Link href={`/products/${product.id}`} className="pc-card__cta">
            Details
            <Icon icon="solar:arrow-right-linear" width={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="pc-skeleton">
      <div className="pc-skeleton__img" />
      <div className="pc-skeleton__body">
        <div className="pc-skeleton__line pc-skeleton__line--short" />
        <div className="pc-skeleton__line" />
        <div className="pc-skeleton__line pc-skeleton__line--medium" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeBrand, setActiveBrand] = useState<string>("all");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products from Neon database");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // compute per-brand counts
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      const b = p.category_id?.toLowerCase() ?? "unknown";
      counts[b] = (counts[b] ?? 0) + 1;
    }
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesBrand =
        activeBrand === "all" || p.category_id?.toLowerCase() === activeBrand;
      if (!matchesBrand) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.short_desc.toLowerCase().includes(q)
      );
    });
  }, [products, search, activeBrand]);

  return (
    <main className="pc-page">
      <Navbar />

      {/* ── Hero Banner ────────────────────────────────────── */}
      <section className="pc-hero">
        <div className="pc-hero__inner">
          <div className="pc-hero__eyebrow">
            <span className="pc-hero__dot" />
            Industrial Pump Catalogue
          </div>
          <h1 className="pc-hero__title">
            Precision-Engineered<br />
            <span className="pc-hero__title-muted">Pumping Solutions</span>
          </h1>
          <p className="pc-hero__subtitle">
            World-class pumps from Grundfos, KSB &amp; Wilo — sourced, specified and delivered across East Africa.
          </p>
        </div>

        {/* Stats bar */}
        <div className="pc-hero__stats">
          <div className="pc-hero__stat">
            <span className="pc-hero__stat-num">{products.length || "—"}</span>
            <span className="pc-hero__stat-label">Products</span>
          </div>
          <div className="pc-hero__stat-divider" />
          <div className="pc-hero__stat">
            <span className="pc-hero__stat-num">3</span>
            <span className="pc-hero__stat-label">Top Brands</span>
          </div>
          <div className="pc-hero__stat-divider" />
          <div className="pc-hero__stat">
            <span className="pc-hero__stat-num">EA</span>
            <span className="pc-hero__stat-label">Coverage</span>
          </div>
          <div className="pc-hero__cta-wrap">
            <Link href="/quote" className="pc-hero__quote-btn">
              Request a Quote
              <Icon icon="solar:arrow-right-linear" width={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Layout: Sidebar + Grid ──────────────────────── */}
      <div className="pc-layout">

        {/* Sidebar */}
        <aside className="pc-sidebar">
          {/* Search */}
          <div className="pc-sidebar__section">
            <label className="pc-search-wrap" htmlFor="product-search">
              <Icon icon="lucide:search" width={16} className="pc-search-icon" />
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="pc-search-input"
              />
            </label>
          </div>

          <div className="pc-sidebar__divider" />

          {/* Brand filter */}
          <div className="pc-sidebar__section">
            <h2 className="pc-sidebar__heading">
              <Icon icon="solar:layers-minimalistic-linear" width={14} />
              Brand
            </h2>
            <nav className="pc-brand-list" aria-label="Filter by brand">
              {BRANDS.map((b) => {
                const count =
                  b.id === "all"
                    ? products.length
                    : brandCounts[b.id] ?? 0;
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={`pc-brand-btn${activeBrand === b.id ? " is-active" : ""}`}
                    onClick={() => setActiveBrand(b.id)}
                  >
                    <span className="pc-brand-btn__label">{b.label}</span>
                    {!loading && (
                      <span className="pc-brand-btn__count">{count}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pc-sidebar__divider" />

          {/* CTA card */}
          <div className="pc-sidebar__cta-card">
            <Icon icon="solar:document-text-linear" width={20} className="pc-sidebar__cta-icon" />
            <h3 className="pc-sidebar__cta-title">Need a custom spec?</h3>
            <p className="pc-sidebar__cta-text">
              Our engineers will select the optimal pump for your application.
            </p>
            <Link href="/quote" className="pc-sidebar__cta-btn">
              Get Expert Advice
            </Link>
          </div>
        </aside>

        {/* Grid area */}
        <div className="pc-content">

          {/* Toolbar */}
          <div className="pc-toolbar">
            <p className="pc-toolbar__count">
              {loading ? (
                <span className="pc-toolbar__count-loading">Loading…</span>
              ) : (
                <>
                  Showing <strong>{filteredProducts.length}</strong>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                  {activeBrand !== "all" && (
                    <> · <span style={{ textTransform: "capitalize" }}>{activeBrand}</span></>
                  )}
                </>
              )}
            </p>

            {/* Inline brand tabs (mobile) */}
            <nav className="pc-mobile-tabs" aria-label="Filter by brand">
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`pc-mobile-tab${activeBrand === b.id ? " is-active" : ""}`}
                  onClick={() => setActiveBrand(b.id)}
                >
                  {b.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Product grid */}
          {loading ? (
            <div className="pc-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="pc-empty">
              <Icon icon="solar:magnifer-broken" width={40} className="pc-empty__icon" />
              <p className="pc-empty__title">No products found</p>
              <p className="pc-empty__sub">
                Try a different brand filter or search term.
              </p>
              <button
                type="button"
                className="pc-empty__reset"
                onClick={() => { setSearch(""); setActiveBrand("all"); }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="pc-grid">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
