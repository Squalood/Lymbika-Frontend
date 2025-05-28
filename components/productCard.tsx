"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckIcon, Heart, HeartIcon, PlusIcon } from "lucide-react";
import { ProductType } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { Card } from "./ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const { addLoveItem, isLoved } = UseLovedProducts();
  const router = useRouter();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder-image.webp";

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  const hasMemberPrice = product.priceMember > 0;

  return (
    <Card
      className="w-40 sm:w-48 lg:w-64 max-h-96 group relative space-y-4 overflow-hidden p-2 sm:p-4 cursor-pointer hover:shadow-md transition"
      onClick={handleCardClick}
    >
      <figure className="group-hover:opacity-90">
        <Image
          className="w-full rounded-lg aspect-square"
          src={imageUrl}
          width={300}
          height={500}
          alt={product.productName}
        />
      </figure>

      <div className="flex flex-col lg:flex-row justify-between">
        <div>
            <h3 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap max-w-[16ch]" title={product.productName}>
                {product.productName}
            </h3>
            <p className="text-sm text-muted-foreground">
                {product.category.categoryName}
            </p>
        </div>
        {hasMemberPrice ? (
        <div>
          <p className="text-xs line-through text-muted-foreground">{formatPrice(product.price)}</p>
          <p className="text-lg font-semibold text-green-400">{formatPrice(product.priceMember)}</p>
        </div>
        ) : (
          <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
        )}
      </div>

      <div className="flex gap-1 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          className={`flex-shrink-0 z-10 transition-colors ${
            isLoved(product) ? "bg-blue-100 text-blue-500 border-blue-200" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            addLoveItem(product);
          }}
        >
          {isLoved(product) ? (
            <Heart className="size-4 fill-blue-500" /> // Ícono relleno
          ) : (
            <HeartIcon className="size-4" />
          )}
        </Button>
        <Button
          variant= "outline"
          className={`w-full z-10 px-3 sm:px-4 ${inCart ? "bg-green-100 text-green-500 border-green-200" : ""}`}
          disabled={inCart}
          onClick={(e) => {
            e.stopPropagation();
            if (!inCart) addItem(product) ;
          }}
        >
          {inCart ? (
            <>
              <CheckIcon className="size-4 me-1 text-green-500" />
              Añadir
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

export default ProductCard;