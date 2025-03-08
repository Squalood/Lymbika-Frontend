import {
  Menu,
} from "lucide-react"
//import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";
import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";

type FilterTypeProps = {
    setFilterType: (tipo: string) => void
}

const ItemsFilterMobile = (props:FilterTypeProps) => {
    const {setFilterType} = props
    const {result, loading}:FilterTypes = useGetProductField()

  return ( 
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Tipos<Menu/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {loading && result == null && (
            <p>cargando Origen....</p>
        )}
        <RadioGroup onValueChange={(value) => setFilterType(value)}>
            {result != null && result.schema.attributes.tipo.enum.map((tipo:string) => (
                <div key={tipo} className="flex itmes-center space space-x-2">
                    <RadioGroupItem value={tipo} id={tipo}/>
                    <Label htmlFor={tipo}>{tipo}</Label>
                </div>
            ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ItemsFilterMobile;