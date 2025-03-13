import FilterService from "./filter-service";
import FilterSurgery from "./filter-sugery";
import { Button } from "@/components/ui/button";

type FiltersControlsServiceProps = {
    setFilterService: (serviceName: string) => void;
    setFilterSurgery: (surgeryName: string) => void;
    serviceFilter: string;
    surgeryFilter: string;
};

const FiltersControlsService = (props: FiltersControlsServiceProps) => {
    const { setFilterService, setFilterSurgery, serviceFilter, surgeryFilter } = props;

    const resetFilters = () => {
        setFilterService("");
        setFilterSurgery("");
    };

    return (
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <FilterService setFilterService={setFilterService} />
            <FilterSurgery setFilterSurgery={setFilterSurgery} />

            {/* Botón de reset, solo se muestra si hay filtros activos */}
            {(serviceFilter || surgeryFilter) && (
                <div className="mt-4 text-center">
                    <Button variant="outline" onClick={resetFilters}>
                        Restablecer Filtros
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FiltersControlsService;
