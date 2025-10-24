"use client";

import { UseLovedProducts } from "@/hooks/use-loved-products";
import LovedItemsProduct from "./components/loved-item-product";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  const { lovedItems } = UseLovedProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Mis Favoritos
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  {lovedItems.length === 0
                    ? "Tu lista está vacía"
                    : `${lovedItems.length} ${
                        lovedItems.length === 1 ? "producto" : "productos"
                      } guardados`}
                </p>
              </div>
            </div>

            {lovedItems.length > 0 && (
              <div className="hidden sm:block">
                <Link href="/shop">
                  <Button variant="outline" className="gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Seguir Comprando
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {lovedItems.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-12 sm:py-20 lg:py-32"
          >
            <div className="p-6 sm:p-8 bg-muted/50 rounded-full mb-6">
              <Heart className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-muted-foreground" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 text-center">
              No hay productos favoritos
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 text-center max-w-md px-4">
              Guarda tus productos favoritos aquí para encontrarlos fácilmente más tarde
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <ShoppingBag className="w-5 h-5" />
                  Explorar Productos
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
          /* Products List */
          <div className="space-y-4 sm:space-y-6">
            {/* Summary Bar - Desktop */}
            <div className="hidden lg:flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Total de productos</p>
                  <p className="text-2xl font-bold">{lovedItems.length}</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div>
                  <p className="text-sm text-muted-foreground">Valor estimado</p>
                  <p className="text-2xl font-bold">
                    ${lovedItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <Link href="/shop">
                <Button className="gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Continuar Comprando
                </Button>
              </Link>
            </div>

            {/* Products Grid */}
            <div className="space-y-3 sm:space-y-4">
              {lovedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <LovedItemsProduct product={item} />
                </motion.div>
              ))}
            </div>

            {/* Mobile Bottom Actions */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
              <Link href="/shop" className="block">
                <Button size="lg" className="w-full gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Continuar Comprando
                </Button>
              </Link>
            </div>

            {/* Spacer for mobile bottom bar */}
            <div className="h-20 sm:hidden" />
          </div>
        )}
      </div>
    </div>
  );
}