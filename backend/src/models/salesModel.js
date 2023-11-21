const camelize = require('camelize');

const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity
  FROM StoreManager.sales_products
  INNER JOIN StoreManager.products ON products.id = sales_products.product_id
  INNER JOIN StoreManager.sales ON sales.id = sales_products.sale_id
  ORDER BY sale_id, product_id;`,
  );
  return camelize(sales);
};

const getSaleByID = async (saleID) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity
  FROM StoreManager.sales_products
  INNER JOIN StoreManager.products ON products.id = sales_products.product_id
  INNER JOIN StoreManager.sales ON sales.id = sales_products.sale_id
  WHERE sale_id = ?
  ORDER BY sale_id, product_id;`,
    [saleID],
  );
  return camelize(sale);
};

const insertDate = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW());',
  );
  return insertId;
};

const createSale = async (saleData) => {
  const saleId = await insertDate();
  const teste = saleData.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id,product_id,quantity) VALUES (?,?,?);',
      [saleId, productId, quantity],
    );
  });
  await Promise.all(teste);
  return saleId;
};

module.exports = {
  getAllSales,
  getSaleByID,
  createSale,
};
