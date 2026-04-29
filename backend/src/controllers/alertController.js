const Product = require('../models/Product');

// Get all low stock alerts
exports.getLowStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({
      $or: [{ status: 'Low Stock' }, { status: 'Out of Stock' }]
    }).sort({ stock: 1 });

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

// Get inventory summary (KPIs)
exports.getInventorySummary = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          lowStockCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Low Stock'] }, 1, 0] }
          },
          outOfStockCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Out of Stock'] }, 1, 0] }
          }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: { 
        summary: stats.length > 0 ? stats[0] : {
          totalProducts: 0,
          totalStock: 0,
          lowStockCount: 0,
          outOfStockCount: 0
        }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
