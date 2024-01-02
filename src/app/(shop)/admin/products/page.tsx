import { getPaginatedOrders, getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoArrowForwardOutline, IoArrowRedoCircleOutline, IoCardOutline, IoCashOutline, IoCloudUpload } from "react-icons/io5";

interface Props {
    searchParams: {
        page?: string,
    }
}


export default async function AdminProductsPage({ searchParams }: Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

    return (
        <>

            <div className="flex items-center flex-col mb-10 w-full">
                <div className="flex flex-col justify-center items-center xs:w-full sm:w-5/6 lg:w-2/3  ">
                    <div className="flex justify-between w-full ">
                        <Title title="Mantenimiento de Productos" />
                        <Link href={'/admin/product/new'} className="flex flex-col justify-end mb-5">
                            <button className="btn-primary ">Añadir Producto</button>
                        </Link>
                    </div>
                    <table className="w-full mb-10">
                        <thead className="bg-gray-200 border-b">
                            <tr>
                                <th scope="col" className="hidden md:table-cell text-sm font-medium text-gray-900 md:px-6 py-4 text-left">
                                    Producto
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-2  md:px-6 py-4 text-left">
                                    Nombre
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 md:px-6 py-4 text-left">
                                    Stock
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 md:px-6 py-4 text-center">
                                    Precio
                                </th>
                                <th scope="col" className=" text-sm font-medium text-gray-900 px-2 md:px-10 py-4 text-center">
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                products.map(product => {

                                    return (

                                        <tr key={product.id} className=" bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                            <td className="cursor-pointer hidden md:table-cell md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <Link href={`/products/${product.slug}`}>
                                                    <ProductImage
                                                        src={product.productImages[0]?.url}
                                                        height={80}
                                                        width={80}
                                                        alt={`${product.description}`}
                                                        className="object-cover rounded-md"

                                                    />
                                                </Link>
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-3 md:px-6 py-4 whitespace-nowrap">
                                                {`${product.title}`}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light md:px-6 py-4 whitespace-nowrap">
                                                {`${product.inStock}`}
                                            </td>


                                            <td className=" text-sm  text-gray-900 font-light md:px-6 py-4 whitespace-nowrap">


                                                <div className='min-w-[120px] justify-center flex items-center rounded-xl text-green-600'>
                                                    <IoCashOutline />
                                                    <span className='mx-2 font-bold antialiased'>${product.price}</span>
                                                </div>

                                            </td>

                                            <td className=" text-center text-sm  text-gray-900 font-light ">
                                                <Link href={`/admin/product/${product.slug}`} className=" inline-flex   gap-1 items-center  btn-primary !rounded-lg">
                                                    <span >Actualizar</span>

                                                    <IoCloudUpload size={20} />
                                                </Link>
                                                {/* <Link href={`/orders/${product.id}`} className="inline-flex lg:hidden !p-1  gap-1 items-center justify-center btn-primary !rounded-lg">

                                                        <IoArrowForwardOutline size={20} />
                                                    </Link> */}
                                            </td>



                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <Pagination totalPages={totalPages} />
                </div>

            </div >
        </>
    );
}