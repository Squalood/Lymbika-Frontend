import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CartItem from "./cart-item";
import { CartProduct } from "@/hooks/use-cart";
import { AuthUserProps } from "./types";

interface CartProductsListProps {
  items: CartProduct[];
  user: AuthUserProps | null;
  onRemoveAll: () => void;
}

export function CartProductsList({ items, user, onRemoveAll }: CartProductsListProps) {
  return (
    <div className="lg:col-span-2 space-y-3 sm:space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          Productos ({items.length})
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
            <CartItem product={item} user={user} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}