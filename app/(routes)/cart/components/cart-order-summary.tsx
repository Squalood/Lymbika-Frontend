import { Package, Store, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { CartProduct } from "@/hooks/use-cart";
import { AuthUserProps } from "./types";

interface CartOrderSummaryProps {
  items: CartProduct[];
  user: AuthUserProps | null;
  isDelivery: boolean;
  setIsDelivery: (value: boolean) => void;
  deliveryCost: number;
  subtotal: number;
  totalPrice: number;
  ahorro: number;
  onCheckout: () => void;
}

export function CartOrderSummary({
  items,
  user,
  isDelivery,
  setIsDelivery,
  deliveryCost,
  subtotal,
  totalPrice,
  ahorro,
  onCheckout,
}: CartOrderSummaryProps) {
  return (
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
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button 
          className="w-full gap-2 h-11 sm:h-12 text-sm sm:text-base" 
          onClick={onCheckout}
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
  );
}