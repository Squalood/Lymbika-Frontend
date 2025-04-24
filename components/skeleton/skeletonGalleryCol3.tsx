import { Skeleton } from "@/components/ui/skeleton";

type SkeletonProps ={
    grid: number
}

const SkeletonGalleryCol3 = (props: SkeletonProps) => {
    const {grid} = props;
    return (
    <div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5 px-4">
        {Array.from({ length: grid }).map((_, idx) => (
            <div key={idx} className="relative max-w-xs mx-auto overflow-hidden rounded-lg animate-pulse">
                <Skeleton className="w-44 h-36 md:w-64 md:h-52 rounded-lg" />
            </div>
        ))}
        </div>
    </div>
    );
};

export default SkeletonGalleryCol3;
