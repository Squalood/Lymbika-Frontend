import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { CartProduct, useCart } from "@/hooks/use-cart";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AuthUserProps {
  username: string;
  email: string;
  mediClubRegular: boolean;
}

interface CartItemProps {
  product: CartProduct;
  user?: AuthUserProps | null;
}

export default function CartItem({ product, user }: CartItemProps) {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder-image.webp";

  const hasDiscount = user?.mediClubRegular && product.priceMember > 0;
  const pricePerUnit = hasDiscount ? product.priceMember : product.price;
  const totalPrice = pricePerUnit * product.quantity;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow w-full max-w-full">
      <CardContent className="p-3 sm:p-4 md:p-6 w-full">
        <div className="flex gap-2 sm:gap-3 md:gap-4 w-full min-w-0">
          {/* Imagen del Producto - Tamaño fijo en móvil */}
          <Link
            href={`/product/${product.slug}`}
            className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden group"
          >
            <Image
              src={imageUrl}
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Contenido Principal */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Header con título y botón de eliminar */}
            <div className="flex justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <Link href={`/product/${product.slug}`}>
                  <h2 className="text-sm sm:text-base font-semibold leading-tight line-clamp-2 hover:text-primary transition-colors">
                    {product.productName}
                  </h2>
                </Link>
                <Badge variant="secondary" className="mt-1.5 text-xs">
                  {product.category.categoryName}
                </Badge>
              </div>

              {/* Botón eliminar */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeItem(product.id)}
                      aria-label="Eliminar producto del carrito"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar del carrito</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Precios */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {hasDiscount && (
                <>
                  <p className="text-xs sm:text-sm line-through text-muted-foreground">
                    {formatPrice(product.price)}
                  </p>
                  <Badge variant="destructive" className="text-xs">
                    Descuento MediClub
                  </Badge>
                </>
              )}
              <p className="text-base sm:text-lg font-bold text-green-600">
                {formatPrice(pricePerUnit)}
              </p>
              <span className="text-xs text-muted-foreground">c/u</span>
            </div>

            {/* Controles de cantidad y precio total */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
              {/* Controles de cantidad */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Cantidad:
                </span>
                <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-md"
                          onClick={() => decreaseQuantity(product.id)}
                          disabled={product.quantity === 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Disminuir cantidad</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <span className="text-sm font-semibold min-w-[20px] text-center">
                    {product.quantity}
                  </span>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-md"
                          onClick={() => increaseQuantity(product.id)}
                          disabled={product.quantity === 3}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {product.quantity === 3
                            ? "Cantidad máxima alcanzada"
                            : "Aumentar cantidad"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Precio Total */}
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Subtotal:
                </span>
                <p className="text-lg sm:text-xl font-bold">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}