'use client';

import Link from 'next/link'
import { authenticate } from '@/actions';
import { useFormState, useFormStatus } from 'react-dom'
import { IoInformationCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

export const LoginForm = () => {

    const [state, dispatch] = useFormState(authenticate, undefined);
    // const router = useRouter();
    useEffect(() => {
        if (state === 'Success') {
            // router.replace('/')
            window.location.replace('/')
        }
    }, [state])

    return (
        <form action={dispatch} className="flex flex-col">


            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border shadow-md transition-all  bg-gray-200 rounded mb-5 outline-none focus:shadow-blue-300 fade-in"
                type="email" name='email' />


            <label htmlFor="password">Contraseña</label>
            <input
                className="px-5 py-2 border shadow-md transition-all  bg-gray-200 rounded mb-5 outline-none focus:shadow-blue-300 fade-in"
                type="password" name='password' />


            {
                state === 'CredencialeIncorrectas' && (
                    <div className='flex fade-in justify-center mt-2 items-center'>
                        <IoInformationCircleOutline size={20} className={'text-red-500'} />
                        <p className='text-red-500'>Credenciales Incorrectas</p>
                    </div>
                )
            }
            <LoginButton />
            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/register"
                className="btn-secondary text-center">
                Registrate aqui
            </Link>

        </form>
    )
}


function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type='submit'
            className={clsx(

                {
                    'btn-primary': !pending,
                    'btn-disabled': pending
                }
            )}>
            Ingresar
        </button>

    );
}