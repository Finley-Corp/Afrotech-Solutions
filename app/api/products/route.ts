import { NextResponse } from "next/server";
import { fetchProductsPage } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "48");
    const brand = searchParams.get("brand");
    const search = searchParams.get("q") ?? searchParams.get("search");

    const result = await fetchProductsPage({ page, limit, brand, search });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Error in products API:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
