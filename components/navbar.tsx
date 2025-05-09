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

    const textColor = pathname === "/" ? "text-background" : "text-black";
    const fillColor = lovedItems.length > 0 ? (pathname === "/" ? "fill-background" : "fill-black") : "";
    const positionAbs = pathname === "/" ? "absolute top-8 left-0 right-0 z-50" : "";

    return (
        <div className={`${positionAbs} flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl`}>
            <h1 className={`text-3xl ${textColor} cursor-pointer`} onClick={() => router.push("/")}>
                Lym<span className="font-bold">bika</span>
            </h1>
            <div className="items-center justify-between hidden lg:flex">
                <MenuList />
            </div>

            <div className="items-center justify-between gap-2 sm:gap-2 hidden lg:flex">
                <Button variant="ghost" size="icon" className={`${textColor} hover:${!textColor}`}>
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
            <div className="flex lg:hidden">
                <ItemsMenuMobile />
            </div>
        </div>
    );
};

export default Navbar;
