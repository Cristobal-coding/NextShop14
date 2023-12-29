'use server';
import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
    try {
        const addressToDelete = await prisma.userAddress.delete({
            where: { userId, }
        })
        return {
            ok: true,
            address: addressToDelete
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo eliminar la direccion del usuario.'
        }
    }
}