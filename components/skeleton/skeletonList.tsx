import { Skeleton } from "../ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
};

const SkeletonList = ({ grid }: SkeletonSchemaProps) => {
  return (
    <div className="flex flex-col gap-4 py-24">
      {Array.from({ length: grid }).map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Bullet o ícono simulado */}
          <Skeleton className="w-4 h-4 rounded-full" />
          {/* Texto simulado */}
          <Skeleton className="h-5 w-16 rounded" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonList;
