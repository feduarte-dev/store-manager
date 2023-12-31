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

const createProduct = async (productData) => {
  const productID = await productsModel.createProduct(productData);
  const newProduct = await productsModel.getProductByID(productID);
  return { status: 201, data: newProduct };
};

const updateProduct = async (productData, productID) => {
  const product = await productsModel.updateProduct(productData, productID);
  if (!product) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  const updatedProduct = await productsModel.getProductByID(productID);

  return { status: 200, data: updatedProduct };
};

const deleteProduct = async (productID) => {
  const product = await productsModel.deleteProduct(productID);
  if (!product) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  return { status: 204 };
};

const searchProducts = async (q) => {
  const products = await productsModel.searchProducts(q);
  return { status: 200, data: products };
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};