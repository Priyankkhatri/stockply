const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name'],
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'Product must have an SKU'],
    uppercase: true,
    trim: true
  },
  barcode: {
    type: String,
    sparse: true
  },
  category: {
    type: String,
    required: [true, 'Product must have a category']
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price'],
    min: [0, 'Price cannot be negative']
  },
  unit: {
    type: String,
    default: 'unit'
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  supplier: {
    type: String,
    trim: true,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Product must belong to a user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index: SKU is unique per owner (not globally)
productSchema.index({ sku: 1, owner: 1 }, { unique: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
