import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryData } from "@/lib/strapi/products";
import CategoryClient from "./components/category-client";

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const { products } = await getCategoryData(categorySlug);
  const categoryName = products[0]?.category?.categoryName;
  if (!categoryName) return {};
  return {
    title: `${categoryName} | Lymbika`,
    alternates: { canonical: `/category/${categorySlug}` },
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
    />
  );
}
