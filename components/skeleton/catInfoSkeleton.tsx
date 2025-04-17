import { Skeleton } from "@/components/ui/skeleton";

const SkeletonInfo = () => {
  return (
    <div className="py-12 px-6 md:px-20 animate-pulse">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Texto */}
        <div className="w-full max-w-xl space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-4/5" />
        </div>

        {/* Imagen */}
        <div className="w-full max-w-md">
          <Skeleton className="w-full h-[300px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonInfo;
