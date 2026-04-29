const Transaction = require('../models/Transaction');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('product', 'name sku')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: { transactions }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get transactions for a specific product
exports.getProductTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ product: req.params.productId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: { transactions }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
