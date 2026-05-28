import { NextResponse } from "next/server";
import { getCachedProductBySlugOrId } from "@/lib/products-db";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json({ error: "Missing product slug" }, { status: 400 });
    }

    const product = await getCachedProductBySlugOrId(slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch product";
    console.error("Error in single product API:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
