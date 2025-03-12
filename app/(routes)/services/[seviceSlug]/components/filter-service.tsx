
import { useGetServiceField } from "@/api/useGetServiceField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ServiceFilterTypes } from "@/types/servicefilters";


type FilterServiceProps = {
    setFilterService: (serviceName: string) => void
}

const FilterService = (props:FilterServiceProps) => {
    const {setFilterService} = props
    const {result, loading}:ServiceFilterTypes = useGetServiceField()

    return ( 
        <div className="my-5">
            <p className="mb-3 font-bold">Servicio</p>
            {loading && result == null && (
                <p>cargando serviceName....</p>
            )}
            <RadioGroup onValueChange={(value) => setFilterService(value)}>
            {result?.schema?.attributes?.serviceName?.type && (
            <div className="flex items-center space-x-2">
                <RadioGroupItem value={result.schema.attributes.serviceName.type} id={result.schema.attributes.serviceName.type} />
                <Label htmlFor={result.schema.attributes.serviceName.type}>
                    {result.schema.attributes.serviceName.type}
                </Label>
            </div>
)}
            </RadioGroup>
        </div>
     );
}
 
export default FilterService;