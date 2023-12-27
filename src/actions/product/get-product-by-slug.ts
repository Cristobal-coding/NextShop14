'use server';
import prisma from '@/lib/prisma';


export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findUnique({
            include: {
                productImages: {
                    select: {
                        url: true,
                    }
                }
            },
            where: {
                slug: slug
            }
        })
        if (!product) return null;
        return {
            ...product,
            images: product.productImages.map(img => img.url),
        }
    }
    catch (error) {

    }
}