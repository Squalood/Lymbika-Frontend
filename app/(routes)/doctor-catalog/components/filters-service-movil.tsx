import FilterService from "./filter-service";
import FilterSurgery from "./filter-sugery";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, X } from "lucide-react";

type FiltersControlsServiceProps = {
    setFilterService: (serviceName: string) => void;
    setFilterSurgery: (surgeryName: string) => void;
    serviceFilter: string;
    surgeryFilter: string;
};

const FiltersControlsServiceMovil = ({ setFilterService, setFilterSurgery, serviceFilter, surgeryFilter }: FiltersControlsServiceProps) => {
    const resetFilters = () => {
        setFilterService("");
        setFilterSurgery("");
    };

    const hasActiveFilters = serviceFilter || surgeryFilter;
    const activeFiltersCount = [serviceFilter, surgeryFilter].filter(Boolean).length;

    return (
        <div className="sm:w-[200px] sm:mt-5 p-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtros
                        {hasActiveFilters && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {activeFiltersCount}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[280px] max-h-[500px] overflow-y-auto" align="start">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <div className="p-2">
                        <FilterService setFilterService={setFilterService} serviceFilter={serviceFilter} />
                        <FilterSurgery setFilterSurgery={setFilterSurgery} surgeryFilter={surgeryFilter} />
                    </div>

                    {hasActiveFilters && (
                        <>
                            <DropdownMenuSeparator />
                            <div className="p-2">
                                <Button 
                                    variant="outline" 
                                    onClick={resetFilters} 
                                    className="w-full"
                                    size="sm"
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Restablecer Filtros
                                </Button>
                            </div>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default FiltersControlsServiceMovil;