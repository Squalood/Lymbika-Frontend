import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";
import { ReviewType } from "@/types/review";
import { camposDeProducto } from "@/lib/product-fields";
import { strapiGet, strapiLista, strapiPrimero } from "./client";

/**
 * Populate de la ficha de producto. Explícito y no `populate=*` porque la ficha
 * clínica necesita dos niveles (composición → principio activo, de donde salen
 * embarazo, contraindicaciones, etc.) y `*` solo llega a uno. De paso deja de
 * traer lotes y stock por farmacia, que la página no usa.
 */
const POPULATE_FICHA = [
  "populate[images][fields][0]=url",
  "populate[category][fields][0]=categoryName",
  "populate[category][fields][1]=slug",
  "populate[videos]=true",
  "populate[prospecto][fields][0]=url",
  "populate[prospecto][fields][1]=name",
  "populate[indicaciones][fields][0]=nombre",
  "populate[indicaciones][fields][1]=slug",
  "populate[composicion][populate][principioActivo]=true",
].join("&");

export function getProduct(slug: string) {
  return strapiPrimero<ProductType>(
    `products?filters[active][$eq]=true&filters[slug][$eq]=${encodeURIComponent(slug)}&${POPULATE_FICHA}`,
    "product"
  );
}

/** Sin caché: una reseña recién enviada debe aparecer al recargar. */
export function getProductReviews(productSlug: string) {
  return strapiLista<ReviewType>(
    `reviews?filters[product][slug][$eq]=${encodeURIComponent(productSlug)}&populate=*`,
    "product-reviews",
    { revalidate: false }
  );
}

// CategoryClient filtra por `tipo`, así que ese campo va además de los de la
// tarjeta. Ver lib/product-fields.ts para por qué no se usa `populate=*`.
const CAMPOS_CATEGORIA = camposDeProducto(["tipo"]);

// El cliente pagina y filtra en memoria, así que la página necesita la
// categoría completa de una sola vez. El tope es el `maxLimit` del backend
// (config/api.ts): con el anterior de 1.000, los 26 productos que exceden en
// "crónicos" (1.026 hoy) no se mostraban nunca y nadie se enteraba.
const PAGE_SIZE = 5000;

export async function getCategoryData(slug: string): Promise<{
  products: ProductType[];
  categories: CategoryType[];
}> {
  const [productsRes, categories] = await Promise.all([
    strapiGet<ProductType[]>(
      `products?filters[active][$eq]=true&${CAMPOS_CATEGORIA}&filters[category][slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=${PAGE_SIZE}`,
      `category/${slug}`,
      { revalidate: 300 }
    ),
    strapiLista<CategoryType>("categories?populate=*", "categories", { revalidate: 300 }),
  ]);

  const products = Array.isArray(productsRes?.data) ? productsRes.data : [];

  // Si la categoría vuelve a crecer por encima del tope, que quede dicho en los
  // logs en vez de desaparecer productos en silencio como pasó con el 1.000.
  const total = productsRes?.meta?.pagination?.total;
  if (typeof total === "number" && total > products.length) {
    console.warn(
      `[category/${slug}] la categoría tiene ${total} productos y solo se trajeron ${products.length}. Sube PAGE_SIZE (y maxLimit en el backend si hace falta).`
    );
  }

  return { products, categories };
}
