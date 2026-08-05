"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import type { ProductListItem } from "@/lib/products-db";
import { productDetailPath } from "@/lib/product-slug";

type ProductsApiResult = {
  items: ProductListItem[];
};

export default function PumpFinderBar() {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductListItem[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    async function fetchSuggestions() {
      try {
        const params = new URLSearchParams({
          page: "1",
          limit: "8",
          q: debouncedQuery,
        });
        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) return;
        const data: ProductsApiResult = await res.json();
        if (!cancelled) {
          setSuggestions(data.items);
          setActiveIndex(-1);
        }
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSuggestions();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const submitSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      setOpen(false);
      router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    },
    [router],
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        router.push(productDetailPath(suggestions[activeIndex].slug));
        setOpen(false);
      } else {
        submitSearch(query);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const showDropdown = open && debouncedQuery.length > 0;

  return (
    <section
      className="premium-landing-section pump-finder-section"
      aria-label="Pump finder"
    >
      <div className="pump-finder-wrap">
        <p className="pump-finder__label">Find the right pump</p>
        <div className="pump-finder" ref={wrapRef}>
          <form
            className="pump-finder__form"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch(query);
            }}
          >
            <Icon icon="lucide:search" width={18} className="pump-finder__icon" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
              placeholder="Search by pump model, brand, or application (e.g. 'submersible borehole pump')"
              className="pump-finder__input"
              aria-label="Search pumps"
              aria-autocomplete="list"
              aria-controls={showDropdown ? listId : undefined}
              aria-expanded={showDropdown}
            />
            <button type="submit" className="pump-finder__submit">
              Search
            </button>
          </form>

          {showDropdown && (
            <ul id={listId} className="pump-finder__dropdown" role="listbox">
              {loading && (
                <li className="pump-finder__dropdown-empty" role="presentation">
                  Searching catalogue…
                </li>
              )}
              {!loading && suggestions.length === 0 && (
                <li className="pump-finder__dropdown-empty" role="presentation">
                  No matches — press Enter to search the full catalogue.
                </li>
              )}
              {!loading &&
                suggestions.map((item, index) => (
                  <li key={item.id} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={index === activeIndex}
                      className={`pump-finder__option${index === activeIndex ? " is-active" : ""}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => {
                        router.push(productDetailPath(item.slug));
                        setOpen(false);
                      }}
                    >
                      <span className="pump-finder__option-brand">{item.category}</span>
                      <span className="pump-finder__option-name">{item.name}</span>
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
