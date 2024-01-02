'use client';


import { QuantitySelector, SizeSelector } from '@/components'
import { Product } from '@/interfaces'
import { useState } from 'react'
import { CartProduct } from '@/interfaces';
import clsx from 'clsx';
import { titleFont } from '@/config/fonts';
import { useCartStore } from '@/store';
import { Size } from '@prisma/client';

interface Props {
    product: Product,
}

export const AddToCart = ({ product }: Props) => {

    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const addProductToCart = useCartStore(state => state.addProductToCart)
    const findProductInCart = useCartStore(state => state.findProductInCart)

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)

    const addToCart = () => {
        if (!size) return;
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0],
        }
        const exist = findProductInCart(cartProduct);
        setQuantity(1)
        setSize(undefined)
        if (exist) {
            return updateProductQuantity(cartProduct, quantity)
        }
        addProductToCart(cartProduct)


    }

    return (
        <>
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
                idProd={product.id}
                setQuantity={setQuantity}
            />
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}

            />

            <button
                disabled={!size}
                onClick={addToCart}
                className={
                    clsx("disabled:bg-gray-400  btn-primary mt-5",
                        {
                            'cursor-not-allowed': !size,
                        }
                    )
                }>
                Agregar al Carro
            </button>
            <div className=' mb-5'>
                <p hidden={!!size} className={`${titleFont.className} antialiased text-xs  mt-1 ml-1`}>
                    Seleccione una talla
                    <span className='text-red-600'>*</span>
                </p>
            </div>
        </>
    )
}
