import { Skeleton } from "@/components/ui/skeleton";

type SkeletonProps ={
    grid: number
}

const SkeletonGalleryCol3 = (props: SkeletonProps) => {
    const {grid} = props;

    return (
    <div>
        <div className="grid gap-5 sm:grid-cols-3 grid-cols-1">
        {Array.from({ length: grid }).map((_, idx) => (
            <div
                key={idx}
                className="relative max-w-xs mx-auto overflow-hidden rounded-lg animate-pulse"
                >
                <Skeleton className="w-[270px] h-[220px] rounded-lg" />
                <Skeleton className="absolute bottom-5 w-[90%] left-1/2 transform -translate-x-1/2 h-6 rounded-md backdrop-blur" />
            </div>
        ))}
        </div>
    </div>
    );
};

export default SkeletonGalleryCol3;
