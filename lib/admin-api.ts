import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const CACHE_HEADER = "private, max-age=15, stale-while-revalidate=30";

export async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function adminJson<T>(data: T, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": CACHE_HEADER },
  });
}
