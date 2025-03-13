import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetServices } from "@/api/getService";
import { ServiceType } from "@/types/service";

type FilterServiceProps = {
    setFilterService: (value: string) => void;
    serviceFilter: string; // Nuevo prop para el valor seleccionado
};

const FilterService = ({ setFilterService, serviceFilter }: FilterServiceProps) => {
    const { result, loading } = useGetServices();

    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Servicios</p>

            {loading && <p>Cargando servicios...</p>}

            {!loading && result && (
                <RadioGroup 
                    value={serviceFilter} // Asegura que el RadioGroup refleje el estado actual
                    onValueChange={(value) => setFilterService(value)}
                >
                    {result.map((service: ServiceType) => (
                        <div key={service.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={service.serviceName} id={service.serviceName} />
                            <Label htmlFor={service.serviceName}>{service.serviceName}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    );
};

export default FilterService;
