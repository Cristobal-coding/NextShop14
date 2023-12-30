'use client';
import { logout } from '@/actions';
import { useUIStore } from '@/store'
import clsx from 'clsx'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar = () => {
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    const { data: session, } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = session?.user.role === 'admin';

    return (
        <div>
            {/* opacity */}
            {
                isSideMenuOpen && (
                    <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
                )
            }
            {/* blur */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={() => closeMenu()}
                        className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm' />
                )
            }


            <nav className={
                clsx(
                    'fixed p-5  sm:right-0 top-0 w-full sm:w-[500px] h-screen bg-white z-10 shadow-2xl transform transition-all duration-300',
                    {
                        "translate-x-full": !isSideMenuOpen,
                    },
                )
            }>
                <IoCloseOutline
                    onClick={() => closeMenu()}
                    size={50} className="absolute top-5 right-5 cursor-pointer" />
                <div className='relative mt-14'>
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />

                    {/* Menú */}
                    {
                        isAuthenticated && (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => closeMenu()}
                                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                >
                                    <IoPersonOutline size={30} />
                                    <span className="ml-3 text-xl">Perfil</span>
                                </Link>

                                <Link
                                    onClick={() => closeMenu()}
                                    href="/orders"
                                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                >
                                    <IoTicketOutline size={30} />
                                    <span className="ml-3 text-xl">Ordenes</span>
                                </Link>
                            </>
                        )
                    }


                    {
                        !isAuthenticated && (
                            <Link
                                onClick={() => closeMenu()}
                                href="/auth/login"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoLogInOutline size={30} />
                                <span className="ml-3 text-xl">Ingresar</span>
                            </Link>
                        )
                    }

                    {
                        isAuthenticated && (
                            <button
                                onClick={() => logout()}
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoLogOutOutline size={30} />
                                <span className="ml-3 text-xl">Salir</span>
                            </button>
                        )
                    }



                    {
                        isAdmin && (

                            <>
                                {/* Line Separator */}
                                <div className="w-full h-px bg-gray-200 my-10" />
                                <Link
                                    href="/"
                                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                >
                                    <IoShirtOutline size={30} />
                                    <span className="ml-3 text-xl">Productos</span>
                                </Link>

                                <Link
                                    href="/"
                                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                >
                                    <IoTicketOutline size={30} />
                                    <span className="ml-3 text-xl">Ordenes</span>
                                </Link>

                                <Link
                                    href="/"
                                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                >
                                    <IoPeopleOutline size={30} />
                                    <span className="ml-3 text-xl">Usuarios</span>
                                </Link>
                            </>
                        )
                    }



                </div>
            </nav>



        </div >
    )
}
