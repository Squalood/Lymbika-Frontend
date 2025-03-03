import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {
    const {product} = props
    const {addItem} = useCart()
    const {addLoveItem, lovedItems} = UseLovedProducts()

    console.log(lovedItems)

    return ( 
        <div className="px-6">
            <div className="justify-between mb-3 sm:flex">
                <h1 className="text-2xl">{product.productName}</h1>
                <div className="flex items-center justify-between gap-3">
                    <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                        {product.category.categoryName}
                    </p>
                    <p className="px-2 py-1 text-xs text-white bg-teal-400 rounded-full w-fit">
                        {product.tipo}
                    </p>
                </div>
            </div>
            <Separator className="my-4"/>
            <p>{product.description}</p>
            <Separator className="my-4"/>
            <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-5">
                <Button className="w-full" onClick={() => addItem(product)}>Comprar</Button>
                <Heart width={30} strokeWidth={1} className="transition duration-300 cursor-pointer hover:fill-primary"
                    onClick={() => addLoveItem(product)}
                />
            </div>
        </div>
     );
}
 
export default InfoProduct;