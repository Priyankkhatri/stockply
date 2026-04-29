const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Transaction must belong to a product']
  },
  type: {
    type: String,
    enum: ['IN', 'OUT'],
    required: [true, 'Transaction must have a type (IN/OUT)']
  },
  quantity: {
    type: Number,
    required: [true, 'Transaction must have a quantity']
  },
  method: {
    type: String,
    enum: ['Manual', 'Scan'],
    default: 'Manual'
  },
  previousStock: Number,
  newStock: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
