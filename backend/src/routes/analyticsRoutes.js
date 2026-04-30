const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const authController = require('../controllers/authController');

const router = express.Router();

// All analytics routes are protected
router.use(authController.protect);

router.get('/supplier-overview', analyticsController.getSupplierAnalytics);

module.exports = router;
