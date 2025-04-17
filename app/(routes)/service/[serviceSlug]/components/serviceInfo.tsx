"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ServiceType } from "@/types/service";
import { useGetServices } from "@/api/getService";
import SkeletonInfo from "@/components/skeleton/catInfoSkeleton";

const ServiceInfo = () => {
  const { serviceSlug } = useParams();
  const { result, loading } = useGetServices();
  const [service, setService] = useState<ServiceType | null>(null);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find(
        (s: ServiceType) => s.slug === serviceSlug
      );
      if (found) setService(found);
    }
  }, [loading, result, serviceSlug]);

  if (loading) return <SkeletonInfo />;
  if (!service) return null;

  const imageUrl = service.image?.url || "/placeholder-image.webp";
  const description = service.description?.trim();

  
  return (
    <div className="py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Texto */}
        <div className="max-w-xl">
          {description ? (
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
                {description.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Descripción no disponible.</p>
            )}
        </div>

        {/* Imagen */}
        <div className="flex-shrink-0">
          <Image
            src={imageUrl}
            alt={service.serviceName}
            width={500}
            height={500}
            className="rounded-2xl object-cover max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
