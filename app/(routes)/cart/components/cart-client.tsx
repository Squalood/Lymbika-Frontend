"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/api/payment";
import { CheckCircle, IdCard, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import CartItem from "./cart-item";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface AuthUserProps {
  username: string;
  email: string;
  mediClubRegular: boolean;
}

interface CartClientPageProps {
  user: AuthUserProps | null;
}

export default function CartClientPage({ user }: CartClientPageProps) {
  const router = useRouter();
  const { items, removeAll } = useCart();
  const [isDelivery, setIsDelivery] = useState(true);
  const totalPrice = items.reduce((total, product) => {
    const useMemberPrice = user?.mediClubRegular && product.priceMember > 0;
    const price = useMemberPrice ? product.priceMember : product.price;
    return total + price;
  }, 0);
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

  const buyStripeDelivery = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("/api/orders", {
        products: items,
        mediClubRegular: user?.mediClubRegular || false,
        isDelivery: true,
      });
      await stripe?.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

const buyStripePickUp = async () => {
  try {
    const stripe = await stripePromise;
    const res = await makePaymentRequest.post("/api/orders", {
      products: items,
      mediClubRegular: user?.mediClubRegular || false,
      isDelivery: false,
    });
    await stripe?.redirectToCheckout({
      sessionId: res.data.stripeSession.id,
    });
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          {items.length === 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} user={user} />
            ))}
          </ul>
        </div>

        <div className="sm:max-w-xl lg:col-start-4 lg:col-span-2">
          <div className="p-6 rounded-lg bg-slate-100">
            <p className="mb-3 text-lg font-semibold">Order Summary</p>
            <div className="bg-slate-200 h-full rounded-md aspect-square p-6 my-6 mx-3 flex justify-between flex-col">
              <IdCard size={48} className="text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">MediClub</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  productos de farmacia a precio de proveedor.
                </p>

                {user?.mediClubRegular ? (
                <p className="my-3 mx-auto w-full flex items-center justify-center gap-2 text-sm font-semibold text-green-600 bg-green-100 py-2 px-3 rounded-full">
                    <CheckCircle size={16} className="text-green-600" />
                    Precio MediClub aplicado
                </p>
                ) : (
                <Button className="my-3 mx-auto w-2/3" onClick={() => router.push("/membership")}>
                    Más Info
                </Button>
                )}

              </div>
            </div>

            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p>Total Order</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex items-center py-2 justify-between space-x-2">
              <Switch
                id="delivery-option"
                checked={isDelivery}
                onCheckedChange={setIsDelivery}
              />
              <p>{isDelivery ? "Envío a domicilio" : "Recoger en farmacia"}</p>
              
            </div>
            <div className="flex items-center justify-center w-full mt-3">
              <Button className="w-full" onClick={isDelivery ? buyStripeDelivery : buyStripePickUp}>
                Comprar <ShoppingCart />
              </Button>
            </div>
            <Button className="w-full mt-4" onClick={removeAll} variant="outline">
              Vaciar Carrito <Trash2 />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}