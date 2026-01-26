import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProduct = () => {
    return (
        <div className="px-2 sm:px-6">
            <div className="flex flex-col gap-3 sm:gap-4">
                {/* Título */}
                <Skeleton className="h-6 sm:h-7 w-full" />
                <Skeleton className="h-6 sm:h-7 w-3/4" />

                {/* Etiquetas */}
                <div className="flex items-center justify-evenly mt-2 gap-2 sm:gap-3">
                    <Skeleton className="h-5 sm:h-6 w-2/5 max-w-32 rounded-full" />
                    <Skeleton className="h-5 sm:h-6 w-2/5 max-w-32 rounded-full" />
                </div>
            </div>

            {/* Separador */}
            <div className="my-3 sm:my-4">
                <Skeleton className="h-px w-full" />
            </div>

            {/* Descripción */}
            <Skeleton className="h-3 sm:h-4 w-full mb-2" />
            <Skeleton className="h-3 sm:h-4 w-5/6 mb-2" />
            <Skeleton className="h-3 sm:h-4 w-4/6" />
            <Skeleton className="h-3 sm:h-4 w-full my-2" />
            <Skeleton className="h-3 sm:h-4 w-5/6 mb-2" />
            <Skeleton className="h-3 sm:h-4 w-4/6" />

            {/* Separador */}
            <div className="my-3 sm:my-4 py-4">
                <Skeleton className="h-px w-full" />
            </div>

            {/* Precios */}
            <div className="flex justify-evenly my-3 sm:my-4 gap-4 py-4">
                <div className="flex-1 max-w-[45%]">
                    <Skeleton className="h-3 sm:h-4 w-full mb-1" />
                    <Skeleton className="h-5 sm:h-6 w-full" />
                </div>
                <div className="flex-1 max-w-[45%]">
                    <Skeleton className="h-3 sm:h-4 w-full mb-1" />
                    <Skeleton className="h-5 sm:h-6 w-full" />
                </div>
            </div>

            {/* Botones */}
            <div className="flex items-center gap-3 sm:gap-5 py-4">
                <Skeleton className="h-9 sm:h-10 w-full rounded-md" />
                <Skeleton className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex-shrink-0" />
            </div>
        </div>
     );
}
 
export default SkeletonProduct;