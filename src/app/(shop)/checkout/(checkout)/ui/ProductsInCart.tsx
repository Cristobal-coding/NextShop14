'use client';
import { LoadSpinner } from '@/components';
import { titleFont } from '@/config/fonts';
import { useCartStore } from '@/store';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore(state => state.cart);
    useEffect(() => {
        setLoaded(true)
    }, [])


    if (!loaded) {
        return (
            <div className="h-96"> <LoadSpinner /> </div>
        );
    }
    return (
        <>
            <span className="text-xl">Ajustar orden</span>
            <Link href={'/cart'} className="underline mb-5">
                Editar tu carrito
            </Link>
            {productsInCart.map(p =>
            (<div key={`${p.slug}-${p.size}`} className="flex mb-8">
                <Image
                    src={`/products/${p.image}`}
                    width={100}
                    height={100}
                    alt={p.title}
                    style={{
                        width: '100px',
                        height: '100px',
                    }}
                    className="mr-1 md:mr-5  rounded shadow-md"
                />
                <div className='w-full'>
                    <p className={`${titleFont.className} antialiased`}>{p.title}</p>
                    <div className='flex justify-between  mt-1'>
                        <p className='font-bold'>
                            Precio:
                            <span className='ml-2 font-light antialiased'>${p.price}</span>
                        </p>
                        <span className=" max-w-28 inline-flex md:ml-5 bg-blue-500 text-white text-xs font-medium items-center px-2.5 py-0.5 rounded ">
                            {/* <IoCheckboxOutline className='mr-1' /> */}
                            {`x ${p.quantity} Unidades`}
                        </span>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <p className='font-bold'>
                            Subtotal:
                            <span className='ml-2 font-light antialiased'>${p.price * p.quantity}</span>
                        </p>
                        <p className='font-bold'>
                            Talla:
                            <span className='ml-2 font-light antialiased'>{p.size}</span>
                        </p>
                    </div>

                </div>
            </div>)

            )}

        </>
    )
}
