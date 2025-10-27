import { CartMediClubCard } from "./cart-mediclub-card";
import { CartOrderSummary } from "./cart-order-summary";
import { CartSummaryProps } from "./types";
import { useCart } from "@/hooks/use-cart";

export function CartSummary({ user, isDelivery, setIsDelivery, onCheckout }: CartSummaryProps) {
  const { items } = useCart();
  const deliveryCost = isDelivery ? 200 : 0;

  const subtotal = items.reduce((total, product) => total + (product.price * product.quantity), 0);

  const totalPrice = items.reduce((total, product) => {
    const useMemberPrice = user?.mediClubRegular && product.priceMember > 0;
    const price = useMemberPrice ? product.priceMember : product.price;
    return total + (price * product.quantity);
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