"use client";

import { useState } from "react";
import { MedicalServiceCatalogItem } from "@/types/medical-service";
import MedicalServiceCard from "@/components/features/medical-services/medical-service-card";
import { ShowMoreButton } from "@/components/show-more-button";
import { TYPE_LABELS, TYPE_ORDER } from "@/lib/medical-service-types";
import { REVEAL_SERVICIOS, getItemClass, getButtonClass } from "@/lib/grid-reveal";

type Props = {
  items: MedicalServiceCatalogItem[];
  specialtySlug: string;
};

const MedicalServicesCatalog = ({ items, specialtySlug }: Props) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (type: string) =>
    setExpanded((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <div className="max-w-6xl py-4 mx-auto px-4 space-y-8">
      <h2 className="text-2xl font-medium">Servicios disponibles</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No hay servicios disponibles para esta especialidad.
        </p>
      ) : (
        TYPE_ORDER.filter((type) => items.some((item) => item.service.type === type)).map((type) => {
          const typeItems = items.filter((item) => item.service.type === type);
          const isExpanded = expanded[type];
          const buttonClass = getButtonClass(REVEAL_SERVICIOS, typeItems.length);

          return (
            <section key={type}>
              <h4 className="pb-4 text-xl font-medium">{TYPE_LABELS[type]}</h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-3">
                {typeItems.map((item, index) => (
                  <div
                    key={item.service.id}
                    className={`h-full ${isExpanded ? "" : getItemClass(REVEAL_SERVICIOS, index)}`}
                  >
                    <MedicalServiceCard
                      service={item.service}
                      href={`/specialty/${specialtySlug}/${item.service.slug}`}
                      minPrice={item.minPrice}
                      packageItems={item.packageItems}
                    />
                  </div>
                ))}
              </div>
              {buttonClass && (
                <div className={`mt-4 ${buttonClass}`}>
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

export default MedicalServicesCatalog;
