export const revalidate = 60

import { Pagination, ProductGrid, Title } from "@/components";
import { notFound, redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
    searchParams: {
        page?: string,

    },
    params: {
        gender: string,
    }
}

const labels: Record<string, string> = {
    'kid': 'Niños',
    'men': 'Hombres',
    'women': 'Mujeres',
    'unisex': 'Todos'
}


export default async function CategoryPage({ params, searchParams }: Props) {

    const { gender } = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    if (!['kid', 'men', 'women'].includes(gender)) {
        notFound();
    }

    const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender, take: 3 })
    if (products.length === 0) redirect(`/gender/${gender}`)
    return (
        <>
            <Title
                title={`Productos para ${labels[gender]}`}
                subtitle={"Todos los Productos"}
            />
            <ProductGrid products={products} />
            <Pagination totalPages={totalPages} />
        </>
    );
}