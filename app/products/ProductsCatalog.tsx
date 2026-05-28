"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { BrandCounts, ProductListItem, ProductsPageResult } from "@/lib/products-db";
import { productDetailPath } from "@/lib/product-slug";

const BRANDS = [
  { id: "all", label: "All Brands" },
  { id: "grundfos", label: "Grundfos" },
  { id: "ksb", label: "KSB" },
  { id: "wilo", label: "Wilo" },
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

const PAGE_SIZE = 48;

function BrandBadge({ brand }: { brand: string }) {
  const color = BRAND_COLOR[brand.toLowerCase()] ?? "#003366";
  const bg = BRAND_BG[brand.toLowerCase()] ?? "#E8EDF5";
  return (
    <span className="pc-brand-badge" style={{ color, background: bg }}>
      {brand.toUpperCase()}
    </span>
  );
}

function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <article className="pc-card">
      <Link href={productDetailPath(product.slug)} className="pc-card__media" tabIndex={-1} aria-hidden>
        <div className="pc-card__img-wrap">
          <Image
            src={product.main_img}
            alt={product.name}
            className="pc-card__img"
            width={480}
            height={360}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <span className="pc-card__zoom-hint" aria-hidden>
          <Icon icon="solar:arrow-right-up-linear" width={16} />
        </span>
      </Link>

      <div className="pc-card__body">
        <div className="pc-card__meta-row">
          <BrandBadge brand={product.category_id} />
        </div>

        <Link href={productDetailPath(product.slug)} className="pc-card__name">
          {product.name}
        </Link>

        <p className="pc-card__desc">{product.short_desc}</p>

        <div className="pc-card__footer">
          <span className="pc-card__price">{product.price}</span>
          <Link href={productDetailPath(product.slug)} className="pc-card__cta">
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

type Props = {
  initial: ProductsPageResult;
  brandCounts: BrandCounts;
};

export default function ProductsCatalog({ initial, brandCounts }: Props) {
  const [products, setProducts] = useState<ProductListItem[]>(initial.items);
  const [total, setTotal] = useState(initial.total);
  const [page, setPage] = useState(initial.page);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const skipFilterFetchRef = useRef(true);
  const loadingMoreLockRef = useRef(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(t);
  }, [search]);

  const hasMore = products.length < total;

  const fetchPage = useCallback(
    async (pageNum: number, replace: boolean) => {
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: String(PAGE_SIZE),
      });
      if (activeBrand !== "all") params.set("brand", activeBrand);
      if (debouncedSearch) params.set("q", debouncedSearch);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load products");
      const data: ProductsPageResult = await res.json();

      setTotal(data.total);
      setPage(data.page);
      setProducts((prev) => (replace ? data.items : [...prev, ...data.items]));
    },
    [activeBrand, debouncedSearch],
  );

  useEffect(() => {
    if (skipFilterFetchRef.current) {
      skipFilterFetchRef.current = false;
      return;
    }

    let cancelled = false;
    async function reload() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: "1", limit: String(PAGE_SIZE) });
        if (activeBrand !== "all") params.set("brand", activeBrand);
        if (debouncedSearch) params.set("q", debouncedSearch);
        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) return;
        const data: ProductsPageResult = await res.json();
        if (cancelled) return;
        setProducts(data.items);
        setTotal(data.total);
        setPage(1);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    reload();
    return () => {
      cancelled = true;
    };
  }, [activeBrand, debouncedSearch]);

  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loadingMoreLockRef.current) return;
        loadingMoreLockRef.current = true;
        setLoadingMore(true);
        fetchPage(page + 1, false)
          .catch((err) => console.error(err))
          .finally(() => {
            loadingMoreLockRef.current = false;
            setLoadingMore(false);
          });
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchPage, hasMore, loading, loadingMore, page]);

  const displayTotal = total;
  const displayProducts = loading ? [] : products;
  const isEmpty = !loading && displayProducts.length === 0;

  return (
    <>
      <section className="pc-hero">
        <div className="pc-hero__inner">
          <div className="pc-hero__eyebrow">
            <span className="pc-hero__dot" />
            Industrial Pump Catalogue
          </div>
          <h1 className="pc-hero__title">
            Precision-Engineered
            <br />
            <span className="pc-hero__title-muted">Pumping Solutions</span>
          </h1>
          <p className="pc-hero__subtitle">
            World-class pumps from Grundfos, KSB &amp; Wilo — sourced, specified and delivered across East Africa.
          </p>
        </div>

        <div className="pc-hero__stats">
          <div className="pc-hero__stat">
            <span className="pc-hero__stat-num">{displayTotal || "—"}</span>
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

      <div className="pc-layout">
        <aside className="pc-sidebar">
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

          <div className="pc-sidebar__section">
            <h2 className="pc-sidebar__heading">
              <Icon icon="solar:layers-minimalistic-linear" width={14} />
              Brand
            </h2>
            <nav className="pc-brand-list" aria-label="Filter by brand">
              {BRANDS.map((b) => {
                const count =
                  b.id === "all" ? brandCounts.all ?? displayTotal : brandCounts[b.id] ?? 0;
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={`pc-brand-btn${activeBrand === b.id ? " is-active" : ""}`}
                    onClick={() => setActiveBrand(b.id)}
                  >
                    <span className="pc-brand-btn__label">{b.label}</span>
                    {!loading && <span className="pc-brand-btn__count">{count}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pc-sidebar__divider" />

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

        <div className="pc-content">
          <div className="pc-toolbar">
            <p className="pc-toolbar__count">
              {loading ? (
                <span className="pc-toolbar__count-loading">Loading…</span>
              ) : (
                <>
                  Showing <strong>{displayProducts.length}</strong> of <strong>{displayTotal}</strong>{" "}
                  {displayTotal === 1 ? "product" : "products"}
                  {activeBrand !== "all" && (
                    <>
                      {" "}
                      · <span style={{ textTransform: "capitalize" }}>{activeBrand}</span>
                    </>
                  )}
                </>
              )}
            </p>

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

          {loading ? (
            <div className="pc-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isEmpty ? (
            <div className="pc-empty">
              <Icon icon="solar:magnifer-broken" width={40} className="pc-empty__icon" />
              <p className="pc-empty__title">No products found</p>
              <p className="pc-empty__sub">Try a different brand filter or search term.</p>
              <button
                type="button"
                className="pc-empty__reset"
                onClick={() => {
                  setSearch("");
                  setActiveBrand("all");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="pc-grid">
                {displayProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {hasMore && (
                <div ref={loadMoreRef} className="pc-load-more" aria-hidden={!hasMore}>
                  {loadingMore ? (
                    <span className="pc-load-more__label">Loading more products…</span>
                  ) : (
                    <span className="pc-load-more__label">Scroll for more</span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
