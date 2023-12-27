'use client';

import { LoadSpinner, QuantitySelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";


export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);

    useEffect(() => {
        setLoaded(true)
    }, [])


    if (!loaded) {
        return (
            <LoadSpinner />
        );
    }

    return (
        <>
            {
                productsInCart.map(p => (
                    <div key={`${p.slug}-${p.size}`} className="flex mb-8 fade-in ">
                        <Image
                            src={`/products/${p.image}`}
                            width={100}
                            height={100}
                            alt={p.title}
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                            className="mr-5  rounded shadow-md"
                        />
                        <div className="w-full">
                            <Link href={`/product/${p.slug}`}
                                className={`${titleFont.className} antialiased hover:underline cursor-pointer`}>
                                {p.title}
                            </Link>
                            <div className="flex justify-between">
                                <p className="font-bold">${p.price}</p>
                                <p >
                                    <span className="font-bold mr-1">Talla:</span>
                                    {p.size}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <QuantitySelector
                                    onQuantityChanged={count => updateProductQuantity(p, count)}
                                    quantity={p.quantity} />

                                <button onClick={() => removeProduct(p)}
                                    className="flex items-center px-1 py-0 hover:shadow-md hover:shadow-red-300 hover:text-white text-red-500  border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center ">
                                    <IoTrashOutline size={20} className='text-red-400 ' />
                                    <span className={`${titleFont.className} antialiased text-xs`}>Remover</span>

                                </button>

                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
