import { MembershipType } from "@/types/membership";
import { useEffect, useState } from "react";

export function useGetMembership() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/memberships?populate=*`;
  const [Memberships, setMemberships] = useState<MembershipType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        if (json.data && Array.isArray(json.data)) {
          const formattedPlans = json.data
            .map((item: any) => ({
              id: item.id,
              ...item,
              order: item.order ?? 0,
              featured: item.featured ?? false,
              secondaryButton: item.secondaryButton ?? undefined,
            }))
            .sort((a: any, b: any) => a.order - b.order || a.id - b.id);
          setMemberships(formattedPlans);
        } else {
          setMemberships([]);
        }
      } catch (error: any) {
        setError(error.message || "Error al obtener planes");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, Memberships, error };
}
