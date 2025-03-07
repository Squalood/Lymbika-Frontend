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
        <DropdownMenuLabel>Sobre Nosotros</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/">Lymbika</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Tienda</DropdownMenuLabel>
          {!loading && Array.isArray(result) && result.length > 0 && result.map((category: CategoryType) => (
            <DropdownMenuItem key={category.id} className="cursor-pointer" onClick={() => router.push(`/category/${category.slug}`)}>
              <p>{category.categoryName}</p>
            </DropdownMenuItem>
          ))}
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
          <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/cart")}>
            <ShoppingCart strokeWidth="1"/>Cart
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/loved-products")}>
            <Heart strokeWidth="1"/>Mi lista
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/")}>
            <User strokeWidth="1"/>
            Usuario
          </DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ItemsMenuMobile;