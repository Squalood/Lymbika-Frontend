import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";

export function useGetProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`;
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        // Transformar los productos extrayendo cada item desde data
        const parsedProducts = json.data.map((item: any) => {
          return {
            id: item.id,
            productName: item.productName, // <-- No viene en attributes porque estás en Strapi v5
            slug: item.slug,
            description: item.description,
            active: item.active,
            price: item.price,
            tipo: item.tipo,
            isFeatured: item.isFeatured,
            priceMember: item.priceMember,
            images: item.images || [],
            category: item.category || null
          } as ProductType;
        });

        setProducts(parsedProducts);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Error al obtener productos");
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, products, error };
}
