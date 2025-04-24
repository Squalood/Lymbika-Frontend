"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetServices } from "@/api/getService";
import { ServiceType } from "@/types/service";
import {ResponseType} from '@/types/response';
import { Skeleton } from "@/components/ui/skeleton";
import { PagePaginationNext, PagePaginationPrevious } from "./pagePagination";

const ServiceTitle = () => {
  const { serviceSlug } = useParams() as { serviceSlug: string };
  const { result, loading }:ResponseType = useGetServices();
  const [service, setService] = useState<ServiceType | null>(null);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find((s: ServiceType) => s.slug === serviceSlug);
      if (found) setService(found);
    }
  }, [loading, result, serviceSlug]);

  return (
    <div className="max-w-xs md:max-w-4xl mx-auto">
      {loading || !service ? (
        <Skeleton className="h-10 w-64" />
      ) : (
        <div className="relative flex items-center justify-between mb-4">
          <div>
            <PagePaginationPrevious result={result} currentSlug={serviceSlug} />
          </div>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-medium text-center">
            {service.serviceName}
          </h1>
          <div>
          <PagePaginationNext result={result} currentSlug={serviceSlug} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTitle;