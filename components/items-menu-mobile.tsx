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
import { useGetCategories } from "@/api/getCategories";
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
            <Link href="/about">Lymbika</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> router.push("/membership")}>
            <span>Membresías</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> router.push("/healthHubs")}>
            <span>{es.navbar.botton4}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row"><Hospital className="mr-2"/>Servicios</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/service")}>
              <span>{es.titleServices}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/surgery")}>
              <span>{es.titlesurgery}</span>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row"><SquareActivity className="mr-2"/>Programas</DropdownMenuLabel>
            <DropdownMenuItem className="flex" onClick={()=> router.push("/programs/weightControl")}>
              <span>{es.navbar.programas.program1}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex" onClick={()=> router.push("/programs/medicalAgent")}>
              <span>{es.navbar.programas.program2}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex" onClick={()=> router.push("/programs/menopause")}>
              <span>{es.navbar.programas.program3}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex" onClick={()=> router.push("/programs/neurotherapy")}>
              <span>{es.navbar.programas.program4}</span>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row" onClick={() => router.push(`/shop`)}><PillBottle className="mr-2"/>Farmacia</DropdownMenuLabel>
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