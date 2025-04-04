"use client";
import {
  User,
  Menu,
  ShoppingCart,
  Heart,
  Phone,
  SquareAsterisk,
  Hospital,
  PillBottle,
  UsersRound,
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/category";
import { useGetCategories } from "@/api/getProduct";
import {ResponseType} from '@/types/response';

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
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row"><Hospital className="mr-2"/>Servicios</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/service")}>
            <span>Servicios medicos y cirugias</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row"><SquareAsterisk className="mr-2"/>Membresias</DropdownMenuLabel>
          <DropdownMenuItem onClick={()=> router.push("/membership")}>
            <span>MediClub</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row"><PillBottle className="mr-2"/>Farmacia</DropdownMenuLabel>
          {!loading && Array.isArray(result) && result.length > 0 && result.map((category: CategoryType) => (
            <DropdownMenuItem key={category.id} className="cursor-pointer" onClick={() => router.push(`/category/${category.slug}`)}>
              <p>{category.categoryName}</p>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="flex flex-row" href={"https://wa.me/526561100446"}><Phone className="mr-2"/>Solicitar Cita </Link>
          </DropdownMenuItem>
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