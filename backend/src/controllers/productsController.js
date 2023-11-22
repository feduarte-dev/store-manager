const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();
  return res.status(status).json(data);
};

const getProductByID = async (req, res) => {
  const { productID } = req.params;
  const { status, data } = await productsService.getProductByID(productID);
  return res.status(status).json(data);
};

const createProduct = async (req, res) => {
  const productData = { ...req.body };
  const { status, data } = await productsService.createProduct(productData);
  return res.status(status).json(data);
};

const updateProduct = async (req, res) => {
  const { productID } = req.params;
  const productData = { ...req.body };
  const { status, data } = await productsService.updateProduct(productData, productID);
  return res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
  const { productID } = req.params;
  const { status, data } = await productsService.deleteProduct(productID);
  return res.status(status).json(data);
};

const searchProducts = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productsService.searchProducts(q);
  return res.status(status).json(data);
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};