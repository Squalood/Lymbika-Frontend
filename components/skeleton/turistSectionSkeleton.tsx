import { Skeleton } from "@/components/ui/skeleton";

const TuristSectionSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto mb-16 px-8">
      <Skeleton className="h-9 w-72 mb-8 mx-6" />
      <Skeleton className="w-full aspect-video rounded-lg" />
    </div>
  );
};

export default TuristSectionSkeleton;
