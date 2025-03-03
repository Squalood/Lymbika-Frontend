import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductType } from "@/types/product";
import { toast } from "sonner";

interface UseLovedProductsType{
    lovedItems: ProductType[],
    addLoveItem: (data: ProductType) => void
    removeLoveItem: (id: number) => void
}

export const UseLovedProducts = create(persist<UseLovedProductsType>((set, get) => ({
    lovedItems: [],
    addLoveItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find((Item) => Item.id == data.id)

        if(existingItem){
            return toast.error("El producto ya está en favoritos");
        }
        set({
            lovedItems: [...get().lovedItems, data]
        })
        toast.success("Producto añadido al favoritos ❤️");
    },
    removeLoveItem: (id: number) => {
        set({lovedItems: [...get().lovedItems.filter((item) => item.id != id)]})
        toast("Producto eliminado de favoritos 💔");
    },
}), {
    name: "loved-products-storage",
    storage: createJSONStorage(() => localStorage)
}))