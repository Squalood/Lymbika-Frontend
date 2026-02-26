import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type FilterTypeProps = {
    setFilterType: (tipo: string) => void;
    availableTypes: string[];
}

const ItemsFilterMobile = ({ setFilterType, availableTypes }: FilterTypeProps) => {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"><Menu/>Tipos</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <RadioGroup onValueChange={(value) => setFilterType(value)}>
              {availableTypes.map((tipo: string) => (
                  <div key={tipo} className="flex items-center space-x-2">
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
