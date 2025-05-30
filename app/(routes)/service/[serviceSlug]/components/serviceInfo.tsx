"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ServiceType } from "@/types/service";
import { useGetServices } from "@/api/getService";
import SkeletonInfo from "@/components/skeleton/catInfoSkeleton";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

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
    <div className="py-12 px-6 md:px-24 bg-muted">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-evenly gap-8">
        {/* Texto */}
        <div className="max-w-xl">
          {description ? (
              <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base md:text-lg space-y-3">
                {description.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Descripción no disponible.</p>
            )}
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => window.open("https://wa.me/526561100446", "_blank")}>
                <Stethoscope />Solicitar Agente Médico
              </Button>
            </div>
        </div>

        {/* Imagen */}
        <div className="flex-shrink-0 md:max-w-xl">
          <Image
            src={imageUrl}
            alt={service.serviceName}
            width={800}
            height={800}
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
