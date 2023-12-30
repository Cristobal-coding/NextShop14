'use server';

import { PayPalResponse } from "@/interfaces";
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
    const authToken = await getPayPalBearerToken();


    if (!authToken) {
        return {
            ok: false,
            message: 'No se puedo obtener el token de verificacion.'
        }
    }

    const resp = await verifyPayPalPayment(paypalTransactionId, authToken);
    if (!resp) {
        return {
            ok: false,
            message: 'Error al verificar el pago'
        }
    }

    const { status, purchase_units } = resp;
    const { invoice_id: orderId } = purchase_units[0];
    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: 'El cobro aun no se ha procesado...'
        }
    }

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        })
        revalidatePath(`/orders/${orderId}`)
        return {
            ok: true,
            message: `Pago verificado para la orden "${orderId}"`
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `El pago no se puedo registrar en la orden "${orderId ?? 'NO SE ENCONTRO ID'}"`
        }
    }

}

const getPayPalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const PAYPAL_SECRET_ID = process.env.PAYPAL_SECRET
    const outh2Url = process.env.PAYPAL_OAUTH_URL


    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_ID}`,
        'utf-8',
    ).toString('base64')

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
        "Authorization",
        `Basic ${base64Token}`
    );

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(outh2Url!, {
            ...requestOptions,
            cache: 'no-store'
        }).then(data => data.json())
        return result.access_token
    } catch (error) {
        console.log(error)
        return null;
    }
}

const verifyPayPalPayment = async (paypalTransactionId: string, bearerToken: string): Promise<PayPalResponse | null> => {
    const paypalOrdersUrl = process.env.PAYPAL_ORDERS_URL
    const myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        `Bearer ${bearerToken}`
    );

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,

    };

    try {
        const resp = await fetch(`${paypalOrdersUrl}/${paypalTransactionId}`, {
            ...requestOptions,
            cache: 'no-store',
        }).then(data => data.json())

        return resp;
    } catch (error) {
        console.log(error);
        return null;
    }



}