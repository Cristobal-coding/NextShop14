'use server';

import { auth } from "@/auth.config";

export const getOrdersByUser = async () => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'El usuario debe estar autenticado'
        }
    }

    const orders = await prisma?.order.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            orderAddress: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })

    return {
        ok: true,
        orders,
    }
}