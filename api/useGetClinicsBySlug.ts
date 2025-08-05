import { useEffect, useState } from "react";
import { ClinicType } from "@/types/clinic";

export function useGetClinic(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics?filters%5Bslug%5D%5B%24eq%5D=${slug}&populate%5Bdoctor%5D%5Bpopulate%5D%5B0%5D=image&populate%5Bservices%5D=true&populate%5Bfeatures%5D=true&populate%5Btestimonials%5D=true&populate%5BheroImage%5D=true`;
  const [clinic, setClinic] = useState<ClinicType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        if (Array.isArray(json.data) && json.data.length > 0) {
          const item = json.data[0];
          const mapped: ClinicType = {
            id: item.id,
            title: item.title,
            slug: item.slug,
            heroTitle: item.heroTitle,
            heroSubtitle: item.heroSubtitle,
            heroImage: {
              url: item.heroImage?.url || "",
            },
            contactLocation: item.contactLocation,
            contactSchedule: item.contactSchedule,
            contactPhone: item.contactPhone || "",
            contactWhatsappLink: item.contactWhatsappLink,
            icon: item.icon,

            services: item.services?.map((s: any) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              price: s.price,
              icon: s.icon,
            })) || [],

            features: item.features?.map((f: any) => ({
              id: f.id,
              title: f.title,
              description: f.description,
              icon: f.icon,
            })) || [],

            testimonials: item.testimonials?.map((t: any) => ({
              id: t.id,
              name: t.name,
              text: t.text,
              rating: t.rating,
            })) || [],

            doctor: item.doctor && {
              id: item.doctor.id,
              name: item.doctor.name,
              description: item.doctor.description,
              image: {
                url: item.doctor.image?.url || "",
              },
              points: item.doctor.points || [],
              mapsEmbedUrl: item.doctor.mapsEmbedUrl || "",
            }
          };

          setClinic(mapped);
        } else {
          setClinic(null);
        }

      } catch (error: any) {
        setError(error.message || "Error al obtener clínica");
      } finally {
        setLoading(false);
      }
    })();
  }, [url, slug]);

  return { clinic, loading, error };
}