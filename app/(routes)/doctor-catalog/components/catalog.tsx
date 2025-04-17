"use client";

import { Separator } from "@/components/ui/separator";
import SkeletonSchema from "@/components/skeleton/skeletonSchema";
import { useState } from "react";
import { DoctorType } from "@/types/doctor";
import FiltersControlsService from "./filters-controls-service";
import CardDoctor from "./doctor-card";
import { useGetDoctorsByCategory } from "@/api/getDoctorsByCategory";

const Catalog = () => {
  const [serviceFilter, setServiceFilter] = useState("");
  const [surgeryFilter, setSurgeryFilter] = useState("");

  // Obtener todos los doctores sin filtrar inicialmente
  const { result, loading, error } = useGetDoctorsByCategory("", "service");

  // Título dinámico según filtros
  const title =
    serviceFilter ||
    surgeryFilter ||
    "Todos los doctores";

  const filteredDoctors =
    Array.isArray(result) && !loading
      ? result.filter((doctor: DoctorType) =>
          (serviceFilter === "" ||
            doctor.services?.some((s) => s.serviceName === serviceFilter)) &&
          (surgeryFilter === "" ||
            doctor.surgeries?.some((s) => s.surgeryName === surgeryFilter))
        )
      : [];

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-medium mb-4">{title}</h1>
      <Separator />

      <div className="flex flex-col sm:flex-row sm:gap-10">
        <div className="w-full sm:w-1/3">
          <FiltersControlsService
            setFilterService={setServiceFilter}
            setFilterSurgery={setSurgeryFilter}
            serviceFilter={serviceFilter}
            surgeryFilter={surgeryFilter}
          />
        </div>

        <div className="w-full sm:w-2/3">
          {error && <p className="text-red-500">Error al cargar los doctores: {error}</p>}

          <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
            {loading ? (
              <SkeletonSchema grid={6} />
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor: DoctorType) => (
                <CardDoctor key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <p className="col-span-full text-center">No hay Doctores Disponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
