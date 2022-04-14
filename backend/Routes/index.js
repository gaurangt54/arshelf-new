const express = require('express');
const router = express.Router();
const multer = require('multer');

const m = multer({dest: 'uploads/'});

/* Initialze all Controller Functions */
const userController = require('../Controllers/user')
const categoryController = require('../Controllers/category')
const productController = require('../Controllers/product')
const orderController = require('../Controllers/order')
const approvalController = require('../Controllers/approval')
const paymentController = require('../Controllers/payment')
const storageController = require('../Controllers/storage')

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
router.post('/addReview/', productController.addReview);
router.post('/getRecommendedProducts/', productController.getRecommendedProducts);
router.post('/getR/', productController.getR);

/* Users APIs */
router.post('/createOrder', orderController.createOrder);
router.post('/getOrders', orderController.getOrders);
router.put('/updateOrder', orderController.updateOrder);

/* Payment APIs */
router.get('/getRazorpayKey', paymentController.getRazorpayKey);
router.post('/makePayment', paymentController.makePayment);

/* Approval APIs */
router.post('/addCustomizationRequest', approvalController.addCustomizationRequest);
router.post('/getCustomizationRequests', approvalController.getCustomizationRequests);
router.post('/getCustomizationRequest', approvalController.getCustomizationRequest);
router.put('/updateCustomizationRequest', approvalController.updateCustomizationRequest);

// Storage APIs
router.post('/uploadProduct', m.single("file"), storageController.uploadProduct);
router.post('/uploadApproval', m.single("file"), storageController.uploadApproval);
router.post('/uploadDimensions', m.single("file"), storageController.uploadDimensions);
router.post('/uploadTextures', m.single("file"), storageController.uploadTextures);
router.get('/download/:key',  storageController.download);

module.exports = router;