"use client";

import { useGetClinics } from "@/api/useGetClinics";
import Clinics from "./[clinicSlug]/components/clinics";
import ClinicsHomeSkeleton from "@/components/skeleton/clinicsHomeSkeleton";

export default function ClinicsClientWrapper({ title }: { title?: string }) {
  const { clinics, loading } = useGetClinics();

  if (loading) return <ClinicsHomeSkeleton />;

  return <Clinics data={clinics} title={title} />;
}
