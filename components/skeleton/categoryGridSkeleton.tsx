import { Skeleton } from "@/components/ui/skeleton";

const CategoryGridSkeleton = ({ grid = 6 }: { grid?: number }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5">
        {Array.from({ length: grid }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-6"
          >
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-4 w-24 max-w-full" />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="flex-1 h-[34px] rounded-md" />
        ))}
      </div>
    </>
  );
};

export default CategoryGridSkeleton;
