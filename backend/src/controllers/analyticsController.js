const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.getSupplierAnalytics = async (req, res) => {
  try {
    // 1. Basic Stats
    const totalOrders = await Order.countDocuments();
    const activeOrders = await Order.countDocuments({ status: { $in: ['Pending', 'Processing'] } });
    const totalProducts = await Product.countDocuments();
    
    // 2. Revenue Calculation
    const revenueData = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // 3. Weekly Demand Trends (Last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyTrends = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          status: { $ne: 'Cancelled' }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          count: { $sum: 1 },
          amount: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Map to day names for the frontend
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const trendData = days.map((day, index) => {
      const match = weeklyTrends.find(t => t._id === index + 1);
      return {
        day,
        count: match ? match.count : 0,
        amount: match ? match.amount : 0
      };
    });

    // 4. Real Growth Calculations (Comparing last 30 days vs previous 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const getStatsForPeriod = async (startDate, endDate) => {
      const revenue = await Order.aggregate([
        { $match: { createdAt: { $gte: startDate, $lt: endDate }, status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]);
      const ordersCount = await Order.countDocuments({ createdAt: { $gte: startDate, $lt: endDate } });
      return {
        revenue: revenue.length > 0 ? revenue[0].total : 0,
        orders: ordersCount
      };
    };

    const currentPeriod = await getStatsForPeriod(thirtyDaysAgo, new Date());
    const previousPeriod = await getStatsForPeriod(sixtyDaysAgo, thirtyDaysAgo);

    const calculateGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? '+100%' : '0%';
      const pct = ((current - previous) / previous) * 100;
      return `${pct > 0 ? '+' : ''}${pct.toFixed(1)}%`;
    };

    const growth = {
      revenue: calculateGrowth(currentPeriod.revenue, previousPeriod.revenue),
      orders: calculateGrowth(currentPeriod.orders, previousPeriod.orders),
      stock: '0%', // Stock growth is usually handled differently
      partners: '0%' // Partner growth usually tracked by creation date
    };

    res.status(200).json({
      status: 'success',
      data: {
        summary: {
          totalRevenue,
          activeOrders,
          totalProducts,
          totalOrders
        },
        trends: trendData,
        growth
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
