import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthUserProps {
  username: string;
  email: string;
  mediClubRegular: boolean;
}

interface CartItemProps {
  product: ProductType;
  user?: AuthUserProps | null;
}

const CartItem = ({ product, user }: CartItemProps) => {
  const router = useRouter();
  const { removeItem } = useCart();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder-image.webp";

  return (
    <li className="flex flex-col sm:flex-row gap-4 py-6 border-b">
      <div
        onClick={() => router.push(`/product/${product.slug}`)}
        className="cursor-pointer relative w-full sm:w-28 h-28 shrink-0"
      >
        <Image
          src={imageUrl}
          alt={product.productName}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex flex-1 justify-between px-1 sm:px-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold line-clamp-2">{product.productName}</h2>

          {user?.mediClubRegular && product.priceMember > 0 ? (
            <>
                <p className="font-bold line-through text-sm text-muted-foreground">
                {formatPrice(product.price)}
                </p>
                <p className="font-bold text-green-500">
                {formatPrice(product.priceMember)}
                </p>
            </>
            ) : (
            <p className="font-bold">{formatPrice(product.price)}</p>
            )}

          <span className="px-2 py-1 text-xs font-medium text-white bg-teal-600 rounded-full dark:bg-white dark:text-black w-fit">
            {product.category.categoryName}
          </span>
        </div>

        <div className="flex items-start">
          <button
            className={cn(
              "rounded-full bg-white border shadow p-1 hover:scale-110 transition"
            )}
            onClick={() => removeItem(product.id)}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;