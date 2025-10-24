"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/api/payment";
import { 
  CheckCircle, 
  IdCard, 
  ShoppingCart, 
  Trash2, 
  Package,
  Store,
  ArrowRight
} from "lucide-react";
import CartItem from "./cart-item";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as gtag from "@/lib/gtag";
import { motion } from "framer-motion";

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
  const [isDelivery, setIsDelivery] = useState(false);

  const deliveryCost = isDelivery ? 200 : 0;

  const subtotal = items.reduce((total, product) => total + (product.price * product.quantity), 0);

  const totalPrice = items.reduce((total, product) => {
    const useMemberPrice = user?.mediClubRegular && product.priceMember > 0;
    const price = useMemberPrice ? product.priceMember : product.price;
    return total + (price * product.quantity);
  }, 0);

  const ahorro = subtotal - totalPrice;
  const finalTotal = totalPrice + deliveryCost;

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

  const buyStripe = async () => {
    try {
      const stripe = await stripePromise;

      const productsPayload = items.map(item => ({
        id: item.id,
        name: item.productName,
        quantity: item.quantity,
        price: user?.mediClubRegular && item.priceMember > 0 ? item.priceMember : item.price,
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
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Carrito de Compras
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  {items.length === 0
                    ? "Tu carrito está vacío"
                    : `${items.length} ${items.length === 1 ? "producto" : "productos"}`}
                </p>
              </div>
            </div>

            {items.length > 0 && (
              <div className="hidden sm:block">
                <Link href="/shop">
                  <Button variant="outline" className="gap-2">
                    <Store className="w-4 h-4" />
                    Seguir Comprando
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {items.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-12 sm:py-20 lg:py-32"
          >
            <div className="p-6 sm:p-8 bg-muted/50 rounded-full mb-6">
              <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-muted-foreground" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 text-center">
              Tu carrito está vacío
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 text-center max-w-md px-4">
              Explora nuestros productos y añade los que más te gusten
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Store className="w-5 h-5" />
                  Ir a la Tienda
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Cart Content */
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
            {/* Products List */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4 w-full min-w-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Productos ({items.length})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeAll}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vaciar carrito
                </Button>
              </div>

              <div className="space-y-3 sm:space-y-4 w-full">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="w-full"
                  >
                    <CartItem product={item} user={user} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary - Sticky on desktop */}
            <div className="lg:col-span-1 w-full min-w-0">
              <div className="sticky top-6 space-y-3 sm:space-y-4 w-full">
                {/* MediClub Card */}
                <Card className="overflow-hidden w-full">
                  <CardContent className="p-4 sm:p-6 w-full">
                    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-4 sm:p-6 w-full">
                      <IdCard className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                      <h3 className="text-lg sm:text-xl font-bold mb-2">MediClub</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                        Productos de farmacia a precio de proveedor
                      </p>

                      {user?.mediClubRegular ? (
                        <Badge className="w-full justify-center py-2 bg-green-600 hover:bg-green-700 text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Precio MediClub aplicado
                        </Badge>
                      ) : (
                        <Button asChild className="w-full text-xs sm:text-sm" variant="default" size="sm">
                          <Link href="/membership" className="gap-2">
                            Ver planes disponibles
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card className="w-full">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Resumen del Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 w-full">
                    {/* Product Details */}
                    <div className="space-y-2 text-xs sm:text-sm w-full overflow-hidden">
                      {items.map((item) => {
                        const useMemberPrice = user?.mediClubRegular && item.priceMember > 0;
                        const price = useMemberPrice ? item.priceMember : item.price;
                        const totalPerItem = price * item.quantity;

                        return (
                          <div key={item.id} className="flex justify-between items-start gap-2 w-full">
                            <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
                              <span className="truncate text-left">{item.productName}</span>
                              <span className="text-muted-foreground shrink-0 whitespace-nowrap">
                                ×{item.quantity}
                              </span>
                            </div>
                            <span className="font-medium shrink-0 whitespace-nowrap">
                              {formatPrice(totalPerItem)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    {/* Delivery Option */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-2 w-full">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        {isDelivery ? (
                          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                        ) : (
                          <Store className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <Label htmlFor="delivery-option" className="cursor-pointer font-medium text-xs sm:text-sm block truncate">
                            {isDelivery ? "Envío a domicilio" : "Recoger en farmacia"}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            {isDelivery ? "Entrega en 24-48 hrs" : "Disponible hoy"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="delivery-option"
                        checked={isDelivery}
                        onCheckedChange={setIsDelivery}
                        className="shrink-0"
                      />
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2 w-full">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium whitespace-nowrap">{formatPrice(subtotal)}</span>
                      </div>

                      {user?.mediClubRegular && ahorro > 0 && (
                        <div className="flex justify-between text-xs sm:text-sm text-green-600">
                          <span>Ahorro MediClub</span>
                          <span className="font-semibold whitespace-nowrap">-{formatPrice(ahorro)}</span>
                        </div>
                      )}

                      {isDelivery && (
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-muted-foreground">Envío</span>
                          <span className="font-medium whitespace-nowrap">{formatPrice(deliveryCost)}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-base sm:text-lg font-semibold">Total</span>
                        <span className="text-xl sm:text-2xl font-bold text-primary whitespace-nowrap">
                          {formatPrice(finalTotal)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Button 
                      className="w-full gap-2 h-11 sm:h-12 text-sm sm:text-base" 
                      onClick={handleBuyClick}
                      size="lg"
                    >
                      Proceder al Pago
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Pago seguro procesado por Stripe
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Bar - Only show when cart has items */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t shadow-lg z-50">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-xl font-bold">{formatPrice(finalTotal)}</p>
            </div>
            <Button 
              className="gap-2 flex-1" 
              onClick={handleBuyClick}
              size="lg"
            >
              Pagar
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Spacer for mobile bottom bar */}
      {items.length > 0 && <div className="h-24 lg:hidden" />}
    </div>
  );
}