import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <div className="relative h-[450px] md:h-[600px] lg:h-[700px] rounded-br-[5rem] px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden flex items-center">
      {/* Imagen de fondo simulada */}
      <div className="absolute inset-0 z-0">
        <Skeleton className="w-full h-full opacity-25" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 lg:w-3/4 xl:w-2/4 space-y-4">
        <Skeleton className="h-10 w-3/4 md:w-1/2 bg-white/30" /> {/* Título */}
        <Skeleton className="h-6 w-5/6 md:w-2/3 bg-white/20" /> {/* Descripción */}
        <Skeleton className="h-6 w-2/3 md:w-1/2 bg-white/20" />

        <div className="pt-4">
          <Skeleton className="h-12 w-48 rounded-md bg-white/30" /> {/* Botón */}
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;