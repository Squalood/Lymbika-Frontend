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
import ClinicProducts from "./components/products";
import { useGetClinicServices } from "@/api/useGetClinicsServiceBySlug";
import VideoSection from "./components/videoSection";

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

  if (!ServicesClinic || !ServicesClinic.services) {
    return <p>No se encontró información de los servicios.</p>;
  }
  const { services } = ServicesClinic;

  return (
    <div className="relative">
      <Hero data={clinic} /> 
      <Services services={services} />
      <ClinicProducts clinicSlug={clinicSlug as string} clinicTitle={clinic.title} />
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