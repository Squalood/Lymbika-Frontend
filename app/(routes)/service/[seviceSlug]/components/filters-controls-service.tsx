import FilterService from "./filter-service";


type FiltersControlsServiceProps = {
    setFilterService: (serviceName: string) => void
}

const FiltersControlsService = (props:FiltersControlsServiceProps) => {
    const {setFilterService} = props
    return ( 
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <FilterService setFilterService={setFilterService}/>
        </div>
     );
}
 
export default FiltersControlsService;