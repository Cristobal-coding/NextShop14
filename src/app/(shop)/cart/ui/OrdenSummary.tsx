'use client';

import { LoadSpinner } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";




export const OrdenSummary = () => {
    const summary = useCartStore(state => state.getSummaryInformation());
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return (
            <LoadSpinner />
        );
    }


    return (
        <div className="grid grid-cols-2">
            <span >Nro. Productos</span>
            <span className="text-right">{summary.itemsInCart} artículos</span>

            <span >Subtotal</span>
            <span className="text-right"> {currencyFormat(summary.subTotal)}</span>

            <span >Impuesto 19%</span>
            <span className="text-right"> {currencyFormat(summary.impuesto)}</span>

            <span className="font-bold mt-5 text-2xl">Total</span>
            <span className="font-bold mt-5 text-2xl text-right"> {currencyFormat(summary.total)}</span>

            <div className=" w-full mt-5 mb-2 col-span-2 ">
                {
                    loaded && (
                        <Link
                            className=" btn-primary justify-center  flex items-center"
                            href={'/checkout/address'}
                        >
                            <span>Continuar con la Compra</span>
                        </Link>
                    )
                }
            </div>


        </div>
    )
}
