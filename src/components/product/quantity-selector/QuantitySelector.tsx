'use client';

import React, { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
interface Props {
    quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
    const [count, setCount] = useState<number>(quantity)

    const quantityChanged = (value: number) => {
        if (count + value < 1) return;

        setCount(count + value)
    }


    return (
        <div className='flex'>
            <button onClick={() => quantityChanged(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className='border rounded-md w-20 mx-3 px-5 bg-gray-200 text-center'>
                {count}
            </span>
            <button onClick={() => quantityChanged(+1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}