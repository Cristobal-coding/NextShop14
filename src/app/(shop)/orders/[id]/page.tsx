import { getOrderById } from "@/actions";
import { PaidButton, PayPalButton, Summary, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { CartProduct, IAddress } from "@/interfaces";
import { Order } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCallSharp, IoCardOutline } from "react-icons/io5";


interface Props {
    params: { id: string }
}

interface OrderData {
    products: CartProduct[] | null,
    address: IAddress | null,
    order: Order | null,
}

export default async function OrderPage({ params }: Props) {
    const { id } = params;

    const { order } = await getOrderById(id)

    if (!order) {
        redirect('/orders')
    }

    const address = order!.orderAddress;

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">

                <Title title={`Orden #${id.split('-').at(-1)}`} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">



                    <div className="flex flex-col ">
                        <PaidButton isPaid={order.isPaid} />
                        {
                            order.orderItems?.map(p =>
                            (<div key={`${p.product.slug}-${p.size}`} className="flex mb-8">
                                <Image
                                    src={`/products/${p.product.productImages[0].url}`}
                                    width={100}
                                    height={100}
                                    alt={p.product.title}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                    }}
                                    className="mr-1 md:mr-5  rounded shadow-md"
                                />
                                <div className='w-full'>
                                    <p className={`${titleFont.className} antialiased`}>{p.product.title}</p>
                                    <div className='flex justify-between  mt-1'>
                                        <p className='font-bold'>
                                            Precio:
                                            <span className='ml-2 font-light antialiased'>${p.price}</span>
                                        </p>
                                        <span className=" max-w-28 inline-flex md:ml-5 bg-blue-500 text-white text-xs font-medium items-center px-2.5 py-0.5 rounded ">
                                            {/* <IoCheckboxOutline className='mr-1' /> */}
                                            {`x ${p.quantity} Unidades`}
                                        </span>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <p className='font-bold'>
                                            Subtotal:
                                            <span className='ml-2 font-light antialiased'>${p.price * p.quantity}</span>
                                        </p>
                                        <p className='font-bold'>
                                            Talla:
                                            <span className='ml-2 font-light antialiased'>{p.size}</span>
                                        </p>
                                    </div>

                                </div>
                            </div>)
                            )
                        }
                    </div>

                    <div className="flex flex-col bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2">Dirección de Entrega</h2>
                        <div className="mb-5 ">
                            <p className="text-xl font-bold">
                                {address?.firstName} {address?.lastName}
                            </p>
                            <p className="flex items-center"><FaMapMarkerAlt className={'mr-1'} />  {address?.address}</p>
                            <p className="ml-5">{address?.address2}</p>
                            <p className="ml-5">{address?.postalCode}</p>
                            <p className="ml-5">
                                {address?.city}, {address?.country.name}
                            </p>
                            <p className="flex items-center gap-2 ml-5">
                                {address?.phone}
                                <IoCallSharp />
                            </p>
                        </div>
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">

                            <Summary order={order} />
                        </div>

                        <div className="mt-5 mb-2 w-full ">
                            {
                                !order.isPaid
                                    ? (

                                        <PayPalButton
                                            amount={order.total}
                                            orderId={order.id}
                                        />
                                    )
                                    : <PaidButton isPaid={order.isPaid} />
                            }


                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}