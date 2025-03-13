import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetSugery } from "@/api/getSugery"; 
import { SugeryType } from "@/types/sugery"; 


type FilterSurgeryProps = {
    setFilterSurgery: (value: string) => void;
};

const FilterSurgery = (props: FilterSurgeryProps) => {
    const { setFilterSurgery } = props;
    const { result, loading } = useGetSugery(); // Obtener las cirugías

    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Cirugías</p>
            
            {loading && <p>Cargando cirugías...</p>}
            
            {!loading && result && (
                <RadioGroup onValueChange={(value) => setFilterSurgery(value)}>
                    {result.map((surgery: SugeryType) => (
                        <div key={surgery.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={surgery.surgeryName} id={surgery.surgeryName} />
                            <Label htmlFor={surgery.surgeryName}>{surgery.surgeryName}</Label>
                        </div>
                    ))}
                </RadioGroup>      
            )}
        </div>
    );
};

export default FilterSurgery;
