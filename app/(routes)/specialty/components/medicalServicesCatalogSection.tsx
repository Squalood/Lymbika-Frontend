"use client";

import { useState } from "react";
import { useGetMedicalServiceCatalog } from "@/api/useGetMedicalServiceCatalog";
import { MedicalServiceType } from "@/types/medicalService";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import MedicalServiceCard from "./medicalServiceCard";
import { Button } from "@/components/ui/button";

const TYPE_LABELS: Record<MedicalServiceType["type"], string> = {
  consultation: "Consultas",
  procedure: "Procedimientos",
  study: "Estudios",
};

const TYPE_ORDER: MedicalServiceType["type"][] = ["consultation", "procedure", "study"];

// 2 filas por breakpoint: mobile cols=2 → 4, sm cols=3 → 6, lg cols=4 → 8
const getItemClass = (index: number): string => {
  if (index < 4) return "";
  if (index < 6) return "hidden sm:block";
  if (index < 8) return "hidden lg:block";
  return "hidden";
};

// Botón visible solo donde hay items ocultos
const getButtonClass = (total: number): string | null => {
  if (total <= 4) return null;
  if (total <= 6) return "block sm:hidden";
  if (total <= 8) return "block lg:hidden";
  return "block";
};

const MedicalServicesCatalogSection = () => {
  const { items, loading } = useGetMedicalServiceCatalog();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filtered = items.filter((item) => item.service.specialty?.slug);

  const toggle = (type: string) =>
    setExpanded((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <div className="space-y-8">
      <h3 className="px-6 text-2xl sm:text-3xl">Servicios médicos</h3>
      {loading ? (
        <SkeletonGalleryCol3 grid={8} />
      ) : (
        TYPE_ORDER.filter((type) => filtered.some((item) => item.service.type === type)).map((type) => {
          const typeItems = filtered.filter((item) => item.service.type === type);
          const isExpanded = expanded[type];
          const buttonClass = getButtonClass(typeItems.length);

          return (
            <section key={type}>
              <h4 className="px-6 pb-4 text-xl font-medium">{TYPE_LABELS[type]}</h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-3 px-4">
                {typeItems.map((item, index) => (
                  <div
                    key={item.service.id}
                    className={`h-full ${isExpanded ? "" : getItemClass(index)}`}
                  >
                    <MedicalServiceCard
                      service={item.service}
                      href={`/specialty/${item.service.specialty!.slug}/${item.service.slug}`}
                      minPrice={item.minPrice}
                    />
                  </div>
                ))}
              </div>
              {buttonClass && (
                <div className={`mt-4 px-4 ${buttonClass}`}>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => toggle(type)}
                  >
                    {isExpanded
                      ? "Mostrar menos"
                      : `Mostrar más (${typeItems.length - (typeItems.length <= 6 ? 4 : typeItems.length <= 8 ? 6 : 8)} más)`}
                  </Button>
                </div>
              )}
            </section>
          );
        })
      )}
    </div>
  );
};

export default MedicalServicesCatalogSection;
