"use client";

import { useParams } from "next/navigation";
import { useGetMedicalServicesBySpecialty } from "@/api/useGetMedicalServicesBySpecialty";
import { MedicalServiceType } from "@/types/medicalService";
import { Separator } from "@/components/ui/separator";
import MedicalServiceCard from "../../components/medicalServiceCard";

const MedicalServicesCatalog = () => {
  const params = useParams();
  const specialtySlug = typeof params.specialtySlug === "string" ? params.specialtySlug : "";

  const { medicalServices, loading, error } = useGetMedicalServicesBySpecialty(specialtySlug);

  return (
    <div className="max-w-6xl py-4 mx-auto px-4">
      <h2 className="text-2xl font-medium mb-2 sm:mb-4">Servicios disponibles</h2>
      <Separator />

      {error && <p className="text-red-500 mt-4">Error al cargar los servicios: {error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-56" />
          ))}
        </div>
      ) : medicalServices.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">No hay servicios disponibles para esta especialidad.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {medicalServices.map((service: MedicalServiceType) => (
            <MedicalServiceCard
              key={service.id}
              service={service}
              href={`/specialty/${specialtySlug}/${service.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalServicesCatalog;
