'use client'
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { Order } from '@prisma/client';
import React from 'react'

interface Props {
    actionButton?: React.ReactNode,
    order?: Order
}

export const Summary = ({ actionButton, order }: Props) => {
    const summary = useCartStore(state => state.getSummaryInformation());
    return (
        <>
            <span >Nro. Productos</span>
            <span className="text-right">
                {
                    order
                        ? order.itemsInOrder
                        : summary.itemsInCart
                }

                <p className='w-1 inline-block'></p>
                artículos
            </span>

            <span >Subtotal</span>
            <span className="text-right">
                {
                    order
                        ? currencyFormat(order.subTotal)
                        : currencyFormat(summary.subTotal)
                }
            </span>

            <span >Impuesto 19%</span>
            <span className="text-right">
                {
                    order
                        ? currencyFormat(order.impuesto)
                        : currencyFormat(summary.impuesto)
                }
            </span>

            <span className="font-bold mt-5 text-2xl">Total</span>
            <span className="font-bold mt-5 text-2xl text-right">
                {
                    order
                        ? currencyFormat(order.total)
                        : currencyFormat(summary.total)
                }
            </span>

            {
                !order && (
                    <div className=" w-full mt-5 mb-2 col-span-2 ">
                        {
                            actionButton
                        }
                    </div >
                )
            }
        </>
    )
}
