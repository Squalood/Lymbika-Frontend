"use client";

import { useGetServices } from "@/api/getService";
import { useGetMedicalServiceCatalog } from "@/api/useGetMedicalServiceCatalog";
import { ResponseType } from "@/types/response";
import { ServiceType } from "@/types/service";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import SpecialtyCard from "./specialtyCard";
import MedicalServiceCard from "./medicalServiceCard";

const Specialties = () => {
  const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();
  const { items: msItems, loading: msLoading } = useGetMedicalServiceCatalog();

  const primaryServices: ServiceType[] = (servicesResult || []).filter((s: ServiceType) => s.atePrimary);
  const specialtyServices: ServiceType[] = (servicesResult || []).filter((s: ServiceType) => !s.atePrimary);

  return (
    <div className="space-y-10">
      {/* Atención Primaria — sección con fondo gris */}
      <div className="bg-gray-100 py-6 rounded-2xl">
        <h3 className="px-6 pb-4 text-2xl sm:text-3xl sm:pb-8">Atención Primaria</h3>
        {servicesLoading ? (
          <div className="px-4"><SkeletonGalleryCol3 grid={4} /></div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3 sm:gap-3 px-4">
            {primaryServices.map((service: ServiceType) => (
              <SpecialtyCard
                key={service.id}
                name={service.serviceName}
                imageUrl={service.image?.url}
                href={`/specialty/${service.slug}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Especialidades */}
      <div>
        <h3 className="px-6 pb-4 text-2xl sm:text-3xl sm:pb-8">Especialidades</h3>
        {servicesLoading ? (
          <SkeletonGalleryCol3 grid={6} />
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3 sm:gap-3 px-4">
            {specialtyServices.map((service: ServiceType) => (
              <SpecialtyCard
                key={service.id}
                name={service.serviceName}
                imageUrl={service.image?.url}
                href={`/specialty/${service.slug}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Servicios médicos */}
      <div>
        <h3 className="px-6 pb-4 text-2xl sm:text-3xl sm:pb-8">Servicios médicos</h3>
        {msLoading ? (
          <SkeletonGalleryCol3 grid={8} />
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3 sm:gap-3 px-4">
            {msItems
              .filter((item) => item.service.specialty?.slug)
              .map((item) => (
                <MedicalServiceCard
                  key={item.service.id}
                  service={item.service}
                  href={`/specialty/${item.service.specialty!.slug}/${item.service.slug}`}
                  minPrice={item.minPrice}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Specialties;
