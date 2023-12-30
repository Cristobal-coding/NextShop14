'use server';
import prisma from '@/lib/prisma';


export const getUserAddress = async (userId: string) => {

    try {
        const address = await prisma.userAddress.findUnique({
            where: { userId }
        })
        if (!address) return { ok: true, address: {} };

        const { countryId, id, userId: uuid, ...restAddress } = address;
        return {
            ok: true,
            address: { ...restAddress, country: countryId },
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al encontrar la direccion del usuario'
        }
    }
}