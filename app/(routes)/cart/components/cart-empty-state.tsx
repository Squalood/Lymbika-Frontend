import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function CartEmptyState() {
  return (
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
  );
}