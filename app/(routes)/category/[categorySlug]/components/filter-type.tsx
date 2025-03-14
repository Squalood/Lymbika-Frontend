import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";

type FilterTypeProps = {
    setFilterType: (tipo: string) => void;
    typeFilter: string;
};

const FilterType = ({ setFilterType, typeFilter }: FilterTypeProps) => {
    const { result, loading }: FilterTypes = useGetProductField();

    return ( 
        <div className="my-5">
            <p className="mb-3 font-bold">Tipo</p>
            {loading && result == null && (
                <p>Cargando tipos...</p>
            )}
            <RadioGroup value={typeFilter} onValueChange={(value) => setFilterType(value)}>
                {result != null && result.schema.attributes.tipo.enum.map((tipo: string) => (
                    <div key={tipo} className="flex items-center space-x-2">
                        <RadioGroupItem value={tipo} id={tipo} />
                        <Label htmlFor={tipo}>{tipo}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterType;
