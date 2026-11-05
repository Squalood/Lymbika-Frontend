"use client";

import { useState } from "react";
import { useGetServices } from "@/hooks/use-services";
import { ServiceType } from "@/types/service";
import SpecialtiesGridSkeleton from "@/components/skeleton/specialty-card-skeleton";
import SpecialtyCard from "./specialty-card";
import { ShowMoreButton } from "@/components/show-more-button";
import { REVEAL_ESPECIALIDADES, getItemClass, getButtonClass } from "@/lib/grid-reveal";

const SpecialtiesSection = () => {
  const { result: servicesResult, loading: servicesLoading } = useGetServices();
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
          <SpecialtiesGridSkeleton total={4} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 px-4">
              {primaryServices.map((service, index) => (
                <div key={service.id} className={primaryExpanded ? "" : getItemClass(REVEAL_ESPECIALIDADES, index)}>
                  <SpecialtyCard
                    name={service.serviceName}
                    icon={service.icon}
                    href={`/specialty/${service.slug}`}
                  />
                </div>
              ))}
            </div>
            {getButtonClass(REVEAL_ESPECIALIDADES, primaryServices.length) && (
              <div className={`mt-4 px-4 ${getButtonClass(REVEAL_ESPECIALIDADES, primaryServices.length)}`}>
                <ShowMoreButton
                  breakpoints={REVEAL_ESPECIALIDADES}
                  total={primaryServices.length}
                  expanded={primaryExpanded}
                  onToggle={() => setPrimaryExpanded((p) => !p)}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Especialidades */}
      <div>
        <h3 className="px-6 pb-4 text-2xl sm:text-3xl sm:pb-8">Especialidades</h3>
        {servicesLoading ? (
          <SpecialtiesGridSkeleton total={11} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 px-4">
              {specialtyServices.map((service, index) => (
                <div key={service.id} className={specialtyExpanded ? "" : getItemClass(REVEAL_ESPECIALIDADES, index)}>
                  <SpecialtyCard
                    name={service.serviceName}
                    icon={service.icon}
                    href={`/specialty/${service.slug}`}
                  />
                </div>
              ))}
            </div>
            {getButtonClass(REVEAL_ESPECIALIDADES, specialtyServices.length) && (
              <div className={`mt-4 px-4 ${getButtonClass(REVEAL_ESPECIALIDADES, specialtyServices.length)}`}>
                <ShowMoreButton
                  breakpoints={REVEAL_ESPECIALIDADES}
                  total={specialtyServices.length}
                  expanded={specialtyExpanded}
                  onToggle={() => setSpecialtyExpanded((p) => !p)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SpecialtiesSection;
