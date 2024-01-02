'use client';

import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoSearchOutline, IoCartOutline, IoMenuOutline, IoTriangle } from 'react-icons/io5'
export const TopMenu = () => {
    const pathName = usePathname();
    const openSideMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <nav className='flex px-5 bg-white shadow-md py-4 md:py-0 justify-between items-center w-full'>
            <div>
                <Link href='/'>
                    <span className={`${titleFont.className} antialiased font-bold text-lg`}>Teslo</span>
                    <span className='text-lg'>| Shop</span>
                </Link>
            </div>
            <div className='hidden sm:block'>
                <Link className='menu-item' href='/category/men'>Hombres
                    {pathName.split('/')[2] === 'men' && <span className='absolute text-xs rounded-full px-1 -bottom-4 left-8 '>
                        <IoTriangle size={15} className='text-black fade-in' />
                    </span>}
                </Link>
                <Link className='menu-item' href='/category/women'>Mujeres
                    {pathName.split('/')[2] === 'women' && <span className='absolute text-xs rounded-full px-1 -bottom-4 left-6 '>
                        <IoTriangle size={15} className='text-black fade-in' />
                    </span>}
                </Link>
                <Link className='menu-item' href='/category/kid'>Niños
                    {pathName.split('/')[2] === 'kid' && <span className='absolute text-xs rounded-full px-1 -bottom-4 left-5 '>
                        <IoTriangle size={15} className='text-black fade-in' />
                    </span>}
                </Link>
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
                <button onClick={() => openSideMenu()} className='md:m-2 md:p-2 rounded-md transition-all hover:bg-gray-100'>
                    <IoMenuOutline size={30} />
                </button>

            </div>
        </nav>
    )
}
