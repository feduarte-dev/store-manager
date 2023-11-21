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

module.exports = {
  getAllProducts,
  getProductByID,
};