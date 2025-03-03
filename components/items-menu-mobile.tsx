import {Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Menu } from "lucide-react";
import Link from "next/link";

const ItemsMenuMobile = () => {
    return ( 
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                <Link href="/category/medicamentos" className="block">Medicamentos</Link>
                <Link href="/category/" className="block">Suplementos</Link>
                <Link href="/category/" className="block">Pediátrico</Link>
                <Link href="/category/" className="block">Crónicos</Link>
                <Link href="/category/" className="block">Cuidado y Belleza</Link>
                <Link href="/category/" className="block">Especiales</Link>
            </PopoverContent>
        </Popover>
     );
}
 
export default ItemsMenuMobile;