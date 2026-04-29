const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { product: newProduct }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
