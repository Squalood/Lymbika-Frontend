"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ServiceType } from "@/types/service";
import { useGetServices } from "@/api/getService";
import SkeletonInfo from "@/components/skeleton/catInfoSkeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Check } from "lucide-react";

const ServiceInfo = () => {
  const { serviceSlug } = useParams();
  const { result, loading } = useGetServices();
  const [service, setService] = useState<ServiceType | null>(null);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find((s: ServiceType) => s.slug === serviceSlug);
      if (found) setService(found);
    }
  }, [loading, result, serviceSlug]);

  if (loading) return <SkeletonInfo />;
  if (!service) return null;

  const imageUrl = service.image?.url || "/placeholder-image.webp";
  const descriptionLines = service.description?.trim().split("\n") || [];

  return (
    <div className="w-full py-12 px-6 md:px-24 bg-muted">
      <div className="container mx-auto">
        <div className="grid border rounded-lg shadow-sm p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2">
          {/* Columna Izquierda: Textos y Beneficios */}
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">
                  {service.atePrimary ? "Atención Primaria" : "Especialidad Médica"}
                </Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-semibold">
                  {service.serviceName || "Información del Servicio"}
                </h2>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                  Conoce todos los detalles y beneficios de nuestro servicio
                  especializado.
                </p>
              </div>
            </div>

            {/* Lista de descripción adaptada a la plantilla */}
            <div className="grid lg:pl-6 grid-cols-1 gap-6">
              {descriptionLines.length > 0 ? (
                descriptionLines.map((line, index) => (
                  <div key={index} className="flex flex-row gap-6 items-start">
                    <Check className="text-primary" />
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-700 text-base md:text-lg">
                        {line}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  Descripción no disponible.
                </p>
              )}
            </div>

            {/* Botón de acción */}
            <div className="flex justify-start">
              <Button
                className="gap-2"
                onClick={() =>
                  window.open("https://wa.me/526561100446", "_blank")
                }
              >
                <Stethoscope className="w-4 h-4" /> Solicitar Agente Médico
              </Button>
            </div>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="relative aspect-square overflow-hidden rounded-full border-8 border-white shadow-xl">
            <Image
              src={imageUrl}
              alt={service.serviceName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
