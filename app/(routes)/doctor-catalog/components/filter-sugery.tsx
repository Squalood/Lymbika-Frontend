import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetSugery } from "@/api/getSugery";
import { SugeryType } from "@/types/sugery";

type FilterSurgeryProps = {
    setFilterSurgery: (value: string) => void;
    surgeryFilter: string; // Nuevo prop para el valor seleccionado
};

const FilterSurgery = ({ setFilterSurgery, surgeryFilter }: FilterSurgeryProps) => {
    const { result, loading } = useGetSugery();

    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Cirugías</p>

            {loading && <p>Cargando cirugías...</p>}

            {!loading && result && (
                <RadioGroup 
                    value={surgeryFilter} // Asegura que el RadioGroup refleje el estado actual
                    onValueChange={(value) => setFilterSurgery(value)}
                >
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
