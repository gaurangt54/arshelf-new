const express = require('express');
const router = express.Router();

/* Initialze all Controller Functions */
const userController = require('../Controllers/user')
const categoryController = require('../Controllers/category')
const productController = require('../Controllers/product')

/* Users APIs */
router.post('/login', userController.login);
router.post('/signup', userController.signup);

/* Categories APIs */
router.post('/addCategory', categoryController.addCategory);
router.get('/getCategories', categoryController.getCategories);
router.get('/getCategoryById/:id', categoryController.getCategoryById);
router.get('/getCategoryByName/:name', categoryController.getCategoryByName);
router.put('/updateCategory', categoryController.updateCategory);
router.delete('/deleteCategory', categoryController.deleteCategory);

/* Products APIs */

router.post('/addProduct', productController.addProduct);
router.get('/getProductById/:id', productController.getProductById);
router.get('/getProducts/', productController.getProducts);

module.exports = router;