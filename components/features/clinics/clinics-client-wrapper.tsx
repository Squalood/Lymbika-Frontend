"use client";

import { useGetClinics } from "@/hooks/use-clinics";
import Clinics from "@/components/features/clinics/clinics-list";
import ClinicsHomeSkeleton from "@/components/skeleton/clinicsHomeSkeleton";

export default function ClinicsClientWrapper({ title }: { title?: string }) {
  const { clinics, loading } = useGetClinics();

  if (loading) return <ClinicsHomeSkeleton />;

  return <Clinics data={clinics} title={title} />;
}
