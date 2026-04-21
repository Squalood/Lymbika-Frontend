"use client";

import { useGetClinic } from "@/api/useGetClinicsBySlug";
import { useParams } from "next/navigation";
import Hero from "./components/hero";
import Services from "./components/services";
import WhyUs from "./components/whyUs";
import Doctor from "./components/doctor";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";
import ClinicSkeleton from "@/components/skeleton/clinicSkeleton";
import ClinicGallery from "./components/clinicGallety";
import { useGetClinicDoctor } from "@/api/useGetClinicsDoctorBySlug";
import { useGetClinicServices } from "@/api/useGetClinicsServiceBySlug";
import VideoSection from "./components/videoSection";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import ClinicBreadcrumb from "./components/clinicBreadcrumb";
import * as gtag from "@/lib/gtag";
import es from "@/locals/es.json";

const colorThemes: Record<string, { primary: string; primaryForeground: string; darkBg: string }> = {
  navy: { primary: "222 60% 12%", primaryForeground: "210 40% 98%", darkBg: "#0b1630" },
  pink: { primary: "330 81% 60%", primaryForeground: "210 40% 98%", darkBg: "#bd195e" },
  green: { primary: "142 71% 45%", primaryForeground: "210 40% 98%", darkBg: "#15803d" },
  red: { primary: "0 84% 60%", primaryForeground: "210 40% 98%", darkBg: "#b91c1c" },
};

export default function ClinicPage() {
  const { clinicSlug } = useParams();
  const { clinic, loading } = useGetClinic(clinicSlug as string);
  const { DoctorClinic } = useGetClinicDoctor(clinicSlug as string);
  const { ServicesClinic } = useGetClinicServices(clinicSlug as string);

  if (loading) {
    return <ClinicSkeleton />;
  }

  if (!clinic) {
    return (
      <div className="py-40 text-center">
        <p className="text-destructive">{es.clinics.notFound}</p>
      </div>
    );
  }

  if (!DoctorClinic || !DoctorClinic.doctor) {
    return <p>{es.clinics.doctorNotFound}</p>;
  }
  const { doctor } = DoctorClinic;

  const serviceRates = ServicesClinic?.service_rates ?? [];

  // Textos: pageTexts de Strapi con fallback a es.json local
  const t = clinic.pageTexts ?? es.clinics;

  const handleSchedule = () => {
    gtag.event({
      action: "click_schedule",
      category: "engagement",
      label: "CTA flotante movil - Agendar Cita",
    });
    window.open(clinic.scheduleLink || clinic.contactWhatsappLink, "_blank");
  };

  const theme = clinic.colorPage ? colorThemes[clinic.colorPage] : undefined;
  const themeStyle = theme
    ? ({ "--primary": theme.primary, "--primary-foreground": theme.primaryForeground, "--clinic-dark-bg": theme.darkBg } as React.CSSProperties)
    : undefined;

  return (
    <div className="relative" style={themeStyle}>
      <ClinicBreadcrumb clinicTitle={clinic.title} texts={t.breadcrumb} />
      <Hero data={clinic} serviceCount={serviceRates.length} testimonialCount={clinic.testimonials.length} texts={t.hero} />
      {serviceRates.length > 0 && <Services services={serviceRates} texts={t.services} />}
      <WhyUs features={clinic.features} texts={t.whyUs} />
      <Doctor data={doctor} doctorPageSlug={clinic.doctorPage?.slug} texts={t.doctor} />
      <VideoSection clinic={clinic} texts={t.video} />
      <Testimonials list={clinic.testimonials} texts={t.testimonials} />
      {clinic.gallery && clinic.gallery.length > 0 && (
        <ClinicGallery clinic={clinic} texts={t.gallery} />
      )}
      <Contact data={clinic} texts={t.contact} />

      {/* CTA flotante movil */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur border-t md:hidden">
        <Button size="lg" className="w-full" onClick={handleSchedule}>
          <Calendar className="w-5 h-5 mr-2" />
          {t.floatingCta}
        </Button>
      </div>
    </div>
  );
}
