import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";

export function useGetProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&pagination[page]=1&pagination[pageSize]=500`;
  const [products, setResult] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        if (json.data && Array.isArray(json.data)) {
          setResult(json.data);
        } else {
          setResult([]);
        }
      } catch (error: any) {
        setError(error.message || "Error al obtener productos");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, products, error };
}
