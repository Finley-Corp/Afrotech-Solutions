import { NextResponse } from "next/server";
import { getCachedProductNames } from "@/lib/products-db";

export async function GET() {
  try {
    const names = await getCachedProductNames();
    return NextResponse.json({ names }, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=900",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch product names";
    console.error("Error in product names API:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
