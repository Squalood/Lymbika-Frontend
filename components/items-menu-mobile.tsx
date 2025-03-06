import {
  User,
  Menu,
  ShoppingCart,
  Heart,
} from "lucide-react"
//import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import router from "next/router";

const ItemsMenuMobile = () => {
    return ( 
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"><Menu/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sobre Nostros</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Lymbika</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Tienda</DropdownMenuLabel>
            <DropdownMenuItem>
              <span>Medicamentos</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Suplementos</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Pediatrico</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Cronicos</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Cuidado y Belleza</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Especiales</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Servicios</DropdownMenuLabel>
            <DropdownMenuItem>
              <span>Cirugias</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Membresias</DropdownMenuLabel>
            <DropdownMenuItem>
              <span>MediClub</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Solicitar Cita</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <ShoppingCart 
                strokeWidth="1"
                className="cursor-pointer"
                onClick={()=> router.push ("/cart")}
              />
              <span>Cart</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Heart 
                strokeWidth="1"
                className="cursor-pointer"
                onClick={()=> router.push ("/cart")}
              />
              <span>Mi lista</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User 
                strokeWidth="1"
                className="cursor-pointer"
              />
              <span>Usuario</span>
            </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
     );
}



 
export default ItemsMenuMobile;