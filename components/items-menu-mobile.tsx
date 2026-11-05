"use client";

import {
  User,
  Menu,
  ShoppingCart,
  Heart,
  PillBottle,
  UsersRound,
  SquareActivity,
  ChevronRight,
  Stethoscope,
  Scissors,
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
import { useGetCategories } from "@/hooks/use-categories";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { LoggedInUser } from "./custom/UserLogin";
import { useGetClinics } from "@/hooks/use-clinics";
import { useGetFeaturedSurgeries, FeaturedSurgeryType } from "@/hooks/use-featured-surgeries";
import { ClinicType } from "@/types/clinic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NavbarSectionType } from "@/types/single-types/navbar";

interface AuthUserProps {
  username: string;
  email: string;
}

interface NavbarProps {
  user: AuthUserProps | null;
  navContent?: NavbarSectionType;
}

const ItemsMenuMobile = ({ user, navContent }: NavbarProps) => {
  const { loading, result } = useGetCategories();
  const { clinics } = useGetClinics();
  const { surgeries, loading: loadingSurgeries } = useGetFeaturedSurgeries();
  const cart = useCart();
  const { lovedItems } = UseLovedProducts();

  const menuItemClass =
    "flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-md transition-colors text-sm";
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
            <SheetTitle>{navContent?.mobile_menu_title ?? "Menú"}</SheetTitle>
          </SheetHeader>

          <div className="py-4">
            {/* Sobre Nosotros Section */}
            <div className="px-4 mb-4">
              <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-muted-foreground">
                <UsersRound className="w-4 h-4" />
                {navContent?.about_trigger ?? "Sobre Nosotros"}
              </div>
              <div className="space-y-1 mt-2">
                <Link href="/about" className={menuItemClass}>
                  {navContent?.about_brand ?? "Lymbika"}
                </Link>
                <Link href="/membership" className={menuItemClass}>
                  {navContent?.membership_item_title ?? "Membresías"}
                </Link>
                <Link href="/specialty" className={menuItemClass}>
                  {navContent?.services_item_title ?? "Especialidades médicas"}
                </Link>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="px-4">
              <Accordion type="multiple" className="w-full">
                {/* Cirugías */}
                {(loadingSurgeries || surgeries.length > 0) && (
                  <AccordionItem value="surgeries" className="border-none">
                    <AccordionTrigger className="px-2 py-3 hover:no-underline hover:bg-accent rounded-md">
                      <div className="flex items-center gap-2 font-semibold">
                        <Scissors className="w-4 h-4" />
                        {navContent?.surgeries_trigger ?? "Cirugías"}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="space-y-1 pl-2 mt-1">
                        {surgeries.map((item: FeaturedSurgeryType) => (
                          <Link
                            key={item.service.id}
                            href={`/specialty/${item.service.specialty!.slug}/${item.service.slug}`}
                            className={subItemClass}
                          >
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            {item.service.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Clínicas */}
                <AccordionItem value="clinics" className="border-none">
                  <AccordionTrigger className="px-2 py-3 hover:no-underline hover:bg-accent rounded-md">
                    <div className="flex items-center gap-2 font-semibold">
                      <SquareActivity className="w-4 h-4" />
                      {navContent?.clinics_trigger ?? "Clínicas"}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-1 pl-2 mt-1">
                      {(() => {
                        const sorted = [...(clinics ?? [])].sort((a, b) =>
                          a.title.localeCompare(b.title, "es")
                        );
                        const featured = sorted.filter((c) => c.featuredClinic);
                        const rest = sorted.filter((c) => !c.featuredClinic);
                        return (
                          <>
                            {featured.map((clinic: ClinicType) => (
                              <Link
                                key={clinic.id}
                                href={`/clinics/${clinic.slug}`}
                                className={subItemClass}
                              >
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                {clinic.title}
                              </Link>
                            ))}
                            {featured.length > 0 && rest.length > 0 && (
                              <Separator className="my-1" />
                            )}
                            {rest.map((clinic: ClinicType) => (
                              <Link
                                key={clinic.id}
                                href={`/clinics/${clinic.slug}`}
                                className={subItemClass}
                              >
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                {clinic.title}
                              </Link>
                            ))}
                          </>
                        );
                      })()}
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
                      {navContent?.pharmacy_trigger ?? "Farmacia"}
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

            {/* Médicos y Hospitales */}
            <div className="px-4">
              <Link
                href="/healthHubs"
                className="flex items-center gap-2 px-2 py-3 text-sm hover:bg-accent rounded-md transition-colors"
              >
                <Stethoscope className="w-4 h-4" />
                <span className="flex-1">
                  {navContent?.doctors_link ?? "¿Eres doctor?"}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>

            <Separator className="my-4" />

            {/* Cuenta Section */}
            <div className="px-4">
              <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-muted-foreground">
                {navContent?.mobile_account_section ?? "Cuenta"}
              </div>
              <div className="space-y-1 mt-2">
                <Link href="/cart" className={menuItemClass}>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="flex-1">{navContent?.mobile_cart_link ?? "Carrito"}</span>
                  {cart.items.length > 0 && (
                    <span className="font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                      {cart.items.length}
                    </span>
                  )}
                </Link>
                <Link href="/loved-products" className={menuItemClass}>
                  <Heart className="w-4 h-4" />
                  <span className="flex-1">{navContent?.mobile_wishlist_link ?? "Mi Lista"}</span>
                  {lovedItems.length > 0 && (
                    <span className="font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                      {lovedItems.length}
                    </span>
                  )}
                </Link>
                <Link href="/dashboard" className={menuItemClass}>
                  <User className="w-4 h-4" />
                  <span className="flex-1">{navContent?.mobile_user_link ?? "Usuario"}</span>
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
