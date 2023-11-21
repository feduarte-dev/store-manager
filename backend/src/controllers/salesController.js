const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const { status, data } = await salesService.getAllSales();
  return res.status(status).json(data);
};

const getSaleByID = async (req, res) => {
  const { saleID } = req.params;
  const { status, data } = await salesService.getSaleByID(saleID);
  return res.status(status).json(data);
};

const createSale = async (req, res) => {
  const saleData = req.body;
  const { status, data } = await salesService.createSale(saleData);
  return res.status(status).json(data);
};

module.exports = {
  getAllSales,
  getSaleByID,
  createSale,
};