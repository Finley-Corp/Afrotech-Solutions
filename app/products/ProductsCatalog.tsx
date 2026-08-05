"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import type { BrandCounts, ProductListItem, ProductsPageResult } from "@/lib/products-db";
import { productDetailPath } from "@/lib/product-slug";
import { PUMP_TYPES, PRODUCT_APPLICATIONS } from "@/lib/product-metadata";
import AddToQuoteButton from "../components/AddToQuoteButton";

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
          <div className="pc-card__actions">
            <AddToQuoteButton
              id={product.id}
              slug={product.slug}
              name={product.name}
              brand={product.category}
            />
            <Link href={productDetailPath(product.slug)} className="pc-card__cta">
              Details
              <Icon icon="solar:arrow-right-linear" width={14} />
            </Link>
          </div>
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
  return (
    <Suspense fallback={<ProductsCatalogFallback initial={initial} />}>
      <ProductsCatalogInner initial={initial} brandCounts={brandCounts} />
    </Suspense>
  );
}

function ProductsCatalogFallback({ initial }: { initial: ProductsPageResult }) {
  return (
    <div className="pc-layout">
      <div className="pc-content">
        <div className="pc-grid">
          {initial.items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

const VALID_BRAND_IDS = new Set<string>(BRANDS.map((b) => b.id));

function ProductsCatalogInner({ initial, brandCounts }: Props) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const brandFromUrl = searchParams.get("brand")?.toLowerCase() ?? "";
  const initialBrand = VALID_BRAND_IDS.has(brandFromUrl) ? brandFromUrl : "all";
  const pumpTypeFromUrl = searchParams.get("pumpType") ?? "";
  const applicationFromUrl = searchParams.get("application") ?? "";
  const initialPumpType = PUMP_TYPES.some((t) => t.id === pumpTypeFromUrl) ? pumpTypeFromUrl : "";
  const initialApplication = PRODUCT_APPLICATIONS.some((a) => a.id === applicationFromUrl)
    ? applicationFromUrl
    : "";
  const [products, setProducts] = useState<ProductListItem[]>(initial.items);
  const [total, setTotal] = useState(initial.total);
  const [page, setPage] = useState(initial.page);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState(initialQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(initialQuery.trim());
  const [activeBrand, setActiveBrand] = useState(initialBrand);
  const [activePumpType, setActivePumpType] = useState(initialPumpType);
  const [activeApplication, setActiveApplication] = useState(initialApplication);
  const mountedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(search.trim()), 200);
    return () => window.clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedSearch) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }
    if (activeBrand !== "all") {
      params.set("brand", activeBrand);
    } else {
      params.delete("brand");
    }
    if (activePumpType) {
      params.set("pumpType", activePumpType);
    } else {
      params.delete("pumpType");
    }
    if (activeApplication) {
      params.set("application", activeApplication);
    } else {
      params.delete("application");
    }
    const next = params.toString();
    const url = next ? `/products?${next}` : "/products";
    window.history.replaceState(null, "", url);
  }, [debouncedSearch, activeBrand, activePumpType, activeApplication]);

  const buildParams = useCallback(
    (pageNum: number) => {
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: String(PAGE_SIZE),
      });
      if (activeBrand !== "all") params.set("brand", activeBrand);
      if (debouncedSearch) params.set("q", debouncedSearch);
      if (activePumpType) params.set("pumpType", activePumpType);
      if (activeApplication) params.set("application", activeApplication);
      return params;
    },
    [activeBrand, debouncedSearch, activePumpType, activeApplication],
  );

  const fetchPage = useCallback(
    async (pageNum: number, replace: boolean, signal?: AbortSignal) => {
      const res = await fetch(`/api/products?${buildParams(pageNum).toString()}`, { signal });
      if (!res.ok) throw new Error("Failed to load products");
      const data: ProductsPageResult = await res.json();
      setTotal(data.total);
      setPage(data.page);
      setProducts((prev) => (replace ? data.items : [...prev, ...data.items]));
    },
    [buildParams],
  );

  useEffect(() => {
    const hasActiveFilters =
      Boolean(debouncedSearch) ||
      activeBrand !== "all" ||
      Boolean(activePumpType) ||
      Boolean(activeApplication);

    if (!mountedRef.current) {
      mountedRef.current = true;
      if (!hasActiveFilters && !initialQuery.trim()) return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    let cancelled = false;
    async function reload() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?${buildParams(1).toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to load products");
        const data: ProductsPageResult = await res.json();
        if (cancelled) return;
        setProducts(data.items);
        setTotal(data.total);
        setPage(1);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    reload();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [activeBrand, debouncedSearch, activePumpType, activeApplication, buildParams, initialQuery]);

  const hasMore = products.length < total;
  const displayProducts = products;
  const isEmpty = !loading && displayProducts.length === 0;
  const isSearching = search.trim() !== debouncedSearch || loading;

  function clearFilters() {
    setSearch("");
    setActiveBrand("all");
    setActivePumpType("");
    setActiveApplication("");
  }

  async function loadMore() {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      await fetchPage(page + 1, false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }

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
            <span className="pc-hero__stat-num">{total || "—"}</span>
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
          <div className="pc-sidebar__section pc-sidebar__section--filters">
            <h2 className="pc-sidebar__heading">
              <Icon icon="solar:layers-minimalistic-linear" width={14} />
              Brand
            </h2>
            <nav className="pc-brand-list" aria-label="Filter by brand">
              {BRANDS.map((b) => {
                const count =
                  b.id === "all" ? brandCounts.all ?? total : brandCounts[b.id] ?? 0;
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

          <div className="pc-sidebar__section">
            <h2 className="pc-sidebar__heading">
              <Icon icon="solar:settings-linear" width={14} />
              Pump type
            </h2>
            <nav className="pc-filter-list" aria-label="Filter by pump type">
              <button
                type="button"
                className={`pc-filter-btn${!activePumpType ? " is-active" : ""}`}
                onClick={() => setActivePumpType("")}
              >
                All types
              </button>
              {PUMP_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`pc-filter-btn${activePumpType === t.id ? " is-active" : ""}`}
                  onClick={() => setActivePumpType(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="pc-sidebar__divider" />

          <div className="pc-sidebar__section">
            <h2 className="pc-sidebar__heading">
              <Icon icon="solar:target-linear" width={14} />
              Application
            </h2>
            <nav className="pc-filter-list" aria-label="Filter by application">
              <button
                type="button"
                className={`pc-filter-btn${!activeApplication ? " is-active" : ""}`}
                onClick={() => setActiveApplication("")}
              >
                All applications
              </button>
              {PRODUCT_APPLICATIONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`pc-filter-btn${activeApplication === a.id ? " is-active" : ""}`}
                  onClick={() => setActiveApplication(a.id)}
                >
                  {a.label}
                </button>
              ))}
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
            <label className={`pc-toolbar__search${isSearching ? " is-searching" : ""}`} htmlFor="product-search">
              <Icon icon="lucide:search" width={16} className="pc-search-icon" aria-hidden />
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pumps by name, brand, or model…"
                className="pc-search-input"
                autoComplete="off"
              />
              {search && (
                <button
                  type="button"
                  className="pc-toolbar__search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <Icon icon="lucide:x" width={16} />
                </button>
              )}
            </label>

            <p className="pc-toolbar__count">
              {isSearching ? (
                <span className="pc-toolbar__count-loading">Searching…</span>
              ) : (
                <>
                  Showing <strong>{displayProducts.length}</strong> of <strong>{total}</strong>{" "}
                  {total === 1 ? "product" : "products"}
                  {debouncedSearch && (
                    <>
                      {" "}
                      for &ldquo;{debouncedSearch}&rdquo;
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

          {loading && displayProducts.length === 0 ? (
            <div className="pc-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isEmpty ? (
            <div className="pc-empty">
              <Icon icon="solar:magnifer-broken" width={40} className="pc-empty__icon" />
              <p className="pc-empty__title">No products found</p>
              <p className="pc-empty__sub">Try a different filter or search term.</p>
              <button type="button" className="pc-empty__reset" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className={`pc-grid${loading ? " pc-grid--loading" : ""}`}>
                {displayProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {hasMore && (
                <div className="pc-load-more">
                  <button
                    type="button"
                    className="pc-load-more__btn"
                    onClick={loadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore
                      ? "Loading more products…"
                      : `Load ${PAGE_SIZE} more (${displayProducts.length} of ${total} shown)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
