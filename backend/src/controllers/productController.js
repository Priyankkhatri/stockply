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

// Update product stock (manual adjustment)
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { adjustment } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    product.stock += adjustment;
    
    // Update status based on new stock level
    if (product.stock === 0) product.status = 'Out of Stock';
    else if (product.stock <= 10) product.status = 'Low Stock';
    else product.status = 'In Stock';

    await product.save();

    res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};


// Scan barcode to reduce stock by 1
exports.scanProduct = async (req, res) => {
  try {
    const { barcode } = req.params;

    const product = await Product.findOne({ barcode });
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with this barcode'
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product is out of stock'
      });
    }

    product.stock -= 1;

    // Update status
    if (product.stock === 0) product.status = 'Out of Stock';
    else if (product.stock <= 10) product.status = 'Low Stock';
    else product.status = 'In Stock';

    await product.save();

    res.status(200).json({
      status: 'success',
      message: 'Stock reduced successfully',
      data: { product }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
