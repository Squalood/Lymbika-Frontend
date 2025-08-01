"use client";

import { useGetClinics } from "@/api/useGetClinics";
import Clinics from "./[clinicSlug]/components/clinics";

export default function Page() {
  const { clinics, loading } = useGetClinics();

  if (loading) return <p className="text-center">Cargando clínicas...</p>;

  return (
    <div className="container py-10">
      <Clinics data={clinics} />
    </div>
  );
}