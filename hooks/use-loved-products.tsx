import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductType } from "@/types/product";
import { toast } from "sonner";

interface UseLovedProductsType {
  lovedItems: ProductType[],
  addLoveItem: (data: ProductType) => void,
  removeLoveItem: (id: number) => void,
  isLoved: (data: ProductType) => boolean // ✅ NUEVO
}

export const UseLovedProducts = create(
  persist<UseLovedProductsType>(
    (set, get) => ({
      lovedItems: [],
      addLoveItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast.error("El producto ya está en favoritos");
        }

        set({
          lovedItems: [...currentLovedItems, data],
        });
        toast.success("Producto añadido a favoritos ❤️");
      },
      removeLoveItem: (id: number) => {
        set({
          lovedItems: get().lovedItems.filter((item) => item.id !== id),
        });
        toast("Producto eliminado de favoritos 💔");
      },
      isLoved: (data: ProductType) => {
        return get().lovedItems.some((item) => item.id === data.id); // ✅ Lógica aquí
      },
    }),
    {
      name: "loved-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
