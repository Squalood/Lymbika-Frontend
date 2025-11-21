import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClinicType } from "@/types/clinic";

type ServiceCartItem = ClinicType["services"][number] & { quantity: number };

interface CartServiceItemProps {
  service: ServiceCartItem;
}

export default function CartServiceItem({ service }: CartServiceItemProps) {
  const { removeItem } = useCart();

  const imageUrl = service.image?.url || "/placeholder-image.webp";
  const pricePerUnit = service.price;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow w-full max-w-full">
      <CardContent className="p-3 sm:p-4 md:p-6 w-full">
        <div className="flex gap-2 sm:gap-3 md:gap-4 w-full min-w-0">
          {/* Imagen del Servicio */}
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Contenido Principal */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Header con título y botón de eliminar */}
            <div className="flex justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h2 className="text-sm sm:text-base font-semibold leading-tight line-clamp-2">
                  {service.title}
                </h2>
                <Badge variant="secondary" className="mt-1.5 text-xs">
                  Servicio
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
                      onClick={() => removeItem(service.id)}
                      aria-label="Eliminar servicio del carrito"
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

            {/* Precio */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <p className="text-base sm:text-lg font-bold text-green-600">
                {formatPrice(pricePerUnit)}
              </p>
            </div>

            {/* Descripción breve */}
            {service.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {service.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}