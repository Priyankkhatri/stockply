const Partner = require('../models/Partner');

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', data: partners });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    const newPartner = await Partner.create(req.body);
    res.status(201).json({ status: 'success', data: newPartner });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ status: 'success', data: partner });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
