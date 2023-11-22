const { salesModel, productsModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { status: 200, data: sales };
};

const getSaleByID = async (saleID) => {
  const sale = await salesModel.getSaleByID(saleID);
  if (sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }
  return { status: 200, data: sale };
};

const createSale = async (saleData) => {
  const saleID = await salesModel.createSale(saleData);
  if (saleID === undefined) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  return { status: 201, data: { id: saleID, itemsSold: saleData } };
};

const deleteSale = async (saleID) => {
  const sale = await salesModel.deleteSale(saleID);
  if (!sale) {
    return { status: 404, data: { message: 'Sale not found' } };
  }
  return { status: 204 };
};

const updateQuantity = async (saleID, productID, quantity) => {
  const product = await productsModel.getProductByID(productID);
  if (!product) {
    return { status: 404, data: { message: 'Product not found in sale' } };
  }

  const sale = await salesModel.getSaleByID(saleID);
  if (sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }
  
  await salesModel.updateQuantity(saleID, productID, quantity);

  const updatedSale = await salesModel.getSaleByID(saleID);
  const [updatedSaleWithRightProduct] = updatedSale.filter((item) => item
    .productId === Number(productID));
  const saleWithID = {
    ...updatedSaleWithRightProduct,
    saleId: Number(saleID),
  };
  return { status: 200, data: saleWithID };
};

module.exports = {
  getAllSales,
  getSaleByID,
  createSale,
  deleteSale,
  updateQuantity,
};