import { Skeleton } from "@/components/ui/skeleton";

const ClinicsHomeSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <Skeleton className="h-8 w-72 max-w-full md:h-9" />
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Tarjetas grandes */}
        {[...Array(2)].map((_, index) => (
          <Skeleton
            key={index}
            className="flex-[1_1_60%] sm:flex-[1_1_40%] h-44 md:h-60 rounded-xl"
          />
        ))}

        {/* Carrusel de tarjetas pequeñas */}
        <div className="w-full">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="shrink-0 basis-1/2 md:basis-1/3 lg:basis-1/4 flex flex-col justify-end bg-muted rounded-xl h-40 p-4"
              >
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full max-w-52" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicsHomeSkeleton;
