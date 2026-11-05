import { Skeleton } from "@/components/ui/skeleton";

// Anchos variados para que la fila de pills no se vea uniforme
const WIDTHS = ["w-20", "w-32", "w-24", "w-40", "w-28", "w-36", "w-24", "w-32"];

const SpecialtyPillsSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="flex gap-2 overflow-hidden pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      {Array.from({ length: count }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={`shrink-0 h-[38px] rounded-full ${WIDTHS[idx % WIDTHS.length]}`}
        />
      ))}
    </div>
  );
};

export default SpecialtyPillsSkeleton;
