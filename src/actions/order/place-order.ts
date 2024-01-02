'use server'

import { auth } from "@/auth.config"
import { IAddress } from "@/interfaces"
import prisma from '@/lib/prisma';
import { Size } from "@prisma/client";

interface ProductToOrder {
    productId: string,
    quantity: number,
    size: Size,
}

export const placeOrder = async (productsInOrder: ProductToOrder[], address: IAddress) => {
    const session = await auth();
    const userId = session?.user.id
    if (!userId) {
        return {
            ok: false,
            message: 'Usuario no detectado'
        }
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productsInOrder.map(pt => pt.productId)
            }
        }
    })

    const itemsInOrder = productsInOrder.reduce((count, p) => count + p.quantity, 0);

    const { subTotal, impuesto, total } = productsInOrder.reduce((totales, item) => {

        const productQuantity = item.quantity;
        const product = products.find(p => p.id === item.productId);

        if (!product) throw new Error(`${item.productId} no existe - 500`)

        const subTotal = product.price * productQuantity;

        totales.subTotal += subTotal;
        totales.impuesto += subTotal * 0.19;
        totales.total += subTotal * 1.19

        return totales;
    }, { subTotal: 0, impuesto: 0, total: 0 })

    try {
        const { order, orderAddress, updatedProducts } = await prisma.$transaction(async (tx) => {
            const updatedProductsPromises = products.map(async (p) => {
                const productQuantity = productsInOrder.filter(
                    prod => prod.productId === p.id
                ).reduce((acc, item) => item.quantity + acc, 0);

                if (productQuantity === 0) {
                    throw new Error(`${p.id} no tiene cantidad definida`)
                }

                return tx.product.update({
                    where: { id: p.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            updatedProducts.forEach(p => {
                if (p.inStock <= 0) {
                    throw new Error(`"${p.title}" - No tiene inventario suficiente.`)
                }
            })



            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder,
                    subTotal,
                    impuesto,
                    total,

                    orderItems: {
                        createMany: {
                            data: productsInOrder.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0

                            }))
                        }
                    }

                }
            })

            const { country, ...restAddress } = address;
            console.log({ order })
            console.log({ restAddress })
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id,
                }
            });

            return {
                updatedProducts,
                order,
                orderAddress,
            }
        });

        return {
            ok: true,
            orderId: order.id,
            order, orderAddress, updatedProducts,
        }

    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error?.message
        }
    }


}