"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSugery } from "@/api/getSugery";
import { SugeryType } from "@/types/sugery";
import {ResponseType} from '@/types/response';
import { PagePaginationPrevious, PagePaginationNext } from "./pagePagination";

const SurgeryTitle = () => {
  const { surgerySlug } = useParams() as { surgerySlug: string };
  const { result, loading }:ResponseType = useGetSugery();
  const [surgery, setSurgery] = useState<SugeryType | null>(null);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find((s: SugeryType) => s.slug === surgerySlug);
      if (found) setSurgery(found);
    }
  }, [loading, result, surgerySlug]);

  return (
    <div className="max-w-xl md:max-w-6xl mx-auto">
      {loading || !surgery ? (
        <Skeleton className="h-10 w-64" />
      ) : (
        <div className="relative flex items-center justify-between mb-4">
          <div>
            <PagePaginationPrevious result={result} currentSlug={surgerySlug} />
          </div>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-medium text-center">
            {surgery.surgeryName}
          </h1>
          <div>
          <PagePaginationNext result={result} currentSlug={surgerySlug} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SurgeryTitle;
