'use server'
import prisma from '@/lib/prisma';


export const getAllCategories = async () => {

    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return {
            ok: true,
            categories
        }
    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message,
        }
    }
}