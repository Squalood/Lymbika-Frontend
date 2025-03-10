"use client"
import { Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";

const Navbar = () => {
    const router = useRouter()
    const cart = useCart()
    const {lovedItems} = UseLovedProducts()

    return ( 
        <div className="flex items-center justify-between p-4 mx-auto sm-max-w-4xl md:max-w-6xl">
            <h1 className="text-3xl cursor-pointer" onClick={() => router.push("/")}>Lym
                <span className="font-bold">bika</span>
            </h1>
            <div className="items-center justify-between hidden sm:flex">
                <MenuList />
            </div>
            
            <div className="items-center justify-between gap-2 sm:gap-7 hidden sm:flex">
                {cart.items.length == 0 ? 
                    <ShoppingCart 
                        strokeWidth="1"
                        className="cursor-pointer"
                        onClick={()=> router.push ("/cart")}
                    /> 
                    : (
                        <div className="flex gap-1" onClick={() => router.push("/cart")}>
                            <ShoppingCart strokeWidth={1} className="cursor-pointer"/>
                            <span>{cart.items.length}</span>
                        </div>
                    
                )}
                <Heart 
                    strokeWidth="1" 
                    className={` ${lovedItems.length > 0 && 'fill-black dark:fill-white'}`}
                    onClick={()=> router.push("/loved-products")}
                />
                <User strokeWidth={1} className="cursor-pointer" />

                

                {false && <ToggleTheme />}
            </div>
            <div className="flex sm:hidden">
                <ItemsMenuMobile/>
            </div>
        </div>
     );
}

export default Navbar;