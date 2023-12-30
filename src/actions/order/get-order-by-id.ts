'use server';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';


export const getOrderById = async (orderId: string) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    try {
        // const order = await prisma.order.findUnique({
        //     where: { id: orderId },
        // })
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                orderAddress: {
                    include: {
                        country: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                orderItems: {
                    select: {
                        quantity: true,
                        size: true,
                        price: true,
                        product: {
                            select: {
                                slug: true,
                                title: true,

                                productImages: {
                                    select: {
                                        url: true,
                                    },
                                    take: 1
                                }
                            }
                        }
                    },

                }
            }
        })

        if (!order) throw `${orderId} ordern no existente`
        if (session.user.role === 'user') {
            if (session.user.id !== order.userId) {
                throw `${order} no es de ese usuario`
            }
        }
        // const orderAddress = await prisma.orderAddress.findUnique({
        //     where: { orderId: order?.id }
        // })

        // const country = await prisma.country.findUnique({
        //     where: { id: orderAddress?.countryId }
        // })

        // const productsInOrder = await prisma.orderItems.findMany({
        //     where: { orderId: order?.id },
        // });

        // const productsWithImagesPromises = productsInOrder.map(async (p) => {
        //     return await prisma.product.findUnique({
        //         where: { id: p.productId },
        //         select: {
        //             id: true,
        //             productImages: true,
        //             title: true
        //         }
        //     });
        // })

        // const productWithImages = await Promise.all(productsWithImagesPromises);
        // if (!orderAddress) return {}
        // const { id, countryId, ...restAddres } = orderAddress as OrderAddress;
        // return {
        //     order,
        //     address: {
        //         ...orderAddress,
        //         country: country?.name
        //     },
        //     products: productsInOrder.map(p => ({
        //         ...p,
        //         size: p.size as string,
        //         title: productWithImages.find(
        //             pImg => pImg?.id === p.productId
        //         )?.title,
        //         image: productWithImages.find(
        //             pImg => pImg?.id === p.productId
        //         )?.productImages[0].url,
        //     })),
        // }

        return {
            ok: true,
            order
        }


    } catch (error: any) {
        console.log(error.message)
        return {
            ok: false,
            message: error.message,
        }
    }
}