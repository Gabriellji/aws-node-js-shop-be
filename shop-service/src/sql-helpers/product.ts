import { FILL_DATA } from "../utils/migrations";

export async function getAllProducts(client) {
  return await client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stocks s ON p.id = s.product_id
    `);
}

export async function getOneProduct(client, id: string) {
  return await client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stocks s ON p.id = s.product_id 
                WHERE p.id='${id}'
            `);
}

export async function createProduct(client, productDTO) {
  const { title, description, image, price } = productDTO;

  try {
    await client.query("BEGIN");

    await client.query(`
                INSERT INTO
                products (title, description, image, price)
                VALUES ('${title}', '${description}', '${image}', '${price}')
            `);

    const product = await client.query(
      `SELECT * FROM products WHERE title = '${title}'`
    );

    await client.query(`
                INSERT INTO 
                stocks (product_id, count)
                VALUES ('${product.rows[0].id}', 1)
            `);

    const fullProduct = await client.query(`
                SELECT p.id, title, description, price, image, count 
                FROM products p 
                JOIN stocks s ON p.id = s.product_id 
                WHERE p.id='${product.rows[0].id}'
            `);

    await client.query("COMMIT");

    return fullProduct.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }
}

export async function seedProducts(client) {
  return await client.query(FILL_DATA);
}
