import clsx from 'clsx'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface Props {
    register: UseFormRegister<any>,
    label: string,
    name: string,
    type: 'password' | 'text' | 'email' | 'number'
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
                className={clsx("form-input",
                    {
                        'form-focus': !errors[name],
                        'form-error-focus': errors[name]
                    }
                )}
                type={type}
            />
        </>
    )
}
