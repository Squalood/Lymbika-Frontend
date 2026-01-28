import { useEffect, useState } from "react";

interface GalleryData {
  id: number;
  title: string;
  images: { id: number; url: string }[];
}

export function useGetGallery(slug: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages?filters[slug][$eq]=${slug}&populate[gallery][populate]=images`;
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setGallery(json.data?.[0]?.gallery || null);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [url]);

  return { gallery, loading, error };
}
