import { QuantitySelector, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function CheckoutPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">

                <Title title={"Resumen de la Compra"} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    <div className="flex flex-col ">
                        <span className="text-xl">Ajustar elementos</span>
                        <Link href={'/cart'} className="underline mb-5">
                            Editar tu carrito
                        </Link>
                        {
                            productsInCart.map(p => (
                                <div key={p.slug} className="flex mb-8">
                                    <Image
                                        src={`/products/${p.images[0]}`}
                                        width={100}
                                        height={100}
                                        alt={p.title}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                        }}
                                        className="mr-5  rounded shadow-md"
                                    />
                                    <div>
                                        <p className={`${titleFont.className} antialiased`}>{p.title}</p>
                                        <p >${p.price} x 3</p>
                                        <p className="font-bold">Subtotal:${p.price * 3}</p>

                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex flex-col bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2">Dirección de Entrega</h2>
                        <div className="mb-10 ">
                            <p className="font-bold text-xl">Cristobal Herrera</p>
                            <p>Reñaca, Viña del Mar</p>
                            <p>Region de Valparaiso</p>
                        </div>
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>


                        <div className="grid grid-cols-2">
                            <span >Nro. Productos</span>
                            <span className="text-right">3 artículos</span>

                            <span >Subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span >Impuesto 19%</span>
                            <span className="text-right">$ 100</span>

                            <span className="font-bold mt-5 text-2xl">Total</span>
                            <span className="font-bold mt-5 text-2xl text-right">$ 100</span>
                        </div>

                        <div className="mt-5 mb-2 w-full ">
                            <Link
                                className="flex btn-primary justify-center"
                                href={'/orders/1234abc'}>
                                Comprar
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}