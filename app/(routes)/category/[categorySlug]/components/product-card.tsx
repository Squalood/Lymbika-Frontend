import IconButtom from "@/components/icon-button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addItem } = useCart();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder-image.webp";

  return (
    <div className="p-1">
      <Card className="group h-[370px] py-4 border-gray-200 shadow-none relative overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center px-6 py-2">
        <span className="text-xs px-3 py-1 bg-primary text-white rounded-full">
            {product.category?.categoryName ?? "Sin categoría"}
        </span>
          <Image
            src={imageUrl}
            alt="Sin Imagen"
            width={200}
            height={200}
            className="w-[200px] h-[200px] object-cover rounded-md transition-transform duration-200 group-hover:scale-105"
          />

          {/* Iconos al hacer hover */}
          <div className="absolute bottom-20 left-0 w-full opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex justify-center gap-x-6">
              <IconButtom
                onClick={() => router.push(`/product/${product.slug}`)}
                icon={<Expand size={20} />}
                className="text-gray-600"
              />
              <IconButtom
                onClick={() => addItem(product)}
                icon={<ShoppingCart size={20} />}
                className="text-gray-600"
              />
            </div>
          </div>
        </CardContent>

        {/* Información del producto */}
        <div className="flex justify-between gap-4 px-8 mt-2">
          <h3 className="text-base font-semibold">{product.productName}</h3>
          
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
