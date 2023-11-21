const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');

route.get('/', productsController.getAllProducts);
route.get('/:productID', productsController.getProductByID);
route.post('/', validateProductName, productsController.createProduct);

module.exports = route;
