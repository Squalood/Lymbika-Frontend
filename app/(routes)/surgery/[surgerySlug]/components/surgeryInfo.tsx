"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import SkeletonInfo from "@/components/skeleton/catInfoSkeleton";
import { useGetSugery } from "@/api/getSugery";
import { SugeryType } from "@/types/sugery";

const SurgeryInfo = () => {
  const { surgerySlug } = useParams();
  const { result, loading } = useGetSugery();
  const [surgery, setSurgery] = useState<SugeryType | null>(null);

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      const found = result.find(
        (s: SugeryType) => s.slug === surgerySlug
      );
      if (found) setSurgery(found);
    }
  }, [loading, result, surgerySlug]);

  if (loading) return <SkeletonInfo />;
  if (!surgery) return null;

  const imageUrl = surgery.image?.url || "/placeholder-image.webp";
  const description = surgery.description?.trim();

  return (
    <div className="py-12 px-24 bg-muted">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-evenly gap-8">
        {/* Texto */}
        <div className="max-w-xs md:max-w-xl">
          {description ? (
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
                {description.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Descripción no disponible.</p>
            )}
        </div>

        {/* Imagen */}
        <div className="flex-shrink-0 md:max-w-xl">
          <Image
            src={imageUrl}
            alt={surgery.surgeryName}
            width={800}
            height={800}
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SurgeryInfo;
