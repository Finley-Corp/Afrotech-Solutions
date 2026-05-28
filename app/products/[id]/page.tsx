import { notFound } from "next/navigation";
import ProductDetailView from "./ProductDetailView";
import { getCachedProductById } from "@/lib/products-db";

export const revalidate = 300;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getCachedProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
