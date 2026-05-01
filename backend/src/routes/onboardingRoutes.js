const express = require('express');
const authController = require('../controllers/authController');
const onboardingController = require('../controllers/onboardingController');

const router = express.Router();

// All onboarding routes require authentication
router.use(authController.protect);

router.post('/shop', onboardingController.completeShopOnboarding);
router.post('/supplier', onboardingController.completeSupplierOnboarding);
router.post('/skip', onboardingController.skipOnboarding);

module.exports = router;
