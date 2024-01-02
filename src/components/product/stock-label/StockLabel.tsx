'use client';

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
    slug: string,
}


export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0)
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        const getStock = async () => {
            const stock = await getStockBySlug(slug);
            setStock(stock)
            setisLoading(false)
        }
        getStock();
    }, [slug])




    return (
        <div className="flex">
            {
                isLoading
                    ? <span className="animete-pulse w-1/3 h-6 bg-gray-200" />
                    : (
                        <>
                            <h2 className={`${titleFont.className} antialiased font-bold text-lg`}>
                                Stock:
                                <span className="ml-5 bg-blue-500 text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
                                    <IoCheckboxOutline className='mr-1' />
                                    {`${stock} Unidades`}
                                </span>
                                {/* <span className="ml-5 bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                                    <IoSquareOutline className='mr-1' />
                                    {`Agotado`}
                                </span> */}
                            </h2>
                        </>
                    )
            }
        </div>
    )
}
