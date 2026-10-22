import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";
import { camposDeProducto } from "@/lib/product-fields";
import CategoryClient from "./components/CategoryClient";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

// CategoryClient filtra por `tipo`, así que ese campo va además de los de la
// tarjeta. Ver lib/product-fields.ts para por qué no se usa `populate=*`.
const CAMPOS = camposDeProducto(["tipo"]);

// El cliente pagina y filtra en memoria, así que la página necesita la
// categoría completa de una sola vez. El tope es el `maxLimit` del backend
// (config/api.ts): con el anterior de 1.000, los 26 productos que exceden en
// "crónicos" (1.026 hoy) no se mostraban nunca y nadie se enteraba.
const PAGE_SIZE = 5000;

async function getCategoryData(slug: string): Promise<{
  products: ProductType[];
  categories: CategoryType[];
}> {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(
      `${BASE}/api/products?filters[active][$eq]=true&${CAMPOS}&filters[category][slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=${PAGE_SIZE}`,
      { next: { revalidate: 300 } }
    ),
    fetch(`${BASE}/api/categories?populate=*`, { next: { revalidate: 300 } }),
  ]);

  const [productsJson, categoriesJson] = await Promise.all([
    productsRes.json(),
    categoriesRes.json(),
  ]);

  const products: ProductType[] = Array.isArray(productsJson.data) ? productsJson.data : [];

  // Si la categoría vuelve a crecer por encima del tope, que quede dicho en los
  // logs en vez de desaparecer productos en silencio como pasó con el 1.000.
  const total = productsJson?.meta?.pagination?.total;
  if (typeof total === "number" && total > products.length) {
    console.warn(
      `[category/${slug}] la categoría tiene ${total} productos y solo se trajeron ${products.length}. Sube PAGE_SIZE (y maxLimit en el backend si hace falta).`
    );
  }

  return {
    products,
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
    />
  );
}
