"use client";
import { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";

const PageSuccess = () => {
    const { removeAll } = useCart();

    useEffect(() => {
        removeAll();
    }, []); // Se ejecuta cuando el usuario llega a esta página

    return ( 
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">¡Pago exitoso! 🎉</h1>
            <p className="mt-2">Gracias por tu compra.</p>
        </div>
     );
}
 
export default PageSuccess;