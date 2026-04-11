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
import { ServiceRateType } from "@/types/medicalService";

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
        <p className="text-destructive">Clínica no encontrada.</p>
      </div>
    );
  }

  if (!DoctorClinic || !DoctorClinic.doctor) {
    return <p>No se encontró información del doctor.</p>;
  }
  const { doctor } = DoctorClinic;

  const rawRates = ServicesClinic?.service_rates ?? [];

  const servicesToShow: ServiceRateType[] =
    rawRates.length > 0
      ? rawRates
      : (clinic.services ?? []).map((s) => ({
          id: s.id,
          price: s.price,
          duration_min: null,
          notes: null,
          medical_service: {
            id: s.id,
            name: s.title,
            slug: "",
            description: s.description,
            image: s.image ?? null,
            type: "procedure" as const,
            specialty: null,
          },
        }));

  return (
    <div className="relative">
      <Hero data={clinic} /> 
      <Services services={servicesToShow} />
      <WhyUs features={clinic.features} />
      <Doctor data={doctor} doctorPageSlug={clinic.doctorPage?.slug} />   
      <VideoSection clinic={clinic}/>
      <Testimonials list={clinic.testimonials} />
      
      {clinic.gallery && clinic.gallery.length > 0 && (
        <ClinicGallery clinic={clinic} />
      )}
      <Contact data={clinic} />
    </div>
  );
}