import { Skeleton } from "@/components/ui/skeleton";
import { REVEAL_SERVICIOS, getItemClass } from "@/lib/grid-reveal";

const MAX_VISIBLES = REVEAL_SERVICIOS[REVEAL_SERVICIOS.length - 1].visibles;

/** Calca el markup de MedicalServiceCard para que la altura salga sola. */
export const MedicalServiceCardSkeleton = () => (
  <div className="flex flex-col h-full rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
    <Skeleton className="w-full h-40 rounded-none shrink-0" />
    <div className="flex flex-col flex-1 p-4 gap-2">
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <div className="mt-auto pt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-9 w-full sm:w-24 rounded-md shrink-0" />
      </div>
    </div>
  </div>
);

/** Fila horizontal: imita el carrusel del catalogo en la landing. */
export const MedicalServiceCardsCarouselSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="px-0">
    <div className="flex -ml-2 sm:-ml-4 overflow-hidden">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="shrink-0 pl-2 sm:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
          <MedicalServiceCardSkeleton />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Grid: imita el catalogo de /specialty. Usa las clases de reveal del grid real
 * para que el conteo coincida por breakpoint (4 en movil, 6 en sm, 8 en lg).
 */
export const MedicalServiceCardsGridSkeleton = ({ total }: { total: number }) => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-3 px-4">
    {Array.from({ length: Math.min(total, MAX_VISIBLES) }).map((_, idx) => (
      <div key={idx} className={`h-full ${getItemClass(REVEAL_SERVICIOS, idx)}`}>
        <MedicalServiceCardSkeleton />
      </div>
    ))}
  </div>
);
