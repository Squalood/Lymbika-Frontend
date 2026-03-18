"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetServices } from "@/api/getService";
import { ServiceType } from "@/types/service";
import {ResponseType} from '@/types/response';
import { Skeleton } from "@/components/ui/skeleton";
import { PagePaginationNext, PagePaginationPrevious } from "./pagePagination";

const SpecialtyTitle = () => {
  const { specialtySlug } = useParams() as { specialtySlug: string };
  const { result, loading }:ResponseType = useGetServices();
  const [service, setService] = useState<ServiceType | null>(null);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find((s: ServiceType) => s.slug === specialtySlug);
      if (found) setService(found);
    }
  }, [loading, result, specialtySlug]);

  return (
    <div className="max-w-xs md:max-w-4xl mx-auto">
      {loading || !service ? (
        <div className="relative flex items-center justify-between mb-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-10 w-24" />
        </div>
      ) : (
        <div className="relative flex items-center justify-between mb-4">
          <div>
            <PagePaginationPrevious result={result} currentSlug={specialtySlug} />
          </div>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-medium text-center">
            {service.serviceName}
          </h1>
          <div>
          <PagePaginationNext result={result} currentSlug={specialtySlug} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialtyTitle;