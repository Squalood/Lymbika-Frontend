"use client";

import { useGetClinics } from "@/api/useGetClinics";
import Clinics from "./[clinicSlug]/components/clinics";

export default function ClinicsClientWrapper({ title }: { title?: string }) {
  const { clinics } = useGetClinics();
  return <Clinics data={clinics} title={title} />;
}
