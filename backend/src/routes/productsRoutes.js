const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getAllProducts);
route.get('/:productID', productsController.getProductByID);
route.post('/', productsController.createProduct);

module.exports = route;
