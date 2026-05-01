const User = require('../models/User');
const Product = require('../models/Product');

// POST /onboarding/shop — Complete shop owner onboarding
exports.completeShopOnboarding = async (req, res) => {
  try {
    const { name, shopName, shopType, location, products } = req.body;

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || req.user.name,
        shopName,
        shopType,
        location,
        onboardingComplete: true
      },
      { new: true, runValidators: true }
    );

    // If initial products were provided, create them
    let createdProducts = [];
    if (products && Array.isArray(products) && products.length > 0) {
      const productDocs = products.map((p, i) => ({
        name: p.name,
        sku: p.sku || `SKU-${Date.now()}-${i}`,
        category: p.category || 'General',
        price: p.price || 0,
        stock: p.quantity || 0,
        barcode: p.barcode || undefined,
        status: (p.quantity || 0) === 0 ? 'Out of Stock' : (p.quantity || 0) <= 10 ? 'Low Stock' : 'In Stock',
        owner: req.user._id
      }));

      createdProducts = await Product.insertMany(productDocs);
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
        productsCreated: createdProducts.length
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// POST /onboarding/supplier — Complete supplier onboarding
exports.completeSupplierOnboarding = async (req, res) => {
  try {
    const { name, companyName, categoriesSupplied } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || req.user.name,
        companyName,
        categoriesSupplied: categoriesSupplied || [],
        onboardingComplete: true
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// POST /onboarding/skip — Mark onboarding as complete without filling profile
exports.skipOnboarding = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { onboardingComplete: true },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
