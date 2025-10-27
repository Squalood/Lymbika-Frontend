import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartHeaderProps {
  itemCount: number;
}

export function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
                {itemCount === 0
                  ? "Tu carrito está vacío"
                  : `${itemCount} ${itemCount === 1 ? "producto" : "productos"}`}
              </p>
            </div>
          </div>

          {itemCount > 0 && (
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
  );
}