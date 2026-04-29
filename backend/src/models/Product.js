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
    unique: true,
    uppercase: true,
    trim: true
  },
  barcode: {
    type: String,
    unique: true,
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
