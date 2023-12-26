import { QuantitySelector, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function CartPage() {

    // redirect('/cart/empty')
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">

                <Title title={"Carrito"} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar mas items</span>
                        <Link href={'/'} className="underline mb-5">
                            Continuar Comprando...
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
                                        <p className="font-bold">${p.price}</p>
                                        <QuantitySelector quantity={3} />

                                        <button className="underline mt-3">Remover</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex flex-col h-fit bg-white rounded-xl shadow-xl p-7">
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
                                href={'/checkout/address'}>
                                Checkout
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}