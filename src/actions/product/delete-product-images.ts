'use server'
import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '',);

export const deleteProductImages = async (imageId: number, imageUrl: string) => {
    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            message: 'No se pueden eliminar imagenes del filesystem'
        }
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

    try {
        await cloudinary.uploader.destroy(imageName);
        const deletedImage = await prisma.productImage.delete({
            where: { id: imageId },
            select: {
                product: {
                    select: {
                        slug: true,
                    }
                }
            }
        })

        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/products/${deletedImage.product.slug}`)
        revalidatePath(`/product/${deletedImage.product.slug}`)
    } catch (error) {

    }
}