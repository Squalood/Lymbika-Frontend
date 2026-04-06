"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Stethoscope } from "lucide-react";
import { ServiceType, ServiceIconType } from "@/types/service";
import { useGetServices } from "@/api/getService";

const SpecialtyInfo = () => {
  const { specialtySlug } = useParams();
  const { result, loading } = useGetServices();
  const [service, setService] = useState<ServiceType | null>(null);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find((s: ServiceType) => s.slug === specialtySlug);
      if (found) setService(found);
    }
  }, [loading, result, specialtySlug]);

  if (loading || !service) return null;

  const Icon = service.icon ? (LucideIcons[service.icon as ServiceIconType] as React.ElementType) : Stethoscope;

  return (
    <div className="bg-muted">
      <div className="max-w-6xl mx-auto py-8 px-4 flex sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 shrink-0 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              {service.serviceName}
            </h1>
            <span className="text-base text-muted-foreground sm:hidden">
              {service.atePrimary ? "Atención primaria" : "Especialidad médica"}
            </span>
          </div>
        </div>
        <span className="hidden sm:block text-lg text-muted-foreground shrink-0">
          {service.atePrimary ? "Atención primaria" : "Especialidad médica"}
        </span>
      </div>
    </div>
  );
};

export default SpecialtyInfo;
