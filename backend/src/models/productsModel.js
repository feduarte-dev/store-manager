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

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
};