'use client';

import { deleteUserAddress, setUserAddress } from '@/actions';
import { InputForm } from '@/components';
import { IAddress, ICountry } from '@/interfaces';
import { useAddressStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = IAddress & {
    rememberAddress: boolean,
}

interface Props {
    countries: ICountry[],
    userStoredAddress?: Partial<IAddress>,
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
    const router = useRouter()
    const { handleSubmit, register, formState: { isValid, errors }, reset } = useForm<FormInputs>({
        defaultValues: {
            ...(userStoredAddress),
            rememberAddress: false,
        },
    },);
    const setAddress = useAddressStore(state => state.setAddress);
    const address = useAddressStore(state => state.address);

    const { data: session } = useSession({ required: true, })

    useEffect(() => {
        if (address.firstName && Object.keys(userStoredAddress).length === 0) {
            return reset(address)
        }
    }, [])

    const onSubmit = async (dataForm: FormInputs) => {
        const { rememberAddress, ...restAddress } = dataForm;
        setAddress(restAddress);
        if (rememberAddress) {
            await setUserAddress(restAddress, session!.user.id);
        } else {
            await deleteUserAddress(session!.user.id)
        }

        router.push('/checkout')

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">


            <div className="flex flex-col mb-2">
                <InputForm
                    errors={errors}
                    register={register}
                    name='firstName'
                    label='Nombre'
                    type='text'
                    message='El nombre es obligatorio*'
                />
            </div>

            <div className="flex flex-col mb-2">
                <InputForm
                    errors={errors}
                    register={register}
                    name='lastName'
                    label='Apellidos'
                    type='text'
                    message='Los apellidos son obligatorios*'
                />
            </div>

            <div className="flex flex-col mb-2">
                <InputForm
                    errors={errors}
                    register={register}
                    name='address'
                    label='Direccion'
                    type='text'
                    message='La direccion es obligatoria*'
                />
            </div>

            <div className="flex flex-col mb-2">
                <InputForm
                    errors={errors}
                    register={register}
                    name='address2'
                    label='Direccion 2 (Opcional)'
                    type='text'
                />
            </div>


            <div className="flex flex-col mb-2">
                <InputForm
                    errors={errors}
                    register={register}
                    name='postalCode'
                    label='Codigo Postal'
                    type='text'
                    message='El Codigo es obligatorio*'
                />
            </div>

            <div className="flex flex-col mb-2">
                <InputForm
                    errors={errors}
                    register={register}
                    name='city'
                    label='Ciudad'
                    type='text'
                    message='La Ciudad es obligatoria*'
                />
            </div>

            <div className="flex flex-col mb-2">
                <label className='flex justify-between'>
                    <span> País</span>
                    <small className='ml-2 text-red-500'>
                        {errors.country?.message as string ?? ''}
                    </small>
                </label>
                <select
                    {...register('country', { required: 'El pais es obligatorio*' })}
                    className={clsx("px-5 py-2 border shadow-md transition-all  bg-gray-200 rounded mb-5 outline-none",
                        {
                            'focus:shadow-blue-300 fade-in': !errors.country,
                            'border-red-500 focus:shadow-red-300  focus:border-red-500 focus:ring-1 focus:ring-red-500': errors.country
                        }
                    )}
                >
                    <option value="">[ Seleccione ]</option>
                    {
                        countries.map(({ id, name }) => {
                            return <option key={id} value={id}>{name}</option>
                        })
                    }
                </select>
            </div>

            <div className="flex flex-col mb-2">
                <InputForm
                    errors={errors}
                    register={register}
                    name='phone'
                    label='Telefono'
                    type='text'
                    message='El telefono es obligatorio*'
                />
            </div>



            <div className="flex flex-col mb-1 sm:mt-10">


                <div className="inline-flex items-center">
                    <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor='checkbox'
                    >
                        <input
                            {...register('rememberAddress',)}
                            type="checkbox"
                            className="bg-gray-400 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </label>

                    <span>¿Usar esta direccion?</span>
                </div>

                <div className="w-full pt-5 px-4 mb-8 mx-auto ">
                    <div className="text-sm text-gray-700 py-1">
                        Esta sera tu direccion <span className="text-gray-700 font-semibold" >Principal</span> para <span className="text-gray-700 font-semibold" > tus Compras</span>.
                    </div>
                </div>

                <button
                    disabled={!isValid}
                    type='submit'
                    className={clsx(
                        {
                            'btn-primary': isValid,
                            'btn-disabled': !isValid,
                        }

                    )}>
                    Siguiente
                </button>
                {/* <Link
                    href='/checkout'
                    className="btn-primary flex w-full sm:w-1/2 justify-center ">
                    Siguiente
                </Link> */}
            </div>


        </form>
    )
}
