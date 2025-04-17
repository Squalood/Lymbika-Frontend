import { Skeleton } from "@/components/ui/skeleton";

type SkeletonProps ={
    grid: number
}

const SkeletonDoctorCard = (props: SkeletonProps) => {
    const {grid} = props;
    return (
        <div className="flex flex-col">
            {Array.from({ length: grid }).map((_, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:justify-between">
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

                {/* Botón de cita */}
                <div className="flex items-center justify-center mb-6 md:mb-0 md:w-48 px-6">
                    <div className="flex items-center justify-center gap-2 w-full md:w-full h-10 rounded bg-muted">
                    <Skeleton className="w-24 h-4 rounded" />
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
};

export default SkeletonDoctorCard;
