import clsx from 'clsx'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface Props {
    register: UseFormRegister<any>,
    label: string,
    name: string,
    type: 'password' | 'text' | 'email'
    message?: string,
    errors: FieldErrors<any>
}

export const InputForm = ({ register, name, label, type, message, errors }: Props) => {
    return (
        <>
            <label className='flex justify-between'>
                <span> {label}</span>
                <small className='ml-2 text-red-500'>
                    {errors[name]?.message as string ?? ''}
                </small>
            </label>
            <input
                {...register(name, { required: message })}
                className={clsx("px-5 py-2 border shadow-md transition-all  bg-gray-200 rounded mb-5 outline-none",
                    {
                        'focus:shadow-blue-300 fade-in': !errors[name],
                        'border-red-500 focus:shadow-red-300  focus:border-red-500 focus:ring-1 focus:ring-red-500': errors[name]
                    }
                )}
                type={type}
            />
        </>
    )
}
