const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

// All product routes require authentication
router.use(authController.protect);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id/stock')
  .patch(productController.updateStock);

router
  .route('/scan/:barcode')
  .patch(productController.scanProduct);

module.exports = router;
