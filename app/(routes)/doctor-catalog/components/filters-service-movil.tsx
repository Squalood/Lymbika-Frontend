import FilterService from "./filter-service";
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
    serviceFilter: string;
};

const FiltersControlsServiceMovil = ({ setFilterService, serviceFilter }: FiltersControlsServiceProps) => {
    const resetFilters = () => {
        setFilterService("");
    };

    const hasActiveFilters = Boolean(serviceFilter);
    const activeFiltersCount = hasActiveFilters ? 1 : 0;

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