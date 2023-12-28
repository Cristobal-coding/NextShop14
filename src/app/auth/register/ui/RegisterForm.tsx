'use client';

import { login, registerUser } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoWarningOutline } from 'react-icons/io5';

type FormInputs = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors, }, getValues } = useForm<FormInputs>();

    const onSubmit = async (data: FormInputs) => {
        const { email, password, name } = data;

        const resp = await registerUser(name, email, password);
        console.log({ resp })

        if (!resp.ok) {
            setErrorMessage(resp?.message ?? '')
            return;
        }

        await login(email.toLowerCase(), password);
        window.location.replace('/')
    }

    const passwordMatchValidator = (value: string) => {
        const password = getValues('password');
        return password === value || 'Las contraseñas no coinciden';
    };
    console.log({ errors })
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label className='flex justify-between' htmlFor="username">
                <span> Nombre</span>
                <small className='ml-2 text-red-500'>
                    {errors.name?.message ?? ''}
                </small>
            </label>
            <input
                {...register('name', { required: 'El nombre es obligatorio*', })}
                className={clsx(
                    "px-5 py-2 border transition-all rounded mb-5 shadow-md bg-gray-200 outline-none",
                    {
                        'focus:shadow-blue-300 fade-in': !errors.name,
                        'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500': errors.name
                    }
                )}
                type="text"
                autoFocus
            />



            <label className='flex justify-between' htmlFor="username">
                <span> Correo Electronico</span>
                <small className='ml-2 text-red-500'>
                    {errors.email?.message ?? ''}
                </small>
            </label>
            <input
                {...register('email', { required: 'El correo es obligatorio*', pattern: /^\S+@\S+$/i, })}
                className={
                    clsx("px-5 py-2 border transition-all bg-gray-200 shadow-md rounded mb-5 outline-none ",
                        {
                            'focus:shadow-blue-300 fade-in': !errors.email,
                            'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500': errors.email
                        }
                    )
                }
                type="email" />

            <label className='flex justify-between' htmlFor="username">
                <span> Contraseña</span>
                <small className='ml-2 text-red-500'>
                    {errors.password?.message ?? ''}
                </small>
            </label>
            <input
                {...register('password', { required: 'La contraseña es obligatoria*', minLength: 6 })}
                className={clsx("px-5 py-2 border shadow-md transition-all  bg-gray-200 rounded mb-5 outline-none",
                    {
                        'focus:shadow-blue-300 fade-in': !errors.password,
                        'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500': errors.password
                    }
                )}
                type="password"
            />

            <label htmlFor="passwordConfirm">Confirmar Contraseña</label>
            <input
                {...register('passwordConfirm', { required: true, validate: passwordMatchValidator })}
                className={clsx("px-5 py-2 transition-all border shadow-md bg-gray-200 rounded mb-2 outline-none",
                    {
                        'focus:shadow-blue-300 fade-in': !errors.passwordConfirm,
                        'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500': errors.passwordConfirm
                    }
                )}
                type="password"
            />
            <div className='flex flex-col justify-center items-start px-1 mb-2'>
                {errors.passwordConfirm?.message && (
                    <span className="text-red-500 flex">
                        <IoWarningOutline size={20} />
                        {errors.passwordConfirm.message}
                    </span>
                )}
                {errorMessage && (
                    <span className="text-red-500 flex">
                        <IoWarningOutline size={20} />
                        {errorMessage}
                    </span>
                )}
            </div>

            <button

                className="btn-primary">
                Registrarse
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                ¿Ya tienes una cuenta?
            </Link>
        </form>
    );
}
