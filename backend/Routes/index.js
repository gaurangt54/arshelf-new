const express = require('express');
const router = express.Router();

/* Initialze all Controller Functions */
const userController = require('../Controllers/user')
const categoryController = require('../Controllers/category')
const productController = require('../Controllers/product')
const orderController = require('../Controllers/order')

/* Users APIs */
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.put('/updateUser', userController.updateUser);
router.post('/getUsers', userController.getUsers);
router.post('/changePassword', userController.changePassword);

/* Categories APIs */
router.post('/addCategory', categoryController.addCategory);
router.get('/getCategories', categoryController.getCategories);
router.get('/getCategoryById/:id', categoryController.getCategoryById);
router.get('/getCategoryByName/:name', categoryController.getCategoryByName);
router.put('/updateCategory', categoryController.updateCategory);
router.delete('/deleteCategory', categoryController.deleteCategory);

/* Products APIs */
router.post('/addProduct', productController.addProduct);
router.put('/updateProduct', productController.updateProduct);
router.delete('/deleteProduct', productController.deleteProduct);
router.get('/getProductById/:id', productController.getProductById);
router.post('/getProducts/', productController.getProducts);

/* Users APIs */
router.post('/createOrder', orderController.createOrder);
router.post('/getOrders', orderController.getOrders);
router.put('/updateOrder', orderController.updateOrder);

module.exports = router;