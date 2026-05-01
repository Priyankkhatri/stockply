const Partner = require('../models/Partner');

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      results: partners.length,
      data: { partners }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    req.body.owner = req.user._id;
    const newPartner = await Partner.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { partner: newPartner }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!partner) return res.status(404).json({ status: 'fail', message: 'Partner not found' });
    res.status(200).json({
      status: 'success',
      data: { partner }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!partner) return res.status(404).json({ status: 'fail', message: 'Partner not found' });
    res.status(200).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
