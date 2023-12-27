'use client';

import { LoadSpinner } from '@/components';
import type { Size } from '@/interfaces'
import { useCartStore } from '@/store';
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
    selectedSize?: Size,
    idProd?: string,
    availableSizes: Size[],

    onSizeChanged: (size: Size) => void
    setQuantity?: Dispatch<SetStateAction<number>>
}

export const SizeSelector = ({ setQuantity, selectedSize, availableSizes, onSizeChanged, idProd = '' }: Props) => {
    const [loaded, setLoaded] = useState(false)
    const getTotalItemsBySize = useCartStore(state => state.getTotalItemsBySize);
    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return <LoadSpinner />
    }


    return (
        <div className='my-5'>
            <h3 className='font-bold mb-4'>Tallas Disponibles</h3>

            <div className='flex '>
                {
                    availableSizes.map(size => {
                        const items = getTotalItemsBySize(idProd, size);

                        return <button
                            onClick={() => {
                                if (setQuantity !== undefined) {
                                    if (items === 0) {
                                        setQuantity(1)
                                    } else {
                                        setQuantity(items)
                                    }
                                }
                                onSizeChanged(size)
                            }}
                            key={size}
                            className={
                                clsx(
                                    'mx-2 relative font-bold hover:border-black hover:border-b-2 text-lg',
                                    {
                                        'border-b-2 border-black': size === selectedSize,
                                    }
                                )
                            }
                        >
                            {size}
                            {
                                items !== 0 && <span className='absolute shadow-sm shadow-blue-500 text-xs rounded-full font-light px-1 -top-2 text-white bg-blue-500 -right-2'>
                                    {items}
                                </span>}
                        </button>
                    })
                }
            </div>

        </div>
    )
}
