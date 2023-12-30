import { QuantitySelector, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function CheckoutPage() {
    return (
        <div className="flex justify-center items-center mb-72 md:px-10">
            <div className="flex flex-col w-[1000px]">

                <Title title={"Resumen de la Compra"} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-10">

                    <div className="flex flex-col ">


                        <ProductsInCart />
                    </div>
                    <PlaceOrder />

                </div>
            </div>
        </div>
    );
}