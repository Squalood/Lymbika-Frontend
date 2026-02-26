import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FilterTypeProps = {
    setFilterType: (tipo: string) => void;
    typeFilter: string;
    availableTypes: string[];
};

const FilterType = ({ setFilterType, typeFilter, availableTypes }: FilterTypeProps) => {
    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Tipo</p>
            <RadioGroup value={typeFilter} onValueChange={(value) => setFilterType(value)}>
                {availableTypes.map((tipo: string) => (
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
