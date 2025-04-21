"use client";

import { useGetServices } from "@/api/getService";
import { ResponseType } from "@/types/response";
import Link from "next/link";
import Image from "next/image";
import { ServiceType } from "@/types/service";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";

const Specialties = () => {
  const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();

  // IDs de servicios principales
  const primaryIds = [109, 114, 119, 123];

  // Separar servicios
    const primaryServices: ServiceType[] =
    servicesResult?.filter((service: ServiceType) =>
    primaryIds.includes(Number(service.id))
    ) || [];

    const specialtyServices: ServiceType[] =
    servicesResult?.filter((service: ServiceType) =>
    !primaryIds.includes(Number(service.id))
    ) || [];

  return (
    <div>
        
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">Atención Primaria</h3>

      {servicesLoading ? (
        <SkeletonGalleryCol3 grid={4} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-3 grid-cols">
          {primaryServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      <h3 className="px-6 pt-10 pb-4 text-3xl sm:pb-8">Especialidades Médicas</h3>

      {servicesLoading ? (
        <SkeletonGalleryCol3 grid={14} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-3 grid-cols">
          {specialtyServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente reutilizable para mostrar un servicio
const ServiceCard = ({ service }: { service: ServiceType }) => {
  return (
    <Link
      href={`/service/${service.slug}`}
      className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
    >
      {service.image?.url ? (
        <Image
          src={service.image.url}
          alt={service.serviceName}
          width={270}
          height={200}
          className="transition duration-300 ease-in-out rounded-lg hover:scale-110 sm:max-h-[220px] w-full h-auto"
        />
      ) : (
        <div className="w-[270px] h-[200px] bg-gray-300 flex items-center justify-center">
          <span className="text-gray-700">Sin imagen</span>
        </div>
      )}
      <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
        {service.serviceName}
      </p>
    </Link>
  );
};

export default Specialties;
