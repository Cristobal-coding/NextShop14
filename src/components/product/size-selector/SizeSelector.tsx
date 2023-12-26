import type { Size } from '@/interfaces'
import clsx from 'clsx'
import React from 'react'

interface Props {
    selectedSize: Size,
    availableSizes: Size[],
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
    return (
        <div className='my-5'>
            <h3 className='font-bold mb-4'>Tallas Disponibles</h3>

            <div className='flex '>
                {
                    availableSizes.map(size => (
                        <button
                            key={size}
                            className={
                                clsx(
                                    'mx-2 font-bold hover:border-black hover:border-b-2 text-lg',
                                    {
                                        'border-b-2 border-black': size === selectedSize,
                                    }
                                )
                            }
                        >
                            {size}
                        </button>
                    ))
                }
            </div>

        </div>
    )
}