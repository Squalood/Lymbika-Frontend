import { Skeleton } from "@/components/ui/skeleton";

type SectionSkeletonProps = {
  rows?: number;      // líneas de contenido (cards, filas, etc.)
  hasImage?: boolean; // muestra un bloque de imagen a la derecha
};

const SectionSkeleton = ({ rows = 3, hasImage = false }: SectionSkeletonProps) => {
  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-4/5 max-w-xl" />
      </div>

      {/* Contenido */}
      {hasImage ? (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="rounded-xl border p-5 space-y-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SectionSkeleton;
