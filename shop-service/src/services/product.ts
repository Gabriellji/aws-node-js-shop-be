import { getAllProducts, getOneProduct, createProduct, seedProducts } from '../sql-helpers/product';

export const getAll = async (client) => {
    const products = await getAllProducts(client);
    return products.rows;
};

export const getSingle = async (client, id: string) => {
    const product = await getOneProduct(client, id);
    return product.rows;
};

export const add = async (client, productDTO) => {
    return await createProduct(client, productDTO);
}

export const seedData = async (client) => {
    return await seedProducts(client);
};