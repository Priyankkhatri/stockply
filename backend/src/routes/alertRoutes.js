const express = require('express');
const alertController = require('../controllers/alertController');

const router = express.Router();

router.get('/low-stock', alertController.getLowStockAlerts);
router.get('/summary', alertController.getInventorySummary);

module.exports = router;
