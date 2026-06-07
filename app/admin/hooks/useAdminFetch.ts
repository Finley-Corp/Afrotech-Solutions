"use client";

import { useCallback, useEffect, useState } from "react";

const CACHE_TTL_MS = 60_000;

function readCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, at } = JSON.parse(raw) as { data: T; at: number };
    if (Date.now() - at > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, at: Date.now() }));
  } catch {
    /* quota */
  }
}

type UseAdminFetchOptions<T> = {
  cacheKey: string;
  select: (json: unknown) => T;
};

export function useAdminFetch<T>(url: string, { cacheKey, select }: UseAdminFetchOptions<T>) {
  const [data, setData] = useState<T | null>(() => readCache<T>(cacheKey));
  const [loading, setLoading] = useState(() => readCache<T>(cacheKey) === null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);

    try {
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 401) {
        window.dispatchEvent(new Event("afrotech-admin-unauthorized"));
        throw new Error("Session expired. Please sign in again.");
      }
      if (!res.ok) throw new Error("Failed to load data");

      const json = await res.json();
      const next = select(json);
      setData(next);
      writeCache(cacheKey, next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [url, cacheKey, select]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
}
