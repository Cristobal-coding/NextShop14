import { initialData } from "./seed"
import prisma from '../lib/prisma'
async function main() {

    const { categories, products, users, countrys } = initialData;

    await Promise.all([

        await prisma.orderAddress.deleteMany(),
        await prisma.orderItems.deleteMany(),
        await prisma.order.deleteMany(),


        await prisma.userAddress.deleteMany(),
        await prisma.user.deleteMany(),
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.category.deleteMany(),
        await prisma.country.deleteMany(),
    ])
    const categoriesData = categories.map(c => ({
        name: c,
    }));

    await prisma.user.createMany({
        data: users,
    })

    await prisma.category.createMany({
        data: categoriesData,
    })
    await prisma.country.createMany({
        data: countrys,
    })

    const categoriesDb = await prisma.category.findMany();
    const categoriesMap = categoriesDb.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    products.forEach(async (p) => {

        const { type, images, ...rest } = p;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            },
        });

        const imagesData = images.map(img => ({
            url: img,
            productId: dbProduct.id,
        }));

        await prisma.productImage.createMany({
            data: imagesData,
        })
    })

    console.log('Seed executed')
}


(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();

