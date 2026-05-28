export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
  mainImg: string;
  specs: string[];
  detailedSpecs: { label: string; value: string }[];
  applications: string[];
}

/** Same shape as rows from the database `products` table */
export type ProductDbRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_id: string;
  short_desc: string;
  full_desc: string;
  price: string;
  main_img: string;
  specs: string[];
  detailed_specs: { label: string; value: string }[];
  applications: string[];
};

export function toProductDbRow(p: Product): ProductDbRow {
  return {
    id: p.id,
    slug: p.id,
    name: p.name,
    category: p.category,
    category_id: p.categoryId,
    short_desc: p.shortDesc,
    full_desc: p.fullDesc,
    price: p.price,
    main_img: p.mainImg,
    specs: p.specs,
    detailed_specs: p.detailedSpecs,
    applications: p.applications,
  };
}

/** Detail page fallback when a slug exists in the catalog but not yet in the DB */
export function getCatalogProductRowById(id: string): ProductDbRow | undefined {
  const p = productsList.find((x) => x.id === id);
  return p ? toProductDbRow(p) : undefined;
}

/** Static mock products are cleared. Database products are used. */
export const productsList: Product[] = [];

/** Returns assigned image for any catalog product ID */
export function catalogMainImgForId(id: string): string | undefined {
  return productsList.find((p) => p.id === id)?.mainImg;
}
