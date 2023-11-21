const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getAllProducts);
route.get('/:productID', productsController.getProductByID);

module.exports = route;
