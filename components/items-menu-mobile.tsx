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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { CategoryType } from "@/types/category";
import { useGetCategories } from "@/api/getCategories";
import { ResponseType } from "@/types/response";
import es from "@/locals/es.json";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { LoggedInUser } from "./custom/UserLogin";
import { useGetClinics } from "@/api/useGetClinics";
import { ClinicType } from "@/types/clinic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
  const cart = useCart();
  const { lovedItems } = UseLovedProducts();

  const menuItemClass =
    "flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-md transition-colors";
  const subItemClass =
    "flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md transition-colors text-sm";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-3/4 rounded-l-lg p-0">
        <ScrollArea className="h-full">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>Menú</SheetTitle>
          </SheetHeader>

          <div className="py-4">
            {/* Sobre Nosotros Section */}
            <div className="px-4 mb-4">
              <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-muted-foreground">
                <UsersRound className="w-4 h-4" />
                Sobre Nosotros
              </div>
              <div className="space-y-1 mt-2">
                <Link href="/about" className={menuItemClass}>
                  Lymbika
                </Link>
                <Link href="/membership" className={menuItemClass}>
                  Membresías
                </Link>
                <Link href="/healthHubs" className={menuItemClass}>
                  {es.navbar.botton4}
                </Link>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Accordion Sections */}
            <div className="px-4">
              <Accordion type="multiple" className="w-full">
                {/* Servicios */}
                <AccordionItem value="services" className="border-none">
                  <AccordionTrigger className="px-2 py-3 hover:no-underline hover:bg-accent rounded-md">
                    <div className="flex items-center gap-2 font-semibold">
                      <Hospital className="w-4 h-4" />
                      Servicios
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-1 pl-2 mt-1">
                      <Link href="/service" className={subItemClass}>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        {es.titleServices}
                      </Link>
                      <Link href="/surgery" className={subItemClass}>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        {es.titlesurgery}
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Clínicas */}
                <AccordionItem value="clinics" className="border-none">
                  <AccordionTrigger className="px-2 py-3 hover:no-underline hover:bg-accent rounded-md">
                    <div className="flex items-center gap-2 font-semibold">
                      <SquareActivity className="w-4 h-4" />
                      Clínicas
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-1 pl-2 mt-1">
                      {clinics?.sort((a, b) => a.title.localeCompare(b.title, "es")).map((clinic: ClinicType) => (
                          <Link
                            key={clinic.id}
                            href={`/clinics/${clinic.slug}`}
                            className={subItemClass}
                          >
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            {clinic.title}
                          </Link>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Farmacia */}
                <AccordionItem value="pharmacy" className="border-none">
                  <AccordionTrigger className="px-2 py-3 hover:no-underline hover:bg-accent rounded-md">
                    <Link
                      href="/shop"
                      className="flex items-center gap-2 font-semibold flex-1"
                    >
                      <PillBottle className="w-4 h-4" />
                      Farmacia
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-1 pl-2 mt-1">
                      {!loading &&
                        Array.isArray(result) &&
                        result.map((category: CategoryType) => (
                          <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className={subItemClass}
                          >
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            {category.categoryName}
                          </Link>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Separator className="my-4" />

            {/* Cuenta Section */}
            <div className="px-4">
              <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-muted-foreground">
                Cuenta
              </div>
              <div className="space-y-1 mt-2">
                <Link href="/cart" className={menuItemClass}>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="flex-1">Carrito</span>
                  {cart.items.length > 0 && (
                    <span className="font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                      {cart.items.length}
                    </span>
                  )}
                </Link>
                <Link href="/loved-products" className={menuItemClass}>
                  <Heart className="w-4 h-4" />
                  <span className="flex-1">Mi Lista</span>
                  {lovedItems.length > 0 && (
                    <span className="font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                      {lovedItems.length}
                    </span>
                  )}
                </Link>
                <Link href="/dashboard" className={menuItemClass}>
                  <User className="w-4 h-4" />
                  <span className="flex-1">Usuario</span>
                  {user && (
                    <div className="text-xs text-muted-foreground">
                      <LoggedInUser userData={user} />
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ItemsMenuMobile;
