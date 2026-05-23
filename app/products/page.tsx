"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { productsList, toProductDbRow, type ProductDbRow } from "../data/products";

const categories = [
  { id: "all", label: "All Products" },
  { id: "domestic", label: "Domestic & Booster" },
  { id: "borehole", label: "Borehole / Submersible" },
  { id: "solar", label: "Solar Water Pumps" },
  { id: "industrial", label: "Industrial & Commercial" },
  { id: "bonus", label: "Bonus Models" },
] as const;

function catalogStats(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % 997;
  }
  return {
    stock: 180 + (hash % 420),
    sold: 60 + (hash % 280),
  };
}

function ProductCard({ product }: { product: ProductDbRow }) {
  const { stock, sold } = catalogStats(product.id);

  return (
    <article className="products-catalog__card">
      <Link href={`/products/${product.id}`} className="products-catalog__card-media">
        <div className="products-catalog__card-image-wrap">
          <img src={product.main_img} alt={product.name} className="products-catalog__card-image" />
        </div>
        <span className="products-catalog__card-action" aria-hidden>
          <Icon icon="solar:arrow-right-up-linear" width={18} />
        </span>
      </Link>
      <div className="products-catalog__card-body">
        <Link href={`/products/${product.id}`} className="products-catalog__card-title">
          {product.name}
        </Link>
        <p className="products-catalog__card-price">{product.price}</p>
        <div className="products-catalog__card-meta">
          <span>Stock: {stock}</span>
          <span>Sold: {sold}</span>
        </div>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    async function fetchProducts() {
      let fromDb: Array<{ id: string } & Record<string, unknown>> = [];

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching products:", error.message);
        }

        fromDb = Array.isArray(data) ? (data as typeof fromDb) : [];
      }

      const byId = new Map(fromDb.map((row: { id: string }) => [row.id, row]));
      const merged = productsList.map((p) => {
        const db = byId.get(p.id);
        const catalog = toProductDbRow(p);
        if (!db) return catalog;
        return { ...(db as ProductDbRow), main_img: catalog.main_img };
      });
      setProducts(merged);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category_id === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.short_desc.toLowerCase().includes(q)
      );
    });
  }, [products, search, activeCategory]);

  return (
    <main className="products-catalog-page">
      <Navbar />

      <div className="products-catalog">
        <header className="products-catalog__header">
          <h1 className="products-catalog__title">Products</h1>
          <div className="products-catalog__toolbar">
            <label className="products-catalog__search">
              <Icon icon="lucide:search" width={18} className="products-catalog__search-icon" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search product..."
                className="products-catalog__search-input"
              />
            </label>
            <Link href="/quote" className="products-catalog__cta">
              + Request Quote
            </Link>
          </div>
        </header>

        <nav className="products-catalog__filters" aria-label="Product categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`products-catalog__filter${activeCategory === cat.id ? " is-active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {loading ? (
          <div className="products-catalog__grid products-catalog__grid--loading">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="products-catalog__skeleton" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="products-catalog__empty">No products match your search. Try another category or term.</p>
        ) : (
          <div className="products-catalog__grid">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
