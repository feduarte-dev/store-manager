const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id;');
  return products;
};

const getProductByID = async (productID) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [productID],
  );
  return product;
};

const createProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?);',
    [name],
  );
  return insertId;
};

const updateProduct = async ({ name }, productID) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;`,
    [name, productID],
  );
  return affectedRows;
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
};