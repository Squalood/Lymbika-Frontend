import { CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWindowSize } from "@/hooks/useWindowSize";

const HospitalGridSkeleton = () => {
    const { width } = useWindowSize();

    const columns = width >= 1024 ? 3 : width >= 640 ? 2 : 1;

    return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto max-w-4xl">
      <div className="mb-10">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className={`grid grid-cols-${columns} gap-8`}>
        {[...Array(columns)].map((_, index) => (
          <div key={index} className="flex flex-col w-full h-[450px]">
            <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
              <Skeleton className="w-full h-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col flex-grow">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>

              <Skeleton className="h-16 w-full" />
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalGridSkeleton;
