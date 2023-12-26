'use server';
import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';
interface PaginationOptions {
    page?: number,
    take?: number,
    gender?: string,

}
export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    try {
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                productImages: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender: gender as Gender,
            }
        })
        const totalCount = await prisma.product.count({ where: { gender: gender as Gender, } });
        const totalPages = Math.ceil(totalCount / take)
        return {
            currentPage: page,
            totalPages,
            products: products.map(p => ({
                ...p,
                images: p.productImages.map(img => img.url),
            }))
        }
    } catch (error) {
        throw new Error('Error al cargar productos en el HoME')
    }
}