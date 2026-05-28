import { NextResponse } from "next/server";
import { neonQuery } from "../../../lib/neon-db";

export async function GET() {
  try {
    // Fetch products from Neon database
    const rows = await neonQuery<any>(
      "SELECT * FROM products ORDER BY scraped_at DESC"
    );

    // Map database rows to the ProductDbRow format expected by the UI
    const mappedProducts = rows.map((row) => {
      // Parse specs
      const specsObj = row.specs || {};
      const specsList = Object.entries(specsObj).map(
        ([k, v]) => `${k.replace(/_/g, " ").toUpperCase()}: ${v}`
      );
      const detailedSpecs = Object.entries(specsObj).map(([k, v]) => ({
        label: k.replace(/_/g, " "),
        value: String(v),
      }));

      return {
        id: String(row.id),
        name: row.name,
        category: row.brand.toUpperCase(),
        category_id: row.brand.toLowerCase(), // e.g. 'grundfos', 'ksb', 'wilo'
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
    });

    return NextResponse.json(mappedProducts);
  } catch (error: any) {
    console.error("Error in Next.js products API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
