import { CartMediClubCard } from "./cart-mediclub-card";
import { CartOrderSummary } from "./cart-order-summary";
import { CartSummaryProps } from "./types";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/hooks/use-cart";
import { ProductType } from "@/types/product";
import { ClinicType } from "@/types/clinic";

// Type guard: detecta producto
const isProduct = (item: CartItem): item is ProductType & { quantity: number } => {
  return "productName" in item;
};

// Precio correcto
const getItemPrice = (item: CartItem, user: CartSummaryProps["user"]): number => {
  if (isProduct(item)) {
    const useMemberPrice = user?.mediClubRegular && item.priceMember > 0;
    return useMemberPrice ? item.priceMember : item.price;
  }

  return item.price ?? 0;
};

// Precio original sin descuento
const getOriginalPrice = (item: CartItem): number => {
  return item.price ?? 0;
};

export function CartSummary({ user, isDelivery, setIsDelivery, onCheckout }: CartSummaryProps) {
  const { items } = useCart();
  const deliveryCost = isDelivery ? 200 : 0;

  const subtotal = items.reduce((total, item) => {
    return total + getOriginalPrice(item) * item.quantity;
  }, 0);

  const totalPrice = items.reduce((total, item) => {
    return total + getItemPrice(item, user) * item.quantity;
  }, 0);

  const ahorro = subtotal - totalPrice;
  const finalTotal = totalPrice + deliveryCost;

  return (
    <div className="lg:col-span-1 w-full min-w-0">
      <div className="sticky top-6 space-y-3 sm:space-y-4 w-full">
        <CartMediClubCard user={user} />
        <CartOrderSummary
          items={items}
          user={user}
          isDelivery={isDelivery}
          setIsDelivery={setIsDelivery}
          deliveryCost={deliveryCost}
          subtotal={subtotal}
          totalPrice={totalPrice}
          ahorro={ahorro}
          finalTotal={finalTotal}
          onCheckout={onCheckout}
        />
      </div>
    </div>
  );
}