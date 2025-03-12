import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProduct = () => {
    return ( 
        <div className="grid gap-6 sm:grid-cols-2 items-center justify-center text-center sm:py-16 sm:px-40">
            {/* Imagen con efecto de carga */}
            <div className="flex justify-center">
                <Skeleton className="h-[200px] w-[300px] sm:w-[350px] rounded-xl" />
            </div>

            {/* Contenedor de texto con líneas simuladas */}
            <div className="flex flex-col gap-3 items-center">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[180px]" />
            </div>
        </div>
     );
}
 
export default SkeletonProduct;