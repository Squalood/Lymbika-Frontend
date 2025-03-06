import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { UseLovedProducts } from "@/hooks/use-loved-products"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { ProductType } from "@/types/product"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface LovedItemsProductProps {
    product: ProductType
}

const LovedItemsProduct = (props: LovedItemsProductProps) => {
    const {product} = props
    const router = useRouter()
    const { removeLoveItem } = UseLovedProducts()
    const { addItem } = useCart()

    const addToCheckout = () => {
        addItem(product)
        removeLoveItem(product.id)
    }

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
                    <p className="font-bold">{formatPrice (product.price)}</p>
                    <div className="flex items-center justify-between gap-3">
                        <p className="px-2 py-1 text-white bg-teal-600 rounded-full dark:bg-white dark:text-black">{product.category.categoryName}</p>
                    </div>
                    
                </div>
                <div>
                    <Button className="mt-5 mr-6 rounded-full" onClick={addToCheckout}>Añadir a Carrito</Button>
                    <button className={cn("rounded-full bg-white border shadow p-1 hovr:scale-110 transition")}>
                        <X size={20} onClick={() => removeLoveItem(product.id)}/>
                    </button>       
                </div>
                
            </div>
        </li>
     );
}
 
export default LovedItemsProduct;