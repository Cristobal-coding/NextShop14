'use client';

import { placeOrder } from "@/actions";
import { LoadSpinner, Summary } from "@/components";
import { useAddressStore, useCartStore } from "@/store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoCallSharp, IoWarningOutline } from "react-icons/io5";


export const PlaceOrder = () => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const address = useAddressStore(state => state.address)
    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart)

    useEffect(() => {
        setLoaded(true)
    }, [])

    const onPlaceOrder = async () => {
        setIsBuying(true);

        const productsToOrder = cart.map(p => ({
            productId: p.id,
            quantity: p.quantity,
            size: p.size,
        }));

        const resp = await placeOrder(productsToOrder, address)
        if (!resp.ok) {
            setIsBuying(false);
            setErrorMessage(resp.message)
            return;

        }

        if (!setIsBuying) {
            clearCart();
        }
        router.replace('/orders/' + resp.orderId)
    }

    if (!loaded) return <div className="h-96"> <LoadSpinner /> </div>



    return (
        <div className="flex flex-col bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de Entrega</h2>
            <div className="mb-10 ">
                <p className="text-xl font-bold">
                    {address.firstName} {address.lastName}
                </p>
                <p className="flex items-center"><FaMapMarkerAlt className={'mr-1'} />  {address.address}</p>
                <p className="ml-5">{address.address2}</p>
                <p className="ml-5">{address.postalCode}</p>
                <p className="ml-5">
                    {address.city}, {address.country}
                </p>
                <p className="flex items-center gap-2 ml-5">
                    {address.phone}
                    <IoCallSharp />
                </p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resumen de orden</h2>


            <div className="grid grid-cols-2">

                <Summary
                    actionButton={
                        <div className="mt-5 mb-2 w-full ">
                            <button
                                disabled={isBuying}
                                onClick={() => onPlaceOrder()}
                                className={
                                    clsx(
                                        'flex justify-center w-full',
                                        {
                                            'btn-primary ': !isBuying,
                                            'btn-disabled': isBuying
                                        }
                                    )
                                }
                            // href={'/orders/1234abc'}
                            >
                                Comprar
                            </button>
                        </div>
                    }
                />


            </div>
            {
                (errorMessage && !setIsBuying) && (
                    <div className=" fade-in w-full text-red-500">

                        <span className=' flex items-center'>
                            <IoWarningOutline size={30} className=' mr-1' /> <p className="mr-2 font-bold">Ocurrio un error:</p>
                        </span>
                        <p className="italic">{errorMessage}</p>
                    </div>

                )
            }

        </div>
    )
}
