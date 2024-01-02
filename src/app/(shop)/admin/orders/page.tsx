import { getPaginatedOrders } from "@/actions";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoArrowRedoCircleOutline, IoCardOutline } from "react-icons/io5";

export default async function AdminsOrdersPage() {

    const { ok, orders = [] } = await getPaginatedOrders();
    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <>

            <div className="inline-flex flex-col items-center mb-10 w-full">
                <Title title="Todas las Ordenes" />
                <table className="w-full sm:w-5/6 lg:w-2/3 ">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #Id
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre completo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Estado
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map(order => {

                                return (
                                    <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {order.id.split('-').at(-1)}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {`${order.orderAddress?.firstName}  ${order.orderAddress?.lastName}`}
                                        </td>

                                        {
                                            order.isPaid
                                                ? (
                                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">


                                                        <div className='min-w-[120px] justify-center flex items-center rounded-xl border p-1 border-green-600 text-green-600'>
                                                            <IoCardOutline />
                                                            <span className='mx-2 font-bold antialiased'>Pagada</span>
                                                        </div>

                                                    </td>
                                                )
                                                : (
                                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                                        <div className='min-w-[120px] justify-center flex items-center rounded-xl border p-1 border-red-600 text-red-600'>
                                                            <IoCardOutline size={20} />
                                                            <span className='mx-2  font-bold antialiased'>No Pagada</span>
                                                        </div>

                                                    </td>
                                                )
                                        }
                                        <td className="text-sm  text-gray-900 font-light px-6 ">
                                            <Link href={`/orders/${order.id}`} className="inline-flex gap-1 items-center  btn-primary !rounded-lg">
                                                <span> Ver orden</span>
                                                <IoArrowRedoCircleOutline size={20} />
                                            </Link>
                                        </td>



                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
}