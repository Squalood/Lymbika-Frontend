import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MedicalHeroSkeleton = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-light via-card to-background py-20 overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Columna izquierda */}
        <div className="space-y-8">
          <div className="space-y-6">
            {/* Badge estático */}
            <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
              👨‍⚕️ Nueva Red Médica
            </Badge>

            {/* Título skeleton */}
            <Skeleton className="h-12 w-3/4" />

            {/* Descripción skeleton */}
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>

          {/* Badges de beneficios skeleton */}
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-32 rounded-full"
              />
            ))}
          </div>

          {/* Botón skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              disabled
              size="lg"
              className="bg-primary text-primary-foreground w-40 h-12 opacity-50"
            >
              <Skeleton className="h-5 w-20 mx-auto" />
            </Button>
          </div>
        </div>

        {/* Columna derecha: Imagen skeleton */}
        <Card className="overflow-hidden border-0 shadow-2xl">
          <div className="relative w-full h-[400px] flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MedicalHeroSkeleton;