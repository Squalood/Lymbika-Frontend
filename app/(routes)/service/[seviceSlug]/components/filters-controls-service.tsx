import FilterService from "./filter-service";
import FilterSurgery from "./filter-sugery";
import { Button } from "@/components/ui/button";

type FiltersControlsServiceProps = {
    setFilterService: (serviceName: string) => void;
    setFilterSurgery: (surgeryName: string) => void;
    serviceFilter: string;
    surgeryFilter: string;
};

const FiltersControlsService = ({ setFilterService, setFilterSurgery, serviceFilter, surgeryFilter }: FiltersControlsServiceProps) => {
    const resetFilters = () => {
        setFilterService("");
        setFilterSurgery("");
    };

    return (
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <FilterService setFilterService={setFilterService} serviceFilter={serviceFilter} />
            <FilterSurgery setFilterSurgery={setFilterSurgery} surgeryFilter={surgeryFilter} />

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
