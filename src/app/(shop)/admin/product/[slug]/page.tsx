import { getAllCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string
    }
}

export default async function AdminProductPage({ params }: Props) {

    const { slug } = params;
    const [product, { categories }] = await Promise.all([
        await getProductBySlug(slug),
        await getAllCategories()
    ])


    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }


    const title = (slug === 'new') ? 'Agregar Producto' : 'Actualizar Producto'
    return (
        <div className="px-3 sm:px-8">
            <Title title={title ?? ''} />
            <ProductForm categories={categories ?? []} product={product ?? {}} />
        </div>
    );
}