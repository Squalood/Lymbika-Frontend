import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDoctor = () => {
  return (
    <div className="flex flex-col">
      {/* Imagen de banner */}
      <div className="w-full h-40 sm:h-56 bg-gray-200 rounded-t-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex items-start gap-4 p-6">
          {/* Imagen circular del doctor */}
          <Skeleton className="w-24 h-24 rounded-full" />

          {/* Información del doctor */}
          <div className="space-y-2">
            {/* Nombre */}
            <Skeleton className="w-40 h-6 rounded" />

            {/* Especialidades */}
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-28 h-4 rounded" />
              </div>
            </div>

            {/* Cirugías */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-28 h-4 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Botón de cita */}
        <div className="flex items-center justify-center mb-6 md:mb-0 md:w-48 px-6">
          <div className="flex items-center justify-center gap-2 w-full md:w-full h-10 rounded bg-muted">
            <Skeleton className="w-24 h-4 rounded" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex justify-center gap-12 h-10 mt-6">
        <Skeleton className="w-32 h-4 rounded" />
        <Skeleton className="w-32 h-4 rounded" />
        <Skeleton className="w-32 h-4 rounded" />
      </div>
      <div className="flex justify-between gap-12 h-10 mt-6 px-12">
        <Skeleton className="w-40 h-10 rounded" />
        <Skeleton className="w-40 h-10 rounded" />
        <Skeleton className="w-40 h-10 rounded" />
      </div>
      <div className="flex justify-between gap-12 h-10 mt-6 px-12">
        <Skeleton className="w-40 h-10 rounded" />
        <Skeleton className="w-40 h-10 rounded" />
        <Skeleton className="w-40 h-10 rounded" />
      </div>
    </div>
  );
};

export default SkeletonDoctor;
