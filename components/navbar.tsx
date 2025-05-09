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
    const { products, loading } = useGetProducts();

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

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div ref={searchRef}>
            <div className={`${positionAbs} flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl`}>
                <h1 className={`text-3xl ${textColor} cursor-pointer`} onClick={() => router.push("/")}>
                    Lym<span className="font-bold">bika</span>
                </h1>
                <div className="items-center justify-between hidden lg:flex">
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
                    <Button variant="ghost" size={"icon"} className={`${textColor} hover:${!textColor}`} onClick={() => router.push("/loved-products")}>
                        <Heart className={`${fillColor}`}/>
                    </Button>
                    
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
                    <ItemsMenuMobile />
                </div>
            </div>
            <div className={`${positionSea} relative flex justify-end mx-auto lg:max-w-5xl xl:max-w-6xl`}>
                <AnimatePresence>
                    {showSearch && (
                    <motion.div
                        key="search-bar"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full right-1 w-96 z-50 mt-2"
                    >
                        <SearchGeneral allProducts={products} />
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Navbar;
