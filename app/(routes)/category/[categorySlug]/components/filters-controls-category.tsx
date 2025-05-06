import FilterType from "./filter-type";
import { Button } from "@/components/ui/button";

type FiltersControlsCategoryProps = {
    setFilterType: (tipo: string) => void;
    typeFilter: string;
};

const FiltersControlsCategory = ({ setFilterType, typeFilter }: FiltersControlsCategoryProps) => {
    
    // Resetear filtro
    const resetFilters = () => {
        setFilterType("");  // Restablece el filtro a un valor vacío
    };

    return ( 
        <div className="sm:w-1/5 sm:mt-5 p-6">
            <FilterType setFilterType={setFilterType} typeFilter={typeFilter} />

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
