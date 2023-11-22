const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSalesFields = require('../middlewares/validateSalesFields');
const validateQuantity = require('../middlewares/validateQuantity');

route.get('/', salesController.getAllSales);
route.get('/:saleID', salesController.getSaleByID);
route.post('/', validateSalesFields, salesController.createSale);
route.delete('/:saleID', salesController.deleteSale);
route.put(
  '/:saleID/products/:productID/quantity',
  validateQuantity,
  salesController.updateQuantity,
);

module.exports = route;
