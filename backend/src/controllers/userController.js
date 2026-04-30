const User = require('../models/User');

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await User.find({ role: 'supplier' }).select('name email businessName _id');
    res.status(200).json({
      status: 'success',
      results: suppliers.length,
      data: { suppliers }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
