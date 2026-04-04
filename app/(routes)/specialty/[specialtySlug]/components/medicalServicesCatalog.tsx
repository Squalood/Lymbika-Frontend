"use client";

import { useParams } from "next/navigation";
import { useGetMedicalServicesBySpecialty } from "@/api/useGetMedicalServicesBySpecialty";
import { MedicalServiceType } from "@/types/medicalService";
import { Separator } from "@/components/ui/separator";
import MedicalServiceCard from "../../components/medicalServiceCard";

const TYPE_LABELS: Record<MedicalServiceType["type"], string> = {
  consultation: "Consultas",
  procedure: "Procedimientos",
  study: "Estudios",
};

const TYPE_ORDER: MedicalServiceType["type"][] = ["consultation", "procedure", "study"];

const MedicalServicesCatalog = () => {
  const params = useParams();
  const specialtySlug = typeof params.specialtySlug === "string" ? params.specialtySlug : "";

  const { medicalServices, loading, error } = useGetMedicalServicesBySpecialty(specialtySlug);

  const grouped = TYPE_ORDER.reduce<Record<MedicalServiceType["type"], MedicalServiceType[]>>(
    (acc, type) => {
      acc[type] = medicalServices.filter((s) => s.type === type);
      return acc;
    },
    { consultation: [], procedure: [], study: [] }
  );

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
        <div className="mt-8 space-y-10">
          {TYPE_ORDER.filter((type) => grouped[type].length > 0).map((type) => (
            <section key={type}>
              <h3 className="text-xl font-medium mb-4">{TYPE_LABELS[type]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[type].map((service) => (
                  <MedicalServiceCard
                    key={service.id}
                    service={service}
                    href={`/specialty/${specialtySlug}/${service.slug}`}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalServicesCatalog;
