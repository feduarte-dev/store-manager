const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSalesFields = require('../middlewares/validateSalesFields');

route.get('/', salesController.getAllSales);
route.get('/:saleID', salesController.getSaleByID);
route.post('/', validateSalesFields, salesController.createSale);

module.exports = route;
