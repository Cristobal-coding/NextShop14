'use server';
import prisma from '@/lib/prisma';

export const getStockBySlug = async (slug: string): Promise<number> => {
    try {
        const stock = await prisma.product.findUnique({
            where: { slug },
            select: { inStock: true },
        })
        if (!stock) throw new Error();
        const { inStock } = stock;
        return inStock;
    } catch (error) {
        console.log(error)
        throw new Error('Error al cargar stock by slug.')
    }
}