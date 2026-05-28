import { notFound, redirect } from "next/navigation";
import ProductDetailView from "./ProductDetailView";
import { getCachedProductBySlugOrId } from "@/lib/products-db";
import { isNumericProductId, productDetailPath } from "@/lib/product-slug";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug: param } = await params;
  const product = await getCachedProductBySlugOrId(param);

  if (!product) {
    notFound();
  }

  if (isNumericProductId(param) && product.slug !== param) {
    redirect(productDetailPath(product.slug));
  }

  return <ProductDetailView product={product} />;
}
