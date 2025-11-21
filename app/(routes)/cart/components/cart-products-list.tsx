import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CartItem from "./cart-item";
import { CartItem as CartItemType } from "@/hooks/use-cart";
import { AuthUserProps } from "./types";
import CartServiceItem from "./cartServiceItem";

interface CartProductsListProps {
  items: CartItemType[];
  user: AuthUserProps | null;
  onRemoveAll: () => void;
}

// Helper para detectar si es producto
const isProduct = (item: CartItemType): boolean => {
  return "productName" in item;
};

export function CartProductsList({ items, user, onRemoveAll }: CartProductsListProps) {
  // Contar productos y servicios
  const productCount = items.filter(item => isProduct(item)).length;
  const serviceCount = items.filter(item => !isProduct(item)).length;
  
  // Generar texto descriptivo
  const getItemsText = () => {
    if (productCount > 0 && serviceCount > 0) {
      return `Items (${items.length})`;
    } else if (serviceCount > 0) {
      return `Servicios (${serviceCount})`;
    }
    return `Productos (${productCount})`;
  };

  return (
    <div className="lg:col-span-2 space-y-3 sm:space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          {getItemsText()}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemoveAll}
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
            {isProduct(item) ? (
              <CartItem product={item as any} user={user} />
            ) : (
              <CartServiceItem service={item as any} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}