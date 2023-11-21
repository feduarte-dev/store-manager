const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { status: 200, data: products };
};

const getProductByID = async (productID) => {
  const product = await productsModel.getProductByID(productID);
  if (!product) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  return { status: 200, data: product };
};

module.exports = {
  getAllProducts,
  getProductByID,
};