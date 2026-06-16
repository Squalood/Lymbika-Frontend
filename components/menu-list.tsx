"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {ResponseType} from '@/types/response';
import { useGetCategories } from "@/api/getCategories"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useGetClinics } from "@/api/useGetClinics"
import ClinicsList from "./clinicsList"
import CategoryList from "./categoryList"
import { NavbarSectionType } from "@/types/single-types/navbar"

type MenuListProps = {
  navContent?: NavbarSectionType;
};

const MenuList = ({ navContent }: MenuListProps) => {
  const { loading, result,}:ResponseType = useGetCategories();
  const { clinics } = useGetClinics();
  const pathname = usePathname();
  const router = useRouter();

  const navStyle = pathname === "/" ? "" : "text-black"

  const brandImageUrl = navContent?.about_brand_image?.url ?? "/logos/logo-lymbika.svg";

  if (loading) {
    return <div className="grid grid-cols-4 gap-4">
            <Skeleton className=" w-[100px] h-[20px] rounded-full" />
            <Skeleton className=" w-[100px] h-[20px] rounded-full" />
            <Skeleton className=" w-[100px] h-[20px] rounded-full" />
            <Skeleton className=" w-[100px] h-[20px] rounded-full" />
           </div>
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navStyle}>
            {navContent?.about_trigger ?? "Sobre Nosotros"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted to-primary p-6 no-underline outline-none focus:shadow-md"
                    href="/about"
                  >
                    <Image
                        src={brandImageUrl}
                        alt="imagen"
                        width={500}
                        height={500}
                        className="rounded-xl"
                    />
                    <div className="mb-2 mt-4 text-lg font-bold text-muted">
                      {navContent?.about_brand ?? "Lymbika"}
                    </div>
                    <p className="text-sm leading-tight text-muted">
                      {navContent?.about_brand_description ?? "Hacemos la salud accesible: Procesos claros, precios transparentes y una experiencia diseñada para tu comodidad."}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title={navContent?.pharmacy_item_title ?? "Farmacia y Tienda"}>
                {navContent?.pharmacy_item_description ?? "Accede a nuestros artículos"}
              </ListItem>
              <ListItem href="/specialty" title={navContent?.services_item_title ?? "Atención Primaria y Especialidades"}>
                {navContent?.services_item_description ?? "Tratamientos y servicios con doctores especializados."}
              </ListItem>
              <ListItem href="/healthHubs" title={navContent?.doctors_item_title ?? "¿Eres doctor?"}>
                {navContent?.doctors_item_description ?? "Del consultorio al negocio. El sistema operativo de tu práctica médica privada."}
              </ListItem>
              <ListItem href="/membership" title={navContent?.membership_item_title ?? "Planes y Membresías"}>
                {navContent?.membership_item_description ?? "Con nuestra membresía MediClub, accede a medicamentos y productos de la salud a precio de proveedor."}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={navStyle}>
            {navContent?.clinics_trigger ?? "Clínicas"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ClinicsList
              clinics={clinics}
              featuredTitle={navContent?.clinics_featured_title}
              othersTitle={navContent?.clinics_others_title}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={navStyle} onClick={() => router.push("/shop")}>
            {navContent?.pharmacy_trigger ?? "Farmacia"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <CategoryList category={result}/>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/healthHubs/`} className={`${navigationMenuTriggerStyle()} ${navStyle}`}>
              {navContent?.doctors_link ?? "¿Eres doctor?"}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
