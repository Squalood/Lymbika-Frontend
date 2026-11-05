import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import MedicalServiceDoctors from "./sections/medical-service-doctors";
import { getMedicalServiceBySlug } from "@/lib/strapi/medical-services";
import { imgUrl } from "@/lib/media";
import Hero from "./sections/hero";
import StatsBar from "./sections/stats-bar";
import Benefits from "./sections/benefits";
import Package from "./sections/package";
import Financing from "./sections/financing";
import Gallery from "./sections/gallery";
import Doctors from "./sections/doctors";
import Hospitals from "./sections/hospitals";
import Faq from "./sections/faq";
import Cta from "./sections/cta";

type Props = {
  params: Promise<{ specialtySlug: string; medicalServiceSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialtySlug, medicalServiceSlug } = await params;
  const service = await getMedicalServiceBySlug(medicalServiceSlug);
  if (!service) return {};

  const description = service.landingHero?.subtitle || service.description || undefined;
  const image = service.landingHero?.hero_image?.url ?? service.image?.url;
  return {
    title: `${service.name} | Lymbika`,
    description,
    alternates: { canonical: `/specialty/${specialtySlug}/${medicalServiceSlug}` },
    openGraph: {
      title: service.name,
      description,
      ...(image && { images: [imgUrl(image)] }),
    },
  };
}

export default async function Page({ params }: Props) {
  const { specialtySlug, medicalServiceSlug } = await params;
  const medicalService = await getMedicalServiceBySlug(medicalServiceSlug);

  if (!medicalService) notFound();

  // Landing: cada sección decide si se muestra según los datos del servicio.
  if (medicalService.has_landing_page) {
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
