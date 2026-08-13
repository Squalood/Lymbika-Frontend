import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HospitalCardSkeleton = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto max-w-6xl">
      <Skeleton className="h-8 w-48 mb-10" />
      <div className="flex gap-4 overflow-hidden">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="shrink-0 basis-[85%] sm:basis-[50%] md:basis-[33%] flex flex-col items-center gap-3 p-6 py-8">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HospitalCardSkeleton;
