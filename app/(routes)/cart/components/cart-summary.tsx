import { CartMediClubCard } from "./cart-mediclub-card";
import { CartOrderSummary } from "./cart-order-summary";
import { CartSummaryProps } from "./types";
import { useCart } from "@/hooks/use-cart";

// Helper para detectar si es producto o servicio
const isProduct = (item: any): boolean => {
  return "productName" in item;
};

// Helper para obtener el precio correcto
const getItemPrice = (item: any, user: any): number => {
  if (isProduct(item)) {
    const useMemberPrice = user?.mediClubRegular && item.priceMember > 0;
    return useMemberPrice ? item.priceMember : item.price;
  } else {
    // Para servicios, el precio ya es un número
    return item.price || 0;
  }
};

// Helper para obtener el precio original (sin descuento)
const getOriginalPrice = (item: any): number => {
  return item.price || 0;
};

export function CartSummary({ user, isDelivery, setIsDelivery, onCheckout }: CartSummaryProps) {
  const { items } = useCart();
  const deliveryCost = isDelivery ? 200 : 0;

  // Subtotal con precios originales (sin descuento)
  const subtotal = items.reduce((total, item) => {
    return total + (getOriginalPrice(item) * item.quantity);
  }, 0);

  // Total con descuentos aplicados
  const totalPrice = items.reduce((total, item) => {
    const price = getItemPrice(item, user);
    return total + (price * item.quantity);
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