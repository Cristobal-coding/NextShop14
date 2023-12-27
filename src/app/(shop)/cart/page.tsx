import { Title } from "@/components";

import Link from "next/link";

import { ProductsInCart } from "./ui/ProductsInCart";
import { OrdenSummary } from "./ui/OrdenSummary";
import { useCartStore } from "@/store";


export default function CartPage() {


    // if (totalItemsInCart === 0) redirect('/cart/empty')
    return (
        <div className="flex justify-center items-center mb-72">
            <div className="flex flex-col md:w-[1000px]">

                <Title title={"Carrito"} />
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">

                    <div className="flex flex-col mt-5 col-span-1 sm:col-span-7 md:col-span-6">
                        <span className="text-xl">Agregar mas items</span>
                        <Link href={'/'} className="underline mb-5">
                            Continuar Comprando...
                        </Link>
                        <ProductsInCart />
                    </div>

                    <div className="flex p-5 md:p-7 md flex-col col-span-1 sm:col-span-5 md:col-span-6  h-fit bg-white rounded-xl shadow-xl ">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <OrdenSummary />
                    </div>

                </div>
            </div>
        </div>
    );
}