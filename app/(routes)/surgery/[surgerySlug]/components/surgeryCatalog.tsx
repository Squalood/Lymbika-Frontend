"use client";

import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import SkeletonSchema from "@/components/skeletonSchema";
import { useEffect, useState } from "react";
import { DoctorType } from "@/types/doctor";
import CardDoctor from "./doctor-card";
import { useGetDoctorsByCategory } from "@/api/getDoctorsByCategory";

const SurgeryCatalog = () => {
  const params = useParams();
  const categorySlug = typeof params.surgerySlug === "string" ? params.surgerySlug : "";

  const { result, loading, error } = useGetDoctorsByCategory(categorySlug, "surgery");
  const [surgeryTitle, setSurgeryTitle] = useState("Cargando...");

  // Establecer el título de la cirugía basada en el slug
  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      for (const doctor of result as DoctorType[]) {
        const matchedSurgery = doctor.surgeries?.find((s) => s.slug === categorySlug);
        if (matchedSurgery) {
          setSurgeryTitle(matchedSurgery.surgeryName);
          return;
        }
      }
      // Si no se encontró coincidencia, fallback
      setSurgeryTitle("Categoría Desconocida");
    }
  }, [result, loading, categorySlug]);

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-medium mb-4">{surgeryTitle}</h1>
      <Separator />

      <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-1 md:gap-10">
        {error && <p className="text-red-500">Error al cargar los doctores: {error}</p>}

        {loading ? (
          <SkeletonSchema grid={6} />
        ) : Array.isArray(result) && result.length > 0 ? (
          result.map((doctor: DoctorType) => <CardDoctor key={doctor.id} doctor={doctor} />)
        ) : (
          <p className="col-span-full text-center">No hay Doctores Disponibles</p>
        )}
      </div>
    </div>
  );
};

export default SurgeryCatalog;
