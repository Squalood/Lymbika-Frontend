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

const MenuList = () => {
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
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Lymbika
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    Hacemos la salud accesible: Procesos claros, precios transparentes y una experiencia diseñada para tu comodidad.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a nuestros articulos
              </ListItem>
              <ListItem href="/services" title="Cirugias">
                Tratamientos y servicios con doctores especializados.
              </ListItem>
              <ListItem href="/mediclub" title="MediClub">
              Con nuestra membresía MediClub, accede a medicamentos y productos de la salud a precio de proveedor. 
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tienda</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
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

const components: { title: string; href: string; description: string }[] = [
    {
      title: "Medicamentos",
      href: "/category/medicamentos",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Suplementos",
      href: "/category/suplementos",
      description:
        "Curabitur vel libero malesuada, porta urna non, molestie leo.",
    },
    {
      title: "Pediatrico",
      href: "/category/pediatrico",
      description:
        " Vestibulum enim neque, consequat id accumsan malesuada, varius id orci.",
    },
    {
      title: "Cronicos",
      href: "/category/cronicos",
      description: "Morbi quis ligula tempor erat fringilla elementum nec a quam. Etiam quam sapien, fringilla eget risus et, rutrum consequat eros.",
    },
    {
      title: "Cuidado y Belleza",
      href: "/category/cuidado-belleza",
      description:
        "In ex purus, placerat id sodales vitae, auctor sit amet felis. Nulla facilisi.",
    },
    {
      title: "Especiales",
      href: "/category/especiales",
      description:
        "Morbi pellentesque, turpis vel gravida vulputate, sem diam rutrum orci, eu rutrum tortor mi quis elit.",
    },
  ]

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