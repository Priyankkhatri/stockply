const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

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
