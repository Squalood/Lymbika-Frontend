import { Skeleton } from "../ui/skeleton";

type SkeletonSchemaProps ={
    grid: number
}
    
const SkeletonSchema = (props: SkeletonSchemaProps) => {
    const {grid} = props;

    return ( 
        Array.from({length: grid}).map((_, index) => (
            <div key={index} className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="w-40 sm:w-48 lg:w-64 max-h-96 space-y-4 overflow-hidden p-2 sm:p-4">
                    {/* Imagen */}
                    <Skeleton className="aspect-square w-full rounded-lg" />

                    {/* Nombre y categoría */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-1 sm:gap-2">
                        <Skeleton className="h-9 w-9 rounded-md" />
                        <Skeleton className="h-9 w-full rounded-md" />
                    </div>
                </div>
            </div>
        ))
     );
}
 
export default SkeletonSchema;