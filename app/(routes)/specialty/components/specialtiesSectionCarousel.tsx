"use client";

import * as LucideIcons from "lucide-react";
import { Stethoscope } from "lucide-react";
import { ServiceType, ServiceIconType } from "@/types/service";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import { cn } from "@/lib/utils";

type Props = {
  services: ServiceType[];
  loading: boolean;
  availableSlugs: Set<string>;
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
};

const SpecialtiesSectionCarousel = ({ services, loading, availableSlugs, activeSlug, onSelect }: Props) => {
  const filteredServices = services.filter((service) => availableSlugs.has(service.slug));

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Especialidades</h2>
      <p className="text-sm text-gray-500 mb-6">Encuentra al especialista que necesitas</p>

      {loading ? (
        <SkeletonGalleryCol3 grid={6} />
      ) : (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition-colors",
              activeSlug === null
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            )}
          >
            Todos
          </button>
          {filteredServices.map((service) => {
            const Icon = service.icon
              ? (LucideIcons[service.icon as ServiceIconType] as React.ElementType)
              : Stethoscope;
            const isActive = activeSlug === service.slug;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelect(service.slug)}
                className={cn(
                  "shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                )}
              >
                <Icon className="w-4 h-4" />
                {service.serviceName}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SpecialtiesSectionCarousel;
