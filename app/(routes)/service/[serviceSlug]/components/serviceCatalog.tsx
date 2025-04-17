"use client";

import { useParams } from "next/navigation";
import { DoctorType } from "@/types/doctor";
import CardDoctor from "../../../doctor/[doctorSlug]/components/doctor-card";
import { useGetDoctorsByCategory } from "@/api/getDoctorsByCategory";
import SkeletonDoctorCard from "@/components/skeleton/doctorCardSkeleton";

const ServiceCatalog = () => {
  const params = useParams();
  const categorySlug = typeof params.serviceSlug === "string" ? params.serviceSlug : "";

  const { result, loading, error } = useGetDoctorsByCategory(categorySlug, "service");

  return (
    <div className="max-w-6xl py-4 mx-auto sm:px-32">
      <h2 className="text-2xl font-medium mb-2">Especialistas</h2>
      <div className="grid gap-5 mt-8 md:grid-cols-1 md:gap-10">
        {error && <p className="text-red-500">Error al cargar los doctores: {error}</p>}

        {loading ? (
          <SkeletonDoctorCard grid={3}/>
        ) : Array.isArray(result) && result.length > 0 ? (
          result.map((doctor: DoctorType) => <CardDoctor key={doctor.id} doctor={doctor} />)
        ) : (
          <p className="col-span-full text-center">No hay Doctores Disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ServiceCatalog;