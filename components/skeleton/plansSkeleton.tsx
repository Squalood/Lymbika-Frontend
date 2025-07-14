"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PlansSkeleton() {
  return (
    <div className="max-w-6xl px-6 lg:px-12 py-16 mx-auto">
      <div className="text-center max-w-xl mx-auto space-y-4">
        <div className="flex justify-center gap-2 items-center">
          <Skeleton className="w-8 h-8 sm:w-12 sm:h-12 rounded-full" />
          <Skeleton className="h-8 sm:h-10 w-40 sm:w-64" />
        </div>
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>

      {/* Grid visible en sm+ y solo una card visible en móvil */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className={`
              p-6 rounded-md border bg-white shadow-sm flex flex-col gap-6
              ${idx > 0 ? "hidden sm:flex" : "flex"}
            `}
          >
            <div className="flex items-center gap-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />

            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>

            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}