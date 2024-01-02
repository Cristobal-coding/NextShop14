export interface Product {
    id: string,
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    // type: Type;
    gender: Category;
}

export interface CartProduct {
    id: string,
    slug: string,
    title: string,
    price: number,
    quantity: number,
    size: Size,
    image: string,
}

export interface ProductImage {
    id: number;
    url: string;
}

type Category = 'men' | 'women' | 'kid' | 'unisex';
type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';