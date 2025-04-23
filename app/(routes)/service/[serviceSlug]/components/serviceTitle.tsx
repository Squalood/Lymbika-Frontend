"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetServices } from "@/api/getService";
import { ServiceType } from "@/types/service";
import { Skeleton } from "@/components/ui/skeleton";

const ServiceTitle = () => {
  const { serviceSlug } = useParams() as { serviceSlug: string };
  const { result, loading } = useGetServices();
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
        <h1 className="text-3xl font-medium mb-4">{service.serviceName}</h1>
      )}
    </div>
  );
};

export default ServiceTitle;