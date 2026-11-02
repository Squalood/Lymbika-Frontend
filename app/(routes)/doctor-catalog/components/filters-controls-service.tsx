import FilterService from "./filter-service";
import { Button } from "@/components/ui/button";

type FiltersControlsServiceProps = {
    setFilterService: (serviceName: string) => void;
    serviceFilter: string;
};

const FiltersControlsService = ({ setFilterService, serviceFilter }: FiltersControlsServiceProps) => {
    const resetFilters = () => {
        setFilterService("");
    };

    return (
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <FilterService setFilterService={setFilterService} serviceFilter={serviceFilter} />

            {serviceFilter && (
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
