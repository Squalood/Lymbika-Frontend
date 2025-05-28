import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface LovedItemsProductProps {
  product: ProductType;
}

const LovedItemsProduct = ({ product }: LovedItemsProductProps) => {
  const router = useRouter();
  const { removeLoveItem } = UseLovedProducts();
  const { addItem } = useCart();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder-image.webp";

  const addToCheckout = () => {
    addItem(product);
    removeLoveItem(product.id);
  };

  return (
    <li className="flex flex-col sm:flex-row gap-4 py-6 border-b px-8">
      <div
        onClick={() => router.push(`/product/${product.slug}`)}
        className="cursor-pointer w-full sm:w-32 h-32 relative shrink-0"
      >
        <Image
          src={imageUrl}
          alt={product.productName}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between flex-1 gap-4">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold line-clamp-2">{product.productName}</h2>
            <p className="font-bold">{formatPrice(product.price)}</p>
            <span className="inline-block px-2 py-1 mt-2 text-xs font-medium text-white bg-teal-600 rounded-full dark:bg-white dark:text-black w-fit">
              {product.category.categoryName}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between gap-2 sm:gap-4">
          <Button className="w-full sm:w-auto" onClick={addToCheckout}>
            Añadir a Carrito
          </Button>
          <button
            className={cn(
              "rounded-full bg-white border shadow p-1 hover:scale-110 transition"
            )}
            onClick={() => removeLoveItem(product.id)}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default LovedItemsProduct;