"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { ClinicType } from "@/types/clinic";
import PriceToggle from "@/components/priceToggle";

type ServiceCardProps = {
  service: ClinicType["services"][number];
  index?: number;
  inView?: boolean;
};

const ServiceCard = ({ service, index = 0, inView = true }: ServiceCardProps) => {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(service.id);

  const imageUrl = service.image?.url || "/placeholder-image.webp";

  return (
    <Card
      className={`w-auto md:w-full h-full group relative space-y-4 overflow-hidden p-4 sm:p-4 hover:shadow-md transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <figure className="group-hover:opacity-90">
        <Image
          className="w-48 rounded-lg aspect-square mx-auto"
          src={imageUrl}
          width={300}
          height={500}
          alt={service.title}
        />
      </figure>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <p className="text-lg font-semibold text-primary">
          <PriceToggle price={service.price} />
        </p>
        <p className="text-sm text-muted-foreground">
          {service.description}
        </p>
      </div>

      <div className="flex gap-1 sm:gap-4">
        <Button
          variant="outline"
          className={`w-full z-10 px-3 sm:px-4 ${
            inCart ? "bg-green-100 text-green-500 border-green-200" : ""
          }`}
          disabled={inCart}
          onClick={(e) => {
            e.stopPropagation();
            if (!inCart) addItem(service);
          }}
        >
          {inCart ? (
            <>
              <CheckIcon className="size-4 me-1 text-green-500" />
              Añadido
            </>
          ) : (
            <>
              <PlusIcon className="size-4 me-1" />
              Añadir
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;