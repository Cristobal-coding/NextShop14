export const revalidate = 10080; //7 dias

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { slug } = params;
    const product = await getProductBySlug(slug);

    return {
        title: product?.title ?? 'Not Found',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Not Found',
            description: product?.description ?? '',
            images: [`/product/${product?.productImages[0].url}`]
        }
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = params;
    const product = await getProductBySlug(slug);

    if (!product) notFound();
    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-12 gap-3">

            <div className="col-span-1 md:col-span-7  ">
                <ProductMobileSlideShow className="block md:hidden"
                    images={product.images} title={product.title} />
                <ProductSlideShow className="hidden md:block"
                    images={product.images} title={product.title} />
            </div>

            <div className="col-span-1 md:col-span-5  px-5">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="mb-5 text-xl">${product.price}</p>
                <StockLabel slug={product.slug} />
                <AddToCart product={product} />
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>

        </div>
    );
}