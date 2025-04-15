"use client";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import SkeletonSchema from "@/components/skeletonSchema";
import { useState, useEffect } from "react";
import { useGetServiceDoctor } from "@/api/getServiceDoctor";
import { DoctorType } from "@/types/doctor";
import FiltersControlsService from "./filters-controls-service";
import CardDoctor from "./doctor-card";

const Catalog = () => {
  const params = useParams();
  const serviceSlug = typeof params.serviceSlug === "string" ? params.serviceSlug : "";

  const { result, loading, error }: ResponseType = useGetServiceDoctor(serviceSlug);

  // Estados de filtros
  const [serviceFilter, setServiceFilter] = useState("");
  const [surgeryFilter, setSurgeryFilter] = useState("");

  // Efecto para seleccionar automáticamente el filtro basado en el slug
  useEffect(() => {
    if (!loading && result?.length > 0) {
      const firstDoctor = result[0] as DoctorType;

      // Buscamos coincidencias del slug en servicios o cirugías
      const matchedService = firstDoctor.services?.find((s) => s.slug === serviceSlug);
      const matchedSurgery = firstDoctor.surgeries?.find((s) => s.slug === serviceSlug);

      if (matchedService) {
        setServiceFilter(matchedService.serviceName);
        setSurgeryFilter("");
      } else if (matchedSurgery) {
        setSurgeryFilter(matchedSurgery.surgeryName);
        setServiceFilter("");
      }
    }
  }, [result, loading, serviceSlug]);

  // Filtrar doctores según los filtros activos
  const filteredDoctors =
    Array.isArray(result) && !loading
      ? result.filter((doctor: DoctorType) =>
          (serviceFilter === "" || doctor.services?.some((s) => s.serviceName === serviceFilter)) &&
          (surgeryFilter === "" || doctor.surgeries?.some((s) => s.surgeryName === surgeryFilter))
        )
      : [];

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <Separator />

      <div className="flex flex-col sm:flex-row sm:gap-10">
        {/* Filtros */}
        <div className="w-full sm:w-1/3">
          <FiltersControlsService
            setFilterService={setServiceFilter}
            setFilterSurgery={setSurgeryFilter}
            serviceFilter={serviceFilter}
            surgeryFilter={surgeryFilter}
          />
        </div>

        {/* Contenedor de doctores */}
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
