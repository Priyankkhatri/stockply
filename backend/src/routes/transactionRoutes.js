const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/', transactionController.getAllTransactions);
router.get('/product/:productId', transactionController.getProductTransactions);

module.exports = router;
