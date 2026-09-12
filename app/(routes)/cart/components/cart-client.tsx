//cart-client.tsx correcto

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import * as gtag from "@/lib/gtag";
import { crearSesionDePago } from "@/app/data/actions/checkout-actions";
import { CartHeader } from "./cart-header";
import { CartEmptyState } from "./cart-empty-state";
import { CartProductsList } from "./cart-products-list";
import { CartSummary } from "./cart-summary";
import { CartMobileBar } from "./cart-mobile-bar";
import { AuthUserProps } from "./types";
import { DELIVERY_COST, getItemPrice } from "./pricing";


interface CartClientPageProps {
  user: AuthUserProps | null;
}


export default function CartClientPage({ user }: CartClientPageProps) {
  const router = useRouter();
  const { items, removeAll } = useCart();
  const [isDelivery, setIsDelivery] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const deliveryCost = isDelivery ? DELIVERY_COST : 0;
  const totalPrice = items.reduce((total, item) => {
    const price = getItemPrice(item, user);
    return total + (price * item.quantity);
  }, 0);
  const finalTotal = totalPrice + deliveryCost;

  const buyStripe = async () => {
    setProcesando(true);

    // Solo id y cantidad: el precio lo resuelve el servidor.
    const res = await crearSesionDePago(
      items.map(({ id, quantity }) => ({ id, quantity })),
      isDelivery
    );

    if ("error" in res) {
      setProcesando(false);
      toast.error(res.error);
      return;
    }

    window.location.href = res.url;
  };

  const handleBuyClick = () => {
    if (procesando) return;

    if (!user) {
      toast.warning("Debes estar registrado para completar la compra", {
        action: {
          label: "Iniciar sesión",
          onClick: () => router.push("/signin"),
        },
      });
      gtag.event({
        action: "click_buy_no_user",
        category: "engagement",
        label: "Intento de compra sin iniciar sesión",
      });
      return;
    }

    gtag.event({
      action: "click_buy",
      category: "ecommerce",
      label: "Botón Comprar (inicio checkout)",
    });
    buyStripe();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
      <CartHeader itemCount={items.length} />

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {items.length === 0 ? (
          <CartEmptyState />
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
            <CartProductsList 
              items={items} 
              user={user} 
              onRemoveAll={removeAll} 
            />
            <CartSummary
              user={user}
              isDelivery={isDelivery}
              setIsDelivery={setIsDelivery}
              onCheckout={handleBuyClick}
              procesando={procesando}
            />
          </div>
        )}
      </div>

      {items.length > 0 && (
        <CartMobileBar
          finalTotal={finalTotal}
          onCheckout={handleBuyClick}
          procesando={procesando}
        />
      )}
    </div>
  );
}