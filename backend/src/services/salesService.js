const { salesModel } = require('../models');

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

module.exports = {
  getAllSales,
  getSaleByID,
  createSale,
  deleteSale,
};