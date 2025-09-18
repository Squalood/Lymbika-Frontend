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

export default function ClinicPage() {
  const { clinicSlug } = useParams();
  const { clinic, loading } = useGetClinic(clinicSlug as string);
  const { DoctorClinic } = useGetClinicDoctor(clinicSlug as string);

  if (loading) {
    return <ClinicSkeleton />;
  }

  if (!clinic) {
    return (
      <div className="py-40 text-center">
        <p className="text-destructive">Clínica no encontrada.</p>
      </div>
    );
  }

  if (!DoctorClinic || !DoctorClinic.doctor) {
    return <p>No se encontró información del doctor.</p>;
  }
  const { doctor } = DoctorClinic;

  return (
    <div className="relative">
      <Hero data={clinic} /> 
      <Services services={clinic.services} />
      <WhyUs features={clinic.features} />
      <Doctor data={doctor} />   
      <Testimonials list={clinic.testimonials} />
      {clinic.gallery && clinic.gallery.length > 0 && (
        <ClinicGallery clinic={clinic} />
      )}
      <Contact data={clinic} />
    </div>
  );
}