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
    product: ProductType
    user?: AuthUserProps | null;
}

const CartItem = ({ product, user }: CartItemProps) => {
    const router = useRouter()
    const { removeItem } = useCart()

    return ( 
        <li className="flex py-6 border-b">
            <div onClick={() => router.push(`/product/${product.slug}`)} className="cursor-pointer">
                <img 
                    src={`${product.images[0].url}`} 
                    alt="product" 
                    className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
                />
            </div>
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">{product.productName}</h2>

                    {user?.mediClubRegular ? (
                    <>
                    <p className="font-bold line-through">{formatPrice(product.price)}</p>
                    <p className="font-bold text-green-400">{formatPrice(product.priceMember)}</p>
                    </>
                    ) : (
                        <p className="font-bold">{formatPrice(product.price)}</p>
                    )}

                    <div className="flex items-center justify-between gap-3">
                        <p className="px-2 py-1 text-white bg-teal-600 rounded-full dark:bg-white dark:text-black">{product.category.categoryName}</p>
                    </div>
                </div>
                <div>
                    <button className={cn("rounded-full flex items-center justify-center bg-white border shadow p-1 hovr:scale-110 transition")}>
                        <X size={20} onClick={() => removeItem(product.id)}/>
                    </button>
                </div>
            </div>
        </li>
     );
}
 
export default CartItem;