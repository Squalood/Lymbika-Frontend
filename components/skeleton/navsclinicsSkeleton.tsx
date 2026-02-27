import { Skeleton } from "@/components/ui/skeleton";

export default function NavsClinicsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Título */}
      <div className="mb-10">
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Tarjetas grandes (2) */}
        {[1, 2].map((_, index) => (
          <div
            key={`big-${index}`}
            className="relative flex flex-col rounded-xl flex-[1_1_60%] sm:flex-[1_1_40%] h-44 md:h-60 overflow-hidden"
          >
            <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
            <div className="flex-auto p-6 pb-0 relative z-10 space-y-3">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="p-4 pt-0 relative z-10">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}

        {/* Tarjetas pequeñas (4) */}
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={`small-${index}`}
            className="flex flex-col justify-end rounded-xl h-40 p-4 flex-[1_1_45%] sm:flex-[1_1_22%]"
          >
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}