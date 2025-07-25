"use client";

import { useGetClinic } from "@/api/useGetClinicsBySlug";
import { useParams } from "next/navigation";
import Hero from "./components/hero";
import Services from "./components/services";
import WhyUs from "./components/whyUs";
import Doctor from "./components/doctor";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";

export default function ClinicPage() {
  const { clinicSlug } = useParams();
  const { clinic, loading } = useGetClinic(clinicSlug as string);

  if (loading) {
    return (
      <div className="py-40 text-center">
        <p className="text-muted-foreground">Cargando clínica...</p>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="py-40 text-center">
        <p className="text-destructive">Clínica no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Hero data={clinic} />
      <div className="max-w-4xl mx-4 md:mx-8 lg:mx-auto">
        <Services services={clinic.services} />
        <WhyUs features={clinic.features} />
        <Doctor data={clinic.doctor} />
        <Testimonials list={clinic.testimonials} />
        <Contact data={clinic} />
      </div>
    </div>
  );
}