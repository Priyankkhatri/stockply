const express = require('express');
const partnerController = require('../controllers/partnerController');

const router = express.Router();

router.route('/')
  .get(partnerController.getAllPartners)
  .post(partnerController.createPartner);

router.route('/:id')
  .patch(partnerController.updatePartner)
  .delete(partnerController.deletePartner);

module.exports = router;
