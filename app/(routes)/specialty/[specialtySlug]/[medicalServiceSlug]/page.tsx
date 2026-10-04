"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import MedicalServiceDoctors from "./sections/MedicalServiceDoctors";
import { useGetMedicalServiceBySlug } from "@/api/useGetMedicalServiceBySlug";
import Hero from "./sections/Hero";
import StatsBar from "./sections/StatsBar";
import Benefits from "./sections/Benefits";
import Package from "./sections/Package";
import Financing from "./sections/Financing";
import Gallery from "./sections/Gallery";
import Doctors from "./sections/Doctors";
import Hospitals from "./sections/Hospitals";
import Faq from "./sections/Faq";
import Cta from "./sections/Cta";

export default function Page() {
  const params = useParams();
  const specialtySlug =
    typeof params.specialtySlug === "string" ? params.specialtySlug : "";
  const medicalServiceSlug =
    typeof params.medicalServiceSlug === "string" ? params.medicalServiceSlug : "";

  const { medicalService, loading } = useGetMedicalServiceBySlug(medicalServiceSlug);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Landing: cada sección decide si se muestra según los datos del servicio.
  if (medicalService?.has_landing_page) {
    return (
      <div className="min-h-screen bg-background">
        <Hero service={medicalService} />
        <StatsBar service={medicalService} />

        {/* ─── VIDEO TESTIMONIAL (desactivado) ──────────────────────── */}
        {/* {video?.videoID && (
          <section className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
            <div className="space-y-3 text-center">
              <span className="text-xs font-bold tracking-widest uppercase text-primary">
                {t?.video_label ?? "Testimonios reales"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                {video.title ?? "Resultados reales, pacientes reales"}
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden border aspect-video bg-muted max-w-4xl mx-auto">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.videoID}`}
                title={video.title ?? "Testimonio"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )} */}

        <Benefits service={medicalService} />
        <Package service={medicalService} />
        <Financing service={medicalService} />
        <Gallery service={medicalService} />
        <Doctors service={medicalService} />
        <Hospitals service={medicalService} />
        <Faq service={medicalService} />
        <Cta service={medicalService} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 px-4 sm:px-6">
      <Link
        href={`/specialty/${specialtySlug}`}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver a la especialidad
      </Link>
      <MedicalServiceDoctors />

    </div>
  );
}
