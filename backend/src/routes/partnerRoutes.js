const express = require('express');
const partnerController = require('../controllers/partnerController');
const authController = require('../controllers/authController');

const router = express.Router();

// All partner routes require authentication
router.use(authController.protect);

router.route('/')
  .get(partnerController.getAllPartners)
  .post(partnerController.createPartner);

router.route('/:id')
  .patch(partnerController.updatePartner)
  .delete(partnerController.deletePartner);

module.exports = router;
