//cart-client.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/api/payment";
import { toast } from "sonner";
import * as gtag from "@/lib/gtag";
import { CartHeader } from "./cart-header";
import { CartEmptyState } from "./cart-empty-state";
import { CartProductsList } from "./cart-products-list";
import { CartSummary } from "./cart-summary";
import { CartMobileBar } from "./cart-mobile-bar";
import { AuthUserProps } from "./types";

interface CartClientPageProps {
  user: AuthUserProps | null;
}

// Helper para detectar si es producto o servicio
const isProduct = (item: any): boolean => {
  return "productName" in item;
};

// Helper para obtener el precio correcto
const getItemPrice = (item: any, user: AuthUserProps | null): number => {
  if (isProduct(item)) {
    const useMemberPrice = user?.mediClubRegular && item.priceMember > 0;
    return useMemberPrice ? item.priceMember : item.price;
  } else {
    // Para servicios, el precio ya es un número
    return item.price || 0;
  }
};

// Helper para obtener el nombre del item
const getItemName = (item: any): string => {
  return isProduct(item) ? item.productName : item.title;
};

export default function CartClientPage({ user }: CartClientPageProps) {
  const router = useRouter();
  const { items, removeAll } = useCart();
  const [isDelivery, setIsDelivery] = useState(false);

  const deliveryCost = isDelivery ? 200 : 0;
  const totalPrice = items.reduce((total, item) => {
    const price = getItemPrice(item, user);
    return total + (price * item.quantity);
  }, 0);
  const finalTotal = totalPrice + deliveryCost;

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

  const buyStripe = async () => {
    try {
      const stripe = await stripePromise;
      const productsPayload = items.map(item => ({
        id: item.id,
        name: getItemName(item),
        quantity: item.quantity,
        price: getItemPrice(item, user),
        type: isProduct(item) ? "product" : "service", // Identificar tipo
      }));

      const res = await makePaymentRequest.post("/api/orders", {
        products: productsPayload,
        mediClubRegular: user?.mediClubRegular || false,
        isDelivery, 
        deliveryCost,
        userEmail: user?.email || "",
      });

      await stripe?.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
      removeAll();
    }
  };

  const handleBuyClick = () => {
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
            />
          </div>
        )}
      </div>

      {items.length > 0 && (
        <CartMobileBar 
          finalTotal={finalTotal} 
          onCheckout={handleBuyClick} 
        />
      )}
    </div>
  );
}