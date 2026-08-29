"use client";

import Image from "next/image";
import Link from "next/link";
import { FeaturedSurgeryType } from "@/api/useGetFeaturedSurgeries";

type SurgeryCardProps = {
  surgery: FeaturedSurgeryType;
};

export default function SurgeryCard({ surgery }: SurgeryCardProps) {
  return (
    <Link
      href={`/specialty/${surgery.specialtySlug}/${surgery.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        {surgery.imageUrl && (
          <Image
            src={surgery.imageUrl}
            alt={surgery.name}
            fill
            sizes="260px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-2.5">
        <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2">
          {surgery.name}
        </h3>
        <p className="mt-1 text-xs leading-snug text-muted-foreground line-clamp-2">
          {surgery.description}
        </p>
      </div>
    </Link>
  );
}
