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
import { CategoryType } from "@/types/category"
import {ResponseType} from '@/types/response';
import { useGetCategories } from "@/api/getProduct" 
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"

const MenuList = () => {
  const { loading, result,}:ResponseType = useGetCategories(); // Usamos la función para obtener las categorías

  if (loading) {
    return <div className="grid grid-cols-3 gap-4">
            <Skeleton className=" w-[100px] h-[20px] rounded-full" />
            <Skeleton className=" w-[100px] h-[20px] rounded-full" />
            <Skeleton className=" w-[100px] h-[20px] rounded-full" />
           </div>
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre Nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image 
                        src='/logo-lymbika.jpg'
                        alt="imagen" 
                        width={500}
                        height={500}
                        className="rounded-xl"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Lymbika
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Hacemos la salud accesible: Procesos claros, precios transparentes y una experiencia diseñada para tu comodidad.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Farmacia">
                Accede a nuestros artículos
              </ListItem>
              <ListItem href="/service" title="Cirugías">
                Tratamientos y servicios con doctores especializados.
              </ListItem>
              <ListItem href="/mediclub" title="MediClub">
                Con nuestra membresía MediClub, accede a medicamentos y productos de la salud a precio de proveedor. 
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Farmacia</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {!loading &&result?.map((category: CategoryType) => (
                <ListItem
                  key={category.id}
                  title={category.categoryName}
                  href={`/category/${category.slug}`}
                >
                {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem >
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Solicitar cita
            </NavigationMenuLink>
          </Link>
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
