"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface FaqSkeletonProps {
  items?: number; 
}

const FaqSkeleton = ({ items = 3 }: FaqSkeletonProps) => {
  return (
    <div className="w-full py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
        <Skeleton className="h-8 w-80 mx-auto" /> {/* Simula pregunta */}
          <div className="max-w-3xl w-full mx-auto space-y-4">
            {Array.from({ length: items }).map((_, idx) => (
              <div
                key={idx}
                className="px-4 py-1"
              >
                <Skeleton className="h-14 w-full" /> {/* Simula pregunta */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSkeleton;