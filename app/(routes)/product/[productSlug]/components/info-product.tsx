import RichTextRenderer from "@/components/rich-text-renderer";
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

const InfoProduct = ({ product }: InfoProductProps) => {
    const { addItem } = useCart();
    const { addLoveItem } = UseLovedProducts();

    const hasMemberPrice = Math.max(product.priceMember, 0) > 0;
    const hasTipo = !!product.tipo && product.tipo.trim() !== "";

    return (
        <div className="px-6">
            <div className="justify-between flex flex-col gap-6">
                <h1 className="text-2xl">{product.productName}</h1>
                <div className={`flex items-center gap-3 ${!hasTipo ? "justify-center" : "justify-evenly"}`}>
                    <p className="px-2 py-1 text-sm text-white bg-primary rounded-full w-fit">
                        {product.category?.categoryName || "Sin categoría"}
                    </p>
                    {hasTipo && (
                        <p className="px-2 py-1 text-xs text-white bg-teal-400 rounded-full w-fit">
                            {product.tipo}
                        </p>
                    )}
                    
                </div>
                <p className="px-2 py-1 text-slate-400 text-xs w-fit"> 
                    {product.sal}
                </p>
            </div>

            <Separator className="my-4" />

            {Array.isArray(product.descriptionPro) && product.descriptionPro.length > 0 ? (
                <RichTextRenderer content={product.descriptionPro} />
            ) : (
                <p>{product.description}</p>
            )}

            <Separator className="my-4" />

            <div className={`flex my-4 ${!hasMemberPrice ? "justify-start" : "justify-evenly"}`}>
                <div className={`${!hasMemberPrice ? "flex flex-row gap-3 items-center" : ""}`}>
                    <p className="text-xs">Precio Regular</p>
                    <p className="text-2xl">{formatPrice(product.price)}</p>
                </div>
                {hasMemberPrice && (
                    <div>
                        <p className="text-xs">Precio MediClub</p>
                        <p className="text-2xl text-green-400">{formatPrice(product.priceMember)}</p>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-5">
                <Button className="w-full" onClick={() => addItem(product)}>Comprar</Button>
                <Heart
                    width={30}
                    strokeWidth={1}
                    className="transition duration-300 cursor-pointer hover:fill-primary"
                    onClick={() => addLoveItem(product)}
                />
            </div>
        </div>
    );
}

export default InfoProduct;