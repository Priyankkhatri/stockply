const Order = require('../models/Order');
const Notification = require('../models/Notification');

// Get all orders (filtered by role)
exports.getOrders = async (req, res) => {
  try {
    const filter = req.user.role === 'supplier' 
      ? { supplierId: req.user.id } 
      : { shopId: req.user.id };

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: { orders }
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

// Create an order
exports.createOrder = async (req, res) => {
  try {
    // Auto-generate order number if not provided
    if (!req.body.orderNumber) {
      const count = await Order.countDocuments();
      req.body.orderNumber = `ORD-${String(count + 1).padStart(4, '0')}`;
    }

    // Assign shopId from current user
    req.body.shopId = req.user.id;

    const order = await Order.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found' });

    // Create notification for the shop owner
    try {
      await Notification.create({
        userId: order.shopId,
        title: 'Order Status Update',
        message: `Your order ${order.orderNumber} is now ${status}.`,
        type: 'order_status',
        orderId: order._id
      });
    } catch (notificationErr) {
      console.error('Failed to create notification:', notificationErr);
    }

    res.status(200).json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found' });
    res.status(200).json({ status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};
