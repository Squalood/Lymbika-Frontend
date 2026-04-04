"use client";

import { useState } from "react";
import { useGetServices } from "@/api/getService";
import { ResponseType } from "@/types/response";
import { ServiceType } from "@/types/service";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import SpecialtyCard from "./specialtyCard";
import { Button } from "@/components/ui/button";

// 2 filas por breakpoint: mobile cols=1 → 2, sm/lg cols=3 → 6
const getItemClass = (index: number): string => {
  if (index < 6) return "";
  if (index < 6) return "hidden sm:block";
  return "hidden";
};

const getButtonClass = (total: number): string | null => {
  if (total <= 6) return null;
  if (total <= 6) return "block sm:hidden";
  return "block";
};

const SpecialtiesSection = () => {
  const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();
  const [primaryExpanded, setPrimaryExpanded] = useState(false);
  const [specialtyExpanded, setSpecialtyExpanded] = useState(false);

  const primaryServices: ServiceType[] = (servicesResult || []).filter((s: ServiceType) => s.atePrimary);
  const specialtyServices: ServiceType[] = (servicesResult || []).filter((s: ServiceType) => !s.atePrimary);

  return (
    <div className="space-y-10">
      {/* Atención Primaria */}
      <div className="bg-gray-100 py-6 rounded-2xl mx-2">
        <h3 className="px-6 pb-4 text-2xl sm:text-3xl sm:pb-8">Atención Primaria</h3>
        {servicesLoading ? (
          <div className="px-4"><SkeletonGalleryCol3 grid={4} /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 px-4">
              {primaryServices.map((service, index) => (
                <div key={service.id} className={primaryExpanded ? "" : getItemClass(index)}>
                  <SpecialtyCard
                    name={service.serviceName}
                    icon={service.icon}
                    href={`/specialty/${service.slug}`}
                  />
                </div>
              ))}
            </div>
            {getButtonClass(primaryServices.length) && (
              <div className={`mt-4 px-4 ${getButtonClass(primaryServices.length)}`}>
                <Button variant="default" size="sm" onClick={() => setPrimaryExpanded((p) => !p)}>
                  {primaryExpanded
                    ? "Mostrar menos"
                    : `Mostrar más (${primaryServices.length - (primaryServices.length <= 6 ? 2 : 6)} más)`}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Especialidades */}
      <div>
        <h3 className="px-6 pb-4 text-2xl sm:text-3xl sm:pb-8">Especialidades</h3>
        {servicesLoading ? (
          <SkeletonGalleryCol3 grid={6} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 px-4">
              {specialtyServices.map((service, index) => (
                <div key={service.id} className={specialtyExpanded ? "" : getItemClass(index)}>
                  <SpecialtyCard
                    name={service.serviceName}
                    icon={service.icon}
                    href={`/specialty/${service.slug}`}
                  />
                </div>
              ))}
            </div>
            {getButtonClass(specialtyServices.length) && (
              <div className={`mt-4 px-4 ${getButtonClass(specialtyServices.length)}`}>
                <Button variant="default" size="sm" onClick={() => setSpecialtyExpanded((p) => !p)}>
                  {specialtyExpanded
                    ? "Mostrar menos"
                    : `Mostrar más (${specialtyServices.length - (specialtyServices.length <= 6 ? 2 : 6)} más)`}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SpecialtiesSection;
