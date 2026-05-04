import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";
import CategoryClient from "./components/CategoryClient";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getCategoryData(slug: string): Promise<{
  products: ProductType[];
  categories: CategoryType[];
}> {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(
      `${BASE}/api/products?populate=*&filters[category][slug][$eq]=${slug}&pagination[pageSize]=1000`,
      { next: { revalidate: 3600 } }
    ),
    fetch(`${BASE}/api/categories?populate=*`, { next: { revalidate: 3600 } }),
  ]);

  const [productsJson, categoriesJson] = await Promise.all([
    productsRes.json(),
    categoriesRes.json(),
  ]);

  return {
    products: Array.isArray(productsJson.data) ? productsJson.data : [],
    categories: Array.isArray(categoriesJson.data) ? categoriesJson.data : [],
  };
}

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const { products } = await getCategoryData(categorySlug);
  const categoryName = products[0]?.category?.categoryName;
  if (!categoryName) return {};
  return {
    title: `${categoryName} | Lymbika`,
  };
}

export default async function Page({ params }: Props) {
  const { categorySlug } = await params;
  const { products, categories } = await getCategoryData(categorySlug);

  if (products.length === 0) notFound();

  return (
    <CategoryClient
      initialProducts={products}
      categories={categories}
      categorySlug={categorySlug}
    />
  );
}
