import { Skeleton } from "@/components/ui/skeleton";

const MedicalHeroSkeleton = () => {
  return (
    <section className="w-full py-6 px-3 md:py-10 md:px-8">
      <div className="relative bg-[#0b1630] rounded-2xl overflow-hidden max-w-6xl mx-auto px-5 py-8 md:px-8 md:py-12">
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          {/* Columna izquierda */}
          <div className="space-y-5 md:space-y-8">
            {/* Badge */}
            <Skeleton className="h-7 w-48 rounded-full bg-white/10" />
            {/* Título */}
            <div className="space-y-2">
              <Skeleton className="h-10 w-full bg-white/10" />
              <Skeleton className="h-10 w-4/5 bg-white/10" />
            </div>
            {/* Descripción */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-5/6 bg-white/10" />
              <Skeleton className="h-4 w-4/6 bg-white/10" />
            </div>
            {/* Stats */}
            <div className="flex gap-0 pt-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`pr-4 md:pr-6 ${i > 0 ? "pl-4 md:pl-6" : ""}`}
                >
                  <Skeleton className="h-7 w-16 bg-white/10 mb-1" />
                  <Skeleton className="h-3 w-24 bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: imagen */}
          <Skeleton className="w-full h-[220px] md:h-[320px] lg:h-[380px] rounded-xl bg-white/10" />
        </div>
      </div>
    </section>
  );
};

export default MedicalHeroSkeleton;
