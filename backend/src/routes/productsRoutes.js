const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');

route.get('/', productsController.getAllProducts);
route.get('/:productID', productsController.getProductByID);
route.post('/', validateProductName, productsController.createProduct);
route.put('/:productID', validateProductName, productsController.updateProduct);
route.delete('/:productID', productsController.deleteProduct);

module.exports = route;
