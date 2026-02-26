import FilterType from "./filter-type";
import { Button } from "@/components/ui/button";

type FiltersControlsCategoryProps = {
    setFilterType: (tipo: string) => void;
    typeFilter: string;
    availableTypes: string[];
};

const FiltersControlsCategory = ({ setFilterType, typeFilter, availableTypes }: FiltersControlsCategoryProps) => {

    const resetFilters = () => {
        setFilterType("");
    };

    return (
        <div className="shrink-0 sm:w-1/5 sm:mt-5 p-6">
            <FilterType setFilterType={setFilterType} typeFilter={typeFilter} availableTypes={availableTypes} />

            {(typeFilter) && (
                <div className="mt-4 text-center">
                    <Button variant="outline" onClick={resetFilters}>
                        Restablecer Filtros
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FiltersControlsCategory;
