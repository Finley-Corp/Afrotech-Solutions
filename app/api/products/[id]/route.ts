import { NextResponse } from "next/server";
import { neonQuery } from "../../../../lib/neon-db";

export async function GET(
  request: Request,
  context: any
) {
  try {
    const params = await context.params;
    const id = params?.id;
    
    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    const rows = await neonQuery<any>(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const row = rows[0];
    const specsObj = row.specs || {};
    const specsList = Object.entries(specsObj).map(
      ([k, v]) => `${k.replace(/_/g, " ").toUpperCase()}: ${v}`
    );
    const detailedSpecs = Object.entries(specsObj).map(([k, v]) => ({
      label: k.replace(/_/g, " "),
      value: String(v),
    }));

    const mappedProduct = {
      id: String(row.id),
      name: row.name,
      category: row.brand.toUpperCase(),
      category_id: row.brand.toLowerCase(),
      short_desc: row.description
        ? row.description.substring(0, 150) + "..."
        : "No description available.",
      full_desc: row.description || "No description available.",
      price: "Contact for Quote",
      main_img: row.image_url || "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80",
      specs: specsList,
      detailed_specs: detailedSpecs,
      applications: ["Water Distribution", "Industrial Supply", "Pressure Boosting"],
    };

    return NextResponse.json(mappedProduct);
  } catch (error: any) {
    console.error("Error in Next.js single product API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}
