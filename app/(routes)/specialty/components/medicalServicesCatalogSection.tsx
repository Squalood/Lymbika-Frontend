"use client";

import { useState } from "react";
import { useGetMedicalServiceCatalog } from "@/api/useGetMedicalServiceCatalog";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import MedicalServiceCard from "./medicalServiceCard";
import { ShowMoreButton } from "@/components/show-more-button";
import { TYPE_LABELS, TYPE_ORDER } from "@/lib/medicalServiceTypes";
import { REVEAL_SERVICIOS, getItemClass, getButtonClass } from "@/lib/gridReveal";

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
          const buttonClass = getButtonClass(REVEAL_SERVICIOS, typeItems.length);

          return (
            <section key={type}>
              <h4 className="px-6 pb-4 text-xl font-medium">{TYPE_LABELS[type]}</h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-3 px-4">
                {typeItems.map((item, index) => (
                  <div
                    key={item.service.id}
                    className={`h-full ${isExpanded ? "" : getItemClass(REVEAL_SERVICIOS, index)}`}
                  >
                    <MedicalServiceCard
                      service={item.service}
                      href={`/specialty/${item.service.specialty!.slug}/${item.service.slug}`}
                      minPrice={item.minPrice}
                      packageItems={item.packageItems}
                    />
                  </div>
                ))}
              </div>
              {buttonClass && (
                <div className={`mt-4 px-4 ${buttonClass}`}>
                  <ShowMoreButton
                    breakpoints={REVEAL_SERVICIOS}
                    total={typeItems.length}
                    expanded={!!isExpanded}
                    onToggle={() => toggle(type)}
                  />
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
