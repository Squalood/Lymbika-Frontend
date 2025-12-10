"use client"
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { LoggedInUser } from "./custom/UserLogin";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { SearchGeneral } from "./searchGeneral";
import { useGetProducts } from "@/api/getProducts";
import { AnimatePresence, motion } from "framer-motion";
import { useGetDoctors } from "@/api/getDoctor";
import { useGetServices } from "@/api/getService";
import { ResponseType } from "@/types/response";
import { useGetSugery } from "@/api/getSugery";
import { useGetCategories } from "@/api/getCategories";

interface AuthUserProps {
    username: string;
    email: string;
  }
  
  interface NavbarProps {
    user: AuthUserProps | null;
  }

  const Navbar = ({ user }: NavbarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const cart = useCart();
    const { lovedItems } = UseLovedProducts();
    
    const { products } = useGetProducts();
    const { doctors } = useGetDoctors();
    const { result: services }: ResponseType = useGetServices();
    const { result: surgery }: ResponseType = useGetSugery();
    const { result: category }: ResponseType = useGetCategories();
    

    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null)

    const textColor = pathname === "/" ? "text-background" : "text-black";
    const fillColor = lovedItems.length > 0 ? (pathname === "/" ? "fill-background" : "fill-black") : "";
    const positionAbs = pathname === "/" ? "absolute top-8 left-0 right-0 z-50" : "";
    const positionSea = pathname === "/" ? "absolute top-24 left-0 right-0 z-50" : "";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowSearch(false);
        }
        };

        if (showSearch) {
        document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSearch]);

    return (
        <div ref={searchRef}>
            <div className={`${positionAbs} flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl`}>
                <h1 className={`text-2xl ${textColor} cursor-pointer`} onClick={() => router.push("/")}>
                    Lymbika <span className="font-bold">Healthcare</span>
                </h1>
                <div className="items-center justify-between hidden lg:flex z-50">
                    <MenuList />  
                </div>

                <div className="items-center justify-between gap-2 sm:gap-2 hidden lg:flex">
                    <Button variant="ghost" size="icon" className={`${textColor} hover:${!textColor}`} onClick={() => setShowSearch((prev) => !prev)} aria-label="Mostrar búsqueda">
                        <Search/>
                    </Button>

                    {cart.items.length === 0 ? (
                    <Button variant="ghost" size="icon" className={`${textColor} hover:${!textColor}`} onClick={() => router.push("/cart")}>
                        <ShoppingCart />
                    </Button>
                    ) : (
                    <div className="flex gap-1" onClick={() => router.push("/cart")}>
                        <Button variant="ghost" size="sm" className={`${textColor} hover:${!textColor}`}>
                            <ShoppingCart />
                            <span>{cart.items.length}</span>
                        </Button>
                    </div>
                    )}

                    {lovedItems.length === 0 ? (
                    <Button variant="ghost" size="sm" className={`${textColor} hover:${!textColor}`} onClick={() => router.push("/loved-products")}>
                        <Heart className={`${fillColor}`}/>
                    </Button>
                    ) : (
                    <Button variant="ghost" size="sm" className={`${textColor} hover:${!textColor}`} onClick={() => router.push("/loved-products")}>
                        <Heart className={`${fillColor}`}/>
                        <span>{lovedItems.length}</span>
                    </Button>
                    )}

                    
                    {/* Icono de usuario con nombre */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/dashboard")}>
                        <Button variant="ghost" size="sm" className={`${textColor} hover:${!textColor}`}>
                            <User />
                            {user ? <LoggedInUser userData={user} /> : null}
                        </Button>
                    </div>

                    {false && <ToggleTheme />}
                </div>

                <div className="flex gap-3 lg:hidden">
                    <Button variant="ghost" size="icon" className={`${textColor} hover:${!textColor}`} onClick={() => setShowSearch((prev) => !prev)} aria-label="Mostrar búsqueda">
                        <Search/>
                    </Button>
                    <ItemsMenuMobile user={user} />
                </div>
            </div>
            <div className={`${positionSea} relative flex justify-end w-full lg:max-w-5xl xl:max-w-6xl mx-auto `}>
                <AnimatePresence>
                    {showSearch && (
                    <motion.div
                        key="search-bar"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full w-full sm:w-96 z-50 mt-2"
                    >
                        <SearchGeneral allProducts={products} allDoctors={doctors} allServices={services} allSurgeries={surgery} allCategories={category} />
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Navbar;
