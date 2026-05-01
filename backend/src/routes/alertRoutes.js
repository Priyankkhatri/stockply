const express = require('express');
const alertController = require('../controllers/alertController');
const authController = require('../controllers/authController');

const router = express.Router();

// All alert routes require authentication
router.use(authController.protect);

router.get('/low-stock', alertController.getLowStockAlerts);
router.get('/summary', alertController.getInventorySummary);

module.exports = router;
