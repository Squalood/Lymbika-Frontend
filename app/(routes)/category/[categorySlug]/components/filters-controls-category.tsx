import FilterType from "./filter-type";

type FiltersControlsCategoryProps = {
    setFilterType: (tipo: string) => void
}

const FiltersControlsCategory = (props:FiltersControlsCategoryProps) => {
    const {setFilterType} = props
    return ( 
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <FilterType setFilterType={setFilterType}/>
        </div>
     );
}
 
export default FiltersControlsCategory;