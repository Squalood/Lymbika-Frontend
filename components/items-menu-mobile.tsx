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
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CategoryType } from "@/types/category";
import { useGetCategories } from "@/api/getCategories";
import { ResponseType } from "@/types/response";
import es from "@/locals/es.json";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { LoggedInUser } from "./custom/UserLogin";
import { useGetClinics } from "@/api/useGetClinics";
import { ClinicType } from "@/types/clinic";

interface AuthUserProps {
  username: string;
  email: string;
}
  
interface NavbarProps {
  user: AuthUserProps | null;
}

const ItemsMenuMobile = ({ user }: NavbarProps) => {
  const { loading, result }: ResponseType = useGetCategories();
  const { clinics } = useGetClinics();
  const itemStyle = "w-full px-1 py-1.5 cursor-pointer flex items-center";

  const cart = useCart();
  const { lovedItems } = UseLovedProducts();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" asChild>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuGroup>
            {/* Sobre Nosotros */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <UsersRound className="w-4 h-4" />
              Sobre Nosotros
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/about" className="w-full">
                Lymbika
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/membership" className="w-full">
                Membresías
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/healthHubs" className="w-full">
                {es.navbar.botton4}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Accordion Sections */}
            <Accordion type="multiple" className="w-full">
              {/* Servicios */}
              <AccordionItem value="services">
                <AccordionTrigger className="flex justify-between px-2 gap-2">
                  <div className="flex flex-row gap-2 font-semibold">
                    <Hospital className="w-4 h-4" />
                    Servicios
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <DropdownMenuItem asChild>
                    <Link href="/service" className={itemStyle}>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      {es.titleServices}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/surgery" className={itemStyle}>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      {es.titlesurgery}
                    </Link>
                  </DropdownMenuItem>
                </AccordionContent>
              </AccordionItem>

              {/* Clinicas */}
              <AccordionItem value="clinics">
                <AccordionTrigger className="flex justify-between px-2 gap-2">
                  <div className="flex flex-row gap-2 font-semibold">
                    <SquareActivity className="w-4 h-4" />
                    Clínicas
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {clinics?.map((clinic: ClinicType) => (
                    <DropdownMenuItem key={clinic.id} asChild>
                      <Link href={`/clinics/${clinic.slug}`} className={itemStyle}>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        {clinic.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Farmacia */}
              <AccordionItem value="pharmacy">
                <AccordionTrigger className="flex justify-between px-2 gap-2" >
                  <Link href={`/shop`}>
                    <div className="flex flex-row gap-2 font-semibold">
                      <PillBottle className="w-4 h-4" />
                      Farmacia
                    </div>
                  </Link>
                </AccordionTrigger>
                <AccordionContent>
                  {!loading &&
                    Array.isArray(result) &&
                    result.map((category: CategoryType) => (
                      <DropdownMenuItem asChild key={category.id}>
                        <Link href={`/category/${category.slug}`} className={itemStyle}>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          {category.categoryName}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <DropdownMenuSeparator />

            {/* Cuenta */}
            <DropdownMenuItem asChild>
              <Link href="/cart" className="w-full flex items-center">
                {cart.items.length === 0 ? (
                  <div className="flex flex-row gap-2">
                    <ShoppingCart strokeWidth={1} className="mr-2 w-4 h-4" />
                    Carrito
                  </div>
                ):(
                  <div className="flex flex-row gap-2">
                    <ShoppingCart strokeWidth={1} className="mr-2 w-4 h-4" />
                    Carrito
                    <span className="font-semibold">{cart.items.length}</span>
                  </div>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/loved-products" className="w-full flex items-center">
                {lovedItems.length === 0 ? (
                  <div className="flex flex-row gap-2">
                    <Heart strokeWidth={1} className="mr-2 w-4 h-4" />
                    Mi Lista
                  </div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <Heart strokeWidth={1} className="mr-2 w-4 h-4" />
                    Mi Lista
                    <span className="font-semibold">{lovedItems.length}</span>
                  </div>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="w-full flex items-center text-slate-500">
                <User strokeWidth={1} className="mr-2 w-4 h-4" />
                Usuario
                <div className="text-slate-400">
                  {user ? <LoggedInUser userData={user} /> : null}
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ItemsMenuMobile;