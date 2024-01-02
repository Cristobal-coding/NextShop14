"use client";

import { InputForm, ProductImage } from "@/components";
import { ICategory, Product, ProductImage as ProductWithImage } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import { createUpdateProduct } from '../../../../../../actions/product/create-update-product';
import { useRouter } from "next/navigation";
import { deleteProductImages } from "@/actions";

interface Props {
    product: Partial<Product> & { productImages?: ProductWithImage[] },
    categories: ICategory[]
}

interface FormInputs {
    title: string,
    slug: string,
    description: string,
    price: number,
    inStock: number,
    sizes: string[]
    tags: string,
    gender: 'men' | 'women' | 'kid' | 'unisex'
    categoryId: string,
    images?: FileList
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
    const router = useRouter();

    const { handleSubmit, register, setValue, getValues, watch, formState: { isValid, errors }, } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            sizes: product.sizes ?? [],
            images: undefined
        }

    });
    watch('sizes')
    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();

        const { images, ...productToSave } = data;
        if (product.id) {
            formData.append('id', product.id ?? '');
        }
        formData.append('title', productToSave.title ?? '');
        formData.append('slug', productToSave.slug ?? '');
        formData.append('description', productToSave.description ?? '');
        formData.append('price', productToSave.price.toString() ?? '');
        formData.append('inStock', productToSave.inStock.toString() ?? '');
        formData.append('sizes', productToSave.sizes.toString() ?? '');
        formData.append('tags', productToSave.tags ?? '');
        formData.append('categoryId', productToSave.categoryId ?? '');
        formData.append('gender', productToSave.gender ?? '');

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
        }


        const { ok, product: updatedProduct } = await createUpdateProduct(formData);

        if (!ok) {
            alert('El producto no se puedo actualizar.')
            return;
        }

        router.replace(`/admin/product/${updatedProduct?.slug}`)
    }

    const onSizeChanged = (size: string) => {
        const sizes = getValues('sizes');
        if (getValues('sizes').includes(size)) {
            return setValue('sizes', [...sizes.filter(sz => sz !== size)])
        }

        sizes.push(size)
        setValue('sizes', sizes)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid  mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full ">
                <div className="flex flex-col mb-2">
                    <InputForm
                        register={register}
                        label={"Titulo"}
                        name={"title"}
                        type={"text"}
                        errors={errors}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <InputForm
                        register={register}
                        label={"Slug"}
                        name={"slug"}
                        type={"text"}
                        errors={errors}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        {...register('description')}

                        name="description"
                        rows={5}
                        className="form-input form-focus"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <InputForm
                        register={register}
                        label={"precio"}
                        name={"price"}
                        type={"number"}
                        errors={errors}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <InputForm
                        register={register}
                        label={"Tags"}
                        name={"tags"}
                        type={"text"}
                        errors={errors}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select {...register('gender')} className="form-input form-focus">
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select {...register('categoryId')} className="form-input form-focus">
                        <option value="">[Seleccione]</option>
                        {
                            categories.map(category => {
                                return <option value={category.id} key={category.id}>{category.name}</option>
                            })
                        }
                    </select>
                </div>

                <button type="submit" className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <InputForm
                        register={register}
                        label={"Inventario"}
                        name={"inStock"}
                        type={"number"}
                        errors={errors}
                    />
                </div>
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    onClick={() => onSizeChanged(size)}
                                    key={size} className={
                                        clsx(
                                            "flex cursor-pointer items-center justify-center w-10 h-10 mr-2 border rounded-md",
                                            {
                                                'bg-blue-500 text-white': getValues('sizes').includes(size)
                                            }
                                        )
                                    }>
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            {...register('images')}
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />

                    </div>

                    <div className="grid grid-col-1 sm:grid-cols-3 gap-3">

                        {
                            product.productImages?.map(img => (
                                <div key={img.id} className="relative">

                                    <ProductImage

                                        alt={product.title ?? ''}
                                        src={img.url}
                                        width={300}
                                        height={300}
                                        className=" rounded shadow-md"

                                    />
                                    <span onClick={() => deleteProductImages(img.id, img.url)} className='absolute hover:bg-red-500 hover:shadow-md hover:shadow-red-300 transition-all flex h-8 w-8 justify-center items-center cursor-pointer right-1  top-1 text-xs rounded-full px-1  text-white bg-red-400 '>
                                        <IoCloseOutline size={25} />
                                    </span>
                                </div>

                            ))


                        }

                    </div>

                </div>
            </div>
        </form>
    );
};