import { DoctorType } from "@/types/doctor";
import { ReviewType } from "@/types/review";
import { strapiLista, strapiPrimero } from "./client";

// Sin caché: reseñas y datos del doctor deben verse en cuanto se publican.

export function getDoctorBySlug(slug: string) {
  return strapiPrimero<DoctorType>(
    `doctors?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    "doctor",
    { revalidate: false }
  );
}

export function getDoctorReviews(doctorSlug: string) {
  return strapiLista<ReviewType>(
    `reviews?filters[doctor][slug][$eq]=${encodeURIComponent(doctorSlug)}&populate=*`,
    "doctor-reviews",
    { revalidate: false }
  );
}
