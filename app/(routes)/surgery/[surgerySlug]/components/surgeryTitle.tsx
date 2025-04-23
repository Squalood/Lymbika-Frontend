"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSugery } from "@/api/getSugery";
import { SugeryType } from "@/types/sugery";

const SurgeryTitle = () => {
  const { surgerySlug } = useParams() as { surgerySlug: string };
  const { result, loading } = useGetSugery();
  const [surgery, setSurgery] = useState<SugeryType | null>(null);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find((s: SugeryType) => s.slug === surgerySlug);
      if (found) setSurgery(found);
    }
  }, [loading, result, surgerySlug]);

  return (
    <div className="max-w-xs md:max-w-4xl mx-auto">
      {loading || !surgery ? (
        <Skeleton className="h-10 w-64" />
      ) : (
        <h1 className="text-3xl font-medium mb-4">{surgery.surgeryName}</h1>
      )}
    </div>
  );
};

export default SurgeryTitle;
