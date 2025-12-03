"use client";

import { useGetServices } from "@/api/getService";
import { ResponseType } from "@/types/response";
import { ServiceType } from "@/types/service";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import ServiceCard from "./serviceCard";

const Specialties = () => {
  const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();

  // Separar servicios según atePrimary
  const primaryServices: ServiceType[] =
    servicesResult?.filter((service: ServiceType) => service.atePrimary) || [];

  const specialtyServices: ServiceType[] =
    servicesResult?.filter((service: ServiceType) => !service.atePrimary) || [];

  return (
    <div>
      <h3 className="px-6 pb-4 text-2xl sm:text-3xl sm:pb-8">Atención Primaria</h3>

      {servicesLoading ? (<SkeletonGalleryCol3 grid={6} />
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5 px-4">
          {primaryServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      <h3 className="px-6 pt-10 pb-4 text-2xl sm:text-3xl sm:pb-8">Especialidades Médicas</h3>

      {servicesLoading ? (<SkeletonGalleryCol3 grid={14} />
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5 px-4">
          {specialtyServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Specialties;