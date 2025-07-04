import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { CartProduct, useCart } from "@/hooks/use-cart";
import { Minus, Plus, X } from "lucide-react";

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
  //const totalItemPrice = pricePerUnit * product.quantity;

  return (
    <li className="flex justify-between items-start gap-4 sm:gap-6 py-4 border-b last:border-none">
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full">
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

          <div className="flex flex-col justify-between flex-1">
            <h2 className="text-base font-semibold leading-snug line-clamp-2">
              {product.productName}
            </h2>

            <span className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-primary rounded-full w-fit">
              {product.category.categoryName}
            </span>

            <div className="flex items-center gap-2 mt-1">
              {hasDiscount && (
                <p className="text-sm line-through text-muted-foreground">
                  {formatPrice(product.price)}
                </p>
              )}
              <p className="text-base font-semibold text-green-600">
                {formatPrice(pricePerUnit)}
              </p>
            </div>
            {/* Controles de cantidad */}
            <div className="flex items-center gap-3 mt-4">
              <p className="text-sm text-slate-500">Cantidad</p>
              <button
                className="p-1 border rounded-full hover:bg-gray-200"
                onClick={() => decreaseQuantity(product.id)}
                disabled={product.quantity === 1}
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-medium">{product.quantity}</span>
              <button
                className="p-1 border rounded-full hover:bg-gray-200"
                onClick={() => increaseQuantity(product.id)}
                disabled={product.quantity === 3}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

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