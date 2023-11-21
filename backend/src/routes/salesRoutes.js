const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getAllSales);
route.get('/:saleID', salesController.getSaleByID);

module.exports = route;
