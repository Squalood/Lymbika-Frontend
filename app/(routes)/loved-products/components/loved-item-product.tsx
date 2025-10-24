"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LovedItemsProductProps {
  product: ProductType;
}

const LovedItemsProduct = ({ product }: LovedItemsProductProps) => {
  const router = useRouter();
  const { removeLoveItem } = UseLovedProducts();
  const { addItem } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder-image.webp";

  const addToCheckout = async () => {
    setIsAdding(true);
    addItem(product);
    
    // Pequeña animación antes de remover
    setTimeout(() => {
      removeLoveItem(product.id);
      setIsAdding(false);
    }, 300);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeLoveItem(product.id);
    }, 200);
  };

  const handleNavigate = () => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        isRemoving && "opacity-0 scale-95"
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
          {/* Imagen del Producto */}
          <div className="relative group">
            <div
              onClick={handleNavigate}
              className="cursor-pointer w-full sm:w-32 h-32 relative shrink-0 overflow-hidden rounded-lg"
            >
              <Image
                src={imageUrl}
                alt={product.productName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            
      
          </div>

          {/* Información del Producto */}
          <div className="flex flex-col sm:flex-row justify-between flex-1 gap-4">
            <div className="flex flex-col justify-between min-w-0 flex-1">
              <div className="space-y-2">
                <h2
                  onClick={handleNavigate}
                  className="text-lg font-semibold line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                >
                  {product.productName}
                </h2>
                
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  {product.price && product.price > product.price && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>

                <Badge variant="secondary" className="w-fit">
                  {product.category.categoryName}
                </Badge>

                {/* Descripción breve si existe */}
                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">
                    {product.description}
                  </p>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3">
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="w-full sm:w-auto gap-2"
                        onClick={addToCheckout}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {isAdding ? "Añadiendo..." : "Añadir a Carrito"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mover al carrito de compras</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto gap-2"
                  onClick={handleNavigate}
                >
                  Ver Detalles
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={handleRemove}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar de mi lista</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LovedItemsProduct;