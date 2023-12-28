'use client';

import clsx from 'clsx';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
interface Props {
    quantity: number;
    onQuantityChanged: (count: number) => void;

}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
    // const [count, setCount] = useState<number | undefined>(quantity)

    const valueChanged = (value: number) => {
        if (quantity + value < 1) return;

        onQuantityChanged(quantity + value)
    }


    return (
        <div className='flex'>
            <button
                disabled={quantity === 1}
                className={clsx(
                    '',
                    {
                        'cursor-not-allowed text-gray-400': quantity === 1,
                    }
                )}
                onClick={() => valueChanged(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className='border rounded-md w-20 mx-3 px-5 bg-gray-200 text-center'>
                {quantity}
            </span>
            <button onClick={() => valueChanged(+1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
