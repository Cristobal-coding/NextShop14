'use client';


import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { LoadSpinner } from '..';
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
    orderId: string,
    amount: number,
}

export const PayPalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();
    const roundedAmount = (Math.round(amount * 100) / 100)

    if (isPending) {
        return (
            <>
                <LoadSpinner />
            </>
        );
    }

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        try {
            const transactionId = await actions.order.create({
                purchase_units: [{
                    invoice_id: orderId,
                    amount: {
                        value: roundedAmount.toString(),
                    }
                }],
            });
            const resp = await setTransactionId(orderId, transactionId)
            console.log({ resp })
            if (!resp.ok) {
                throw new Error('No se pudo actualizar la orden.')
            }
            return transactionId;
        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message)
        }


    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        const details = await actions.order?.capture();
        if (!details) return;

        const resp = await paypalCheckPayment(details.id)
        console.log({ resp });
    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}

        />


    )
}
