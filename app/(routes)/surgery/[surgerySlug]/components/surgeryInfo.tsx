"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SugeryType } from "@/types/sugery";
import { useGetSugery } from "@/api/getSugery";
import SkeletonInfo from "@/components/skeleton/catInfoSkeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Check, ChevronDown, ChevronUp } from "lucide-react";

const SurgeryInfo = () => {
  const { surgerySlug } = useParams();
  const { result, loading } = useGetSugery();
  const [surgery, setSurgery] = useState<SugeryType | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find(
        (s: SugeryType) => s.slug === surgerySlug
      );
      if (found) setSurgery(found);
    }
  }, [loading, result, surgerySlug]);

  if (loading) return <SkeletonInfo />;
  if (!surgery) return null;

  const imageUrl = surgery.image?.url || "/placeholder-image.webp";
  const descriptionLines = surgery.description?.trim().split("\n") || [];

  return (
    <div className="w-full py-12 px-6 md:px-24 bg-muted">
      <div className="container mx-auto">
        <div className="grid border rounded-lg shadow-sm p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2">
          
          {/* Columna Izquierda: Información de la Cirugía */}
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">Cirugías y Procedimientos</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-semibold">
                  {surgery.surgeryName || "Detalles de la Cirugía"}
                </h2>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                  Contamos con especialistas certificados para brindarte la mejor atención y seguridad.
                </p>
              </div>
            </div>

            {/* Lista de descripción con icono Check */}
            <div className="flex flex-col gap-4">
              {/* Botón toggle solo visible en móvil */}
              {descriptionLines.length > 0 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="lg:hidden flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      Ver menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      Ver detalles completos ({descriptionLines.length} beneficios)
                    </>
                  )}
                </button>
              )}

              {/* Lista con animación de altura */}
              <div
                className={`grid lg:pl-6 grid-cols-1 gap-6 transition-all duration-300 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 lg:max-h-[2000px] lg:opacity-100"
                }`}
              >
                {descriptionLines.length > 0 ? (
                  descriptionLines.map((line, index) => (
                    <div key={index} className="flex flex-row gap-6 items-start">
                      <Check className="text-primary flex-shrink-0" />
                      <div className="flex flex-col gap-1">
                        <p className="text-gray-700 text-base md:text-base">{line}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No hay detalles específicos disponibles.</p>
                )}
              </div>
            </div>

            {/* Botón de WhatsApp */}
            <div className="flex justify-start">
              <Button 
                className="gap-2"
                onClick={() => window.open("https://wa.me/526561100446", "_blank")}
              >
                <Stethoscope className="w-4 h-4" /> Solicitar Agente Médico
              </Button>
            </div>
          </div>

          {/* Columna Derecha: Imagen de la Cirugía */}
          <div className="relative aspect-square overflow-hidden rounded-xl border shadow-md">
            <Image
              src={imageUrl}
              alt={surgery.surgeryName}
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

export default SurgeryInfo;