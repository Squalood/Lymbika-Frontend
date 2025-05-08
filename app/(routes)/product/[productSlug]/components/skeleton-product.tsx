import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProduct = () => {
    return ( 
        <div className="px-6">
            <div className="flex flex-col gap-6">
                {/* Título */}
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-3/4" />

                {/* Etiquetas */}
                <div className="flex items-center justify-between gap-3">
                    <Skeleton className="h-6 w-32 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </div>

            {/* Separador */}
            <div className="my-4">
                <Skeleton className="h-px w-full" />
            </div>

            {/* Descripción */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-full my-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-full my-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />

            {/* Separador */}
            <div className="my-4">
                <Skeleton className="h-px w-full" />
            </div>

            {/* Precios */}
            <div className="flex justify-evenly my-4">
                <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-6 w-28" />
                </div>
                <div>
                <Skeleton className="h-4 w-28 mb-1" />
                <Skeleton className="h-6 w-32" />
                </div>
            </div>

            {/* Botones */}
            <div className="flex items-center gap-5">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            </div>
        </div>
     );
}
 
export default SkeletonProduct;