"use client";

import { useGetClinics } from "@/api/useGetClinics";
import Clinics from "./[clinicSlug]/components/clinics";
import NavsClinicsSkeleton from "@/components/skeleton/navsclinicsSkeleton";

export default function Page() {
  const { clinics, loading } = useGetClinics();

  if (loading) return <NavsClinicsSkeleton/>

  return (
    <div className="container py-10">
      <Clinics data={clinics} />
    </div>
  );
}