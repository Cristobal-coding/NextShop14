'use server';

import type { IAddress } from "@/interfaces";
import prisma from '@/lib/prisma';


export const setUserAddress = async (address: IAddress, userId: string) => {
    try {
        const newAddress = await createOrReplaceAddress(address, userId)
        return {
            ok: true,
            address: newAddress,
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo guardar la direccion del usuario.'
        }
    }
}

const createOrReplaceAddress = async (address: IAddress, userId: string) => {

    try {
        const storedAddress = await prisma.userAddress.findUnique({
            where: { userId }
        })
        const addressToSave = {
            countryId: address.country!,
            userId: userId,
            firstName: address.firstName!,
            lastName: address.lastName!,
            address: address.address!,
            address2: address.address2!,
            postalCode: address.postalCode!,
            city: address.city!,
            phone: address.phone!,
        }
        if (!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave,
            })

            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update({
            where: { userId },
            data: addressToSave,
        })

        return updatedAddress;
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo guardar la direccion del usuario.')
    }
}