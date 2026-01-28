import { Skeleton } from "@/components/ui/skeleton";

const GalleryCarouselSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 md:mt-32 px-6">
      <Skeleton className="h-9 w-64 mb-8" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default GalleryCarouselSkeleton;
