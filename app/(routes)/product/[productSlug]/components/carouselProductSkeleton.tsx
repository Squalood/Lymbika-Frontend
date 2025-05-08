import { Skeleton } from "@/components/ui/skeleton";

const CarouselProductSkeleton = () => {
  return (
    <div className="flex items-center gap-4 sm:px-12">
      {/* Botón anterior simulado */}
      <div className="flex-shrink-0">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      {/* Imagen central simulada */}
      <Skeleton className="flex-grow h-80 sm:h-[400px] rounded-lg" />

      {/* Botón siguiente simulado */}
      <div className="flex-shrink-0">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default CarouselProductSkeleton;
