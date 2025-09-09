import { useEffect, useState } from "react";
import { ClinicType } from "@/types/clinic";

export function useGetClinics() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics?populate=*`;
  const [clinics, setClinics] = useState<ClinicType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        if (Array.isArray(json.data)) {
          const mapped: ClinicType[] = json.data.map((item: any) => ({
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
            },
            gallery: item.gallery && {
              id: item.gallery.id,
              url: item.gallery.url
            },
            videos: item.videos && {
              id: item.videos.id,
              videoID: item.videos.videoID
            }
          }));

          setClinics(mapped);
        } else {
          setClinics([]);
        }

      } catch (error: any) {
        setError(error.message || "Error al obtener clínicas");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { clinics, loading, error };
}