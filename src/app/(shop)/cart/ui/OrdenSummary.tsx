'use client';

import { LoadSpinner, Summary } from "@/components";
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
            <Summary
                actionButton={
                    <Link
                        className=" btn-primary justify-center  flex items-center"
                        href={'/checkout/address'}
                    >
                        <span>Continuar con la Compra</span>
                    </Link>

                }
            />



        </div>
    )
}
