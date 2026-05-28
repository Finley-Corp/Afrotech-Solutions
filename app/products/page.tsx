import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductsCatalog from "./ProductsCatalog";
import { getCachedBrandCounts, getCachedProductsPage } from "@/lib/products-db";

export const revalidate = 120;

export default async function ProductsPage() {
  const [initial, brandCounts] = await Promise.all([
    getCachedProductsPage({ page: 1, limit: 48 }),
    getCachedBrandCounts(),
  ]);

  return (
    <main className="pc-page">
      <Navbar />
      <ProductsCatalog initial={initial} brandCounts={brandCounts} />
      <Footer />
    </main>
  );
}
