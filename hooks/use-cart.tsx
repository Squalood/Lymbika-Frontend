// use-cart.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "sonner";

export type CartItem = ProductType & { quantity: number };

export type CartProduct = ProductType & { quantity: number };

interface CartStore {
    items: CartItem[];
    addItem: (data: ProductType) => void;
    isInCart: (id: number) => boolean;
    removeItem: (id: number) => void;
    removeAll: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],

    addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
            return toast.error("Ya está en el carrito");
        }

        set({
            items: [...currentItems, { ...data, quantity: 1 }],
        });

        toast("Producto añadido al carrito 🛒");
    },

    isInCart: (id) => {
        return get().items.some((item) => item.id === id);
    },

    removeItem: (id: number) => {
        set({
            items: get().items.filter((item) => item.id !== id),
        });

        toast("Eliminado del carrito 🛒");
    },

    removeAll: () => {
        set({ items: [] });
        toast("Carrito vacío 🛒");
    },

    increaseQuantity: (id: number) => {
        set({
            items: get().items.map((item) => {
                if (item.id === id && item.quantity < 3) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            }),
        });
    },

    decreaseQuantity: (id: number) => {
        set({
            items: get().items.map((item) => {
                if (item.id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }),
        });
    },
}),
{
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
}));