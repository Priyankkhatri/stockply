const mongoose = require('mongoose');
const Order = require('./src/models/Order');
const Partner = require('./src/models/Partner');
require('dotenv').config();

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Order.deleteMany({});
    
    const partners = await Partner.find();
    if (partners.length === 0) {
      console.log('No partners found. Seed partners first.');
      process.exit(1);
    }

    const mockOrders = [
      {
        orderNumber: 'ORD-8829',
        shopName: partners[0].name,
        items: [
          { name: 'Sourdough Flour', quantity: 24, price: 1200 },
          { name: 'Organic Rye', quantity: 10, price: 850 }
        ],
        totalAmount: 37300,
        status: 'Pending',
        priority: 'High'
      },
      {
        orderNumber: 'ORD-8828',
        shopName: partners[1]?.name || 'The Green Shelf',
        items: [
          { name: 'Artisan Salt', quantity: 50, price: 150 }
        ],
        totalAmount: 7500,
        status: 'Processing',
        priority: 'Medium'
      },
      {
        orderNumber: 'ORD-8827',
        shopName: partners[2]?.name || 'Minimalist Living',
        items: [
          { name: 'Sourdough Flour', quantity: 100, price: 1100 }
        ],
        totalAmount: 110000,
        status: 'Shipped',
        priority: 'High'
      }
    ];

    await Order.insertMany(mockOrders);
    console.log('Orders seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding orders:', error);
    process.exit(1);
  }
};

seedOrders();
