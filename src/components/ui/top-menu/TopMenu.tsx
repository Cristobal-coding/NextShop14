'use client';

import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'
export const TopMenu = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true);
    }, [])


    return (
        <nav className='flex px-5 justify-between items-center w-full'>
            <div>
                <Link href='/'>
                    <span className={`${titleFont.className} antialiased font-bold text-lg`}>Teslo</span>
                    <span className='text-lg'>| Shop</span>
                </Link>
            </div>
            <div className='hidden sm:block'>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-slate-100' href='/category/men'>Hombres</Link>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-slate-100' href='/category/women'>Mujeres</Link>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-slate-100' href='/category/kid'>Niños</Link>
            </div>

            <div className='flex items-center'>
                <Link href={'/search'}>
                    <IoSearchOutline size={25} />
                </Link>
                <Link href={`/cart${totalItemsInCart === 0 && loaded ? '/empty' : ''}`} className='mx-2'>
                    <div className='relative fade-in'>
                        {
                            (loaded && totalItemsInCart > 0) &&
                            (
                                <span className='absolute text-xs rounded-full px-1 -top-2 text-white bg-red-500 -right-2'>
                                    {totalItemsInCart}
                                </span>
                            )
                        }

                        <IoCartOutline size={25} />
                    </div>
                </Link>
                <button onClick={() => openSideMenu()} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Menú
                </button>

            </div>
        </nav>
    )
}
