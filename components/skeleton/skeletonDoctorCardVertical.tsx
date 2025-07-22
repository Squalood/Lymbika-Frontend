import { Skeleton } from "@/components/ui/skeleton";
import { useWindowSize } from "@/hooks/useWindowSize";


const SkeletonDoctorCardVertical = () => {
    const { width } = useWindowSize();

    const columns = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: columns }).map((_, idx) => (
            <div key={idx} className="flex flex-col justify-between my-8 mx-auto">
                <div className="flex items-start gap-4 p-6">
                    {/* Imagen circular del doctor */}
                    <Skeleton className="w-24 h-24 rounded-full" />
                    {/* Información del doctor */}
                    <div className="space-y-2">
                        {/* Nombre */}
                        <Skeleton className="w-40 h-6 rounded" />

                        {/* Especialidades */}
                        <div className="flex flex-col gap-1 mt-2">
                            <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-28 h-4 rounded" />
                            </div>
                        </div>

                        {/* Cirugías */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-28 h-4 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
                <Skeleton className="w-60 h-32 rounded mx-auto" /> 
            </div>
            ))}
        </div>
    );
};

export default SkeletonDoctorCardVertical;