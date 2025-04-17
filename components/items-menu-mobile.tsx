"use client";
import {
  User,
  Menu,
  ShoppingCart,
  Heart,
  Hospital,
  PillBottle,
  UsersRound,
  SquareActivity,
} from "lucide-react"
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/category";
import { useGetCategories } from "@/api/getProduct";
import {ResponseType} from '@/types/response';
import es from "@/locals/es.json";

const ItemsMenuMobile = () => {
  const router = useRouter()
  const { loading, result,}:ResponseType = useGetCategories();

  return ( 
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><Menu/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex flex-row"><UsersRound className="mr-2"/> Sobre Nosotros</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/">Lymbika</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> router.push("/membership")}>
            <span>Membresías</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row"><Hospital className="mr-2"/>Servicios</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/doctor-catalog")}>
              <span>{es.navbar.botton4}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/service")}>
              <span>{es.titleServices}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/surgery")}>
              <span>{es.titlesurgery}</span>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row"><SquareActivity className="mr-2"/>Programas</DropdownMenuLabel>
            <DropdownMenuItem className="flex" onClick={()=> router.push("/membership")}>
              <span>Control de Peso Integral</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex" onClick={()=> router.push("/membership")}>
              <span>Agente Médico</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex" onClick={()=> router.push("/membership")}>
              <span>Salud Hormonal</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex" onClick={()=> router.push("/membership")}>
              <span>Medicina Estética</span>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row"><PillBottle className="mr-2"/>Farmacia</DropdownMenuLabel>
          {!loading && Array.isArray(result) && result.length > 0 && result.map((category: CategoryType) => (
            <DropdownMenuItem key={category.id} className="cursor-pointer" onClick={() => router.push(`/category/${category.slug}`)}>
              <p>{category.categoryName}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/cart")}>
            <ShoppingCart strokeWidth="1"/>Cart
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/loved-products")}>
            <Heart strokeWidth="1"/>Mi lista
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/dashboard")}>
            <User strokeWidth="1"/>
            Usuario
          </DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ItemsMenuMobile;