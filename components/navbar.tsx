"use client"
import { Heart, ShoppingCart, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { LoggedInUser } from "./custom/UserLogin";

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
    const strokeColor = pathname === "/" ? "stroke-background" : "stroke-black";
    const fillColor = lovedItems.length > 0 ? (pathname === "/" ? "fill-background" : "fill-black") : "";
    const positionAbs = pathname === "/" ? "absolute top-8 left-0 right-0 z-50" : "";

    return (
        <div className={`${positionAbs} flex items-center justify-between p-4 mx-auto sm-max-w-4xl md:max-w-6xl`}>
            <h1 className={`text-3xl ${textColor} cursor-pointer`} onClick={() => router.push("/")}>
                Lym<span className="font-bold">bika</span>
            </h1>
            <div className="items-center justify-between hidden sm:flex">
                <MenuList />
            </div>

            <div className="items-center justify-between gap-2 sm:gap-7 hidden sm:flex">
                {cart.items.length === 0 ? (
                    <ShoppingCart strokeWidth="1" className={`cursor-pointer ${strokeColor}`} onClick={() => router.push("/cart")} />
                ) : (
                    <div className="flex gap-1" onClick={() => router.push("/cart")}>
                        <ShoppingCart strokeWidth={1} className={`cursor-pointer ${strokeColor}`} />
                        <span className={textColor}>{cart.items.length}</span>
                    </div>
                )}
                <Heart strokeWidth="1" className={`${fillColor} ${strokeColor}`} onClick={() => router.push("/loved-products")} />
                
                {/* Icono de usuario con nombre */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/dashboard")}>
                    <User strokeWidth={1} className={strokeColor} />
                    {user ? <LoggedInUser userData={user} /> : null}
                </div>

                {false && <ToggleTheme />}
            </div>
            <div className="flex sm:hidden">
                <ItemsMenuMobile />
            </div>
        </div>
    );
};

export default Navbar;
