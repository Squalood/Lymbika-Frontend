import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";

interface AuthUserProps {
  username: string;
  email: string;
  mediClubRegular: boolean;
}

interface CartItemProps {
  product: ProductType;
  user?: AuthUserProps | null;
}

export default function CartItem({ product, user }: CartItemProps) {
  const { removeItem } = useCart();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder-image.webp";

  const hasDiscount = user?.mediClubRegular && product.priceMember > 0;

  return (
    <li className="flex justify-between items-start gap-4 sm:gap-6 py-4 border-b last:border-none">
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
        {/* Imagen + contenido */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Imagen */}
          <Link
            href={`/product/${product.slug}`}
            className="relative w-full aspect-square md:w-28 md:aspect-square rounded-md overflow-hidden block"
          >
            <Image
              src={imageUrl}
              alt={product.productName}
              fill
              className="object-cover"
            />
          </Link>

          {/* Contenido */}
          <div className="flex flex-col justify-between flex-1">
            <h2 className="text-base font-semibold leading-snug line-clamp-2">
              {product.productName}
            </h2>

            <span className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-primary rounded-full w-fit">
              {product.category.categoryName}
            </span>

            {hasDiscount ? (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm line-through text-muted-foreground">
                  {formatPrice(product.price)}
                </p>
                <p className="text-base font-semibold text-green-600">
                  {formatPrice(product.priceMember)}
                </p>
              </div>
            ) : (
              <p className="text-base font-semibold mt-1">
                {formatPrice(product.price)}
              </p>
            )}
          </div>
        </div>

        {/* Botón eliminar */}
        <div className="flex justify-end md:items-start">
          <button
            className="rounded-full bg-white border shadow p-1 hover:scale-110 transition"
            onClick={() => removeItem(product.id)}
            aria-label="Eliminar producto del carrito"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </li>
  );
}