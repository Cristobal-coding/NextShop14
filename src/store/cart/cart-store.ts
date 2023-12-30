import type { CartProduct, Size } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StateCart {
    cart: CartProduct[],
    getTotalItems: () => number;
    getTotalItemsBySize: (id: string, size: Size | undefined,) => number;
    getSummaryInformation: () => {
        subTotal: number;
        impuesto: number;
        total: number;
        itemsInCart: number;
    },
    findProductInCart: (product: CartProduct) => boolean,
    addProductToCart: (product: CartProduct) => void,

    updateProductQuantity: (product: CartProduct, quantity: number) => void,
    removeProduct: (product: CartProduct) => void,
    clearCart: () => void;
}

export const useCartStore = create<StateCart>()(

    persist(
        (set, get) => ({
            cart: [],
            clearCart: () => {
                set({ cart: [] })
            },
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0)
            },
            getTotalItemsBySize: (id: string, size?: Size,) => {
                if (size === undefined) return 1;
                const { cart } = get();

                const quantity = cart.find(p => p.size === size && p.id === id)?.quantity ?? 0;
                return quantity;
            },
            getSummaryInformation: () => {
                const { cart, getTotalItems } = get();
                const subTotal = cart.reduce(
                    (subTotal, p) => (p.quantity * p.price) + subTotal,
                    0
                );
                const impuesto = subTotal * 0.19;
                const total = subTotal + impuesto;
                const itemsInCart = getTotalItems();

                return {
                    subTotal,
                    impuesto,
                    total,
                    itemsInCart,
                }
            },
            findProductInCart(product: CartProduct) {
                const { cart } = get();
                const exist = cart.some(p => p.id === product.id && p.size === product.size);
                return exist;
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get();

                const deletedCartProducts = cart.filter((item) => (
                    item.id !== product.id || item.size !== product.size
                ))
                set({ cart: deletedCartProducts });
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity, }
                    }
                    return item;
                })

                set({ cart: updatedCartProducts })

            },
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                const productInCart = cart.some(
                    (item) => (
                        item.id === product.id &&
                        item.size === product.size
                    )
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return;
                }

                const updatedCartProducts = cart.map((item) => {

                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                })

                set({ cart: updatedCartProducts })
            }
        })
        ,
        { name: 'shopping-cart' }
    )


)