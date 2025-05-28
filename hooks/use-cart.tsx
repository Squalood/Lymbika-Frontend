import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductType } from "@/types/product";
import { toast } from "sonner";

interface CartStore {
    items: ProductType[];
    addItem: (data: ProductType) => void;
    isInCart: (id: number) => boolean;
    removeItem: (id: number) => void;
    removeAll: () => void;
}

export const useCart = create(persist<CartStore>((set, get) => ({
            items: [],

            addItem: (data: ProductType) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === data.id);

                if (existingItem) {
                    return toast.error("El producto ya está en el carrito");
                }

                set({
                    items: [...get().items, data],
                });

                toast("Producto añadido al carrito 🛒");
            },
            isInCart: (id) => {
                return get().items.some((item) => item.id === id);
            },
            removeItem: (id: number) => {
                set({items: get().items.filter((item) => item.id !== id),});

                toast("Producto eliminado del carrito 🛒");
            },
            removeAll: () => {
                set({ items: [] });
                toast("Carrito vacío 🛒");
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage), // Corregido `Storage` → `storage`
        }
    )
);
