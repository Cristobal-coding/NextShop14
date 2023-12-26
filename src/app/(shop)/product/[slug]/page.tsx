
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: { slug: string }
}

export default function ProductPage({ params }: Props) {
    const { slug } = params;
    const product = initialData.products.find(p => p.slug === slug)

    if (!product) notFound();
    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

            <div className="col-span-1 md:col-span-2">
                <ProductMobileSlideShow className="block md:hidden"
                    images={product.images} title={product.title} />
                <ProductSlideShow className="hidden md:block"
                    images={product.images} title={product.title} />
            </div>

            <div className="col-span-1 px-5">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="mb-5 text-xl">${product.price}</p>

                <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />
                <QuantitySelector quantity={3} />
                <button className="btn-primary my-5">
                    Agregar al Carro
                </button>
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>

        </div>
    );
}