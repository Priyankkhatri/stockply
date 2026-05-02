const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Partner = require('./src/models/Partner');
const Order = require('./src/models/Order');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI.replace('localhost', '127.0.0.1'));
    console.log('DB Connection Successful for Seeding');
    const demoEmails = [
      'supplier1@stockply.demo',
      'supplier2@stockply.demo',
      'shop1@stockply.demo',
      'shop2@stockply.demo'
    ];

    console.log('Clearing old demo data...');
    const oldUsers = await User.find({ email: { $in: demoEmails } });
    const oldUserIds = oldUsers.map(u => u._id);

    await User.deleteMany({ email: { $in: demoEmails } });
    await Product.deleteMany({ owner: { $in: oldUserIds } });
    await Partner.deleteMany({ owner: { $in: oldUserIds } });
    await Order.deleteMany({ $or: [{ shopId: { $in: oldUserIds } }, { supplierId: { $in: oldUserIds } }] });

    console.log('Inserting Demo Users...');
    const users = await User.create([
      {
        email: 'supplier1@stockply.demo',
        password: 'password123',
        role: 'supplier',
        name: 'TechNova Solutions',
        companyName: 'TechNova Solutions',
        categoriesSupplied: ['Electronics', 'Gadgets'],
        onboardingComplete: true
      },
      {
        email: 'supplier2@stockply.demo',
        password: 'password123',
        role: 'supplier',
        name: 'MediCare Supply Co',
        companyName: 'MediCare Supply Co',
        categoriesSupplied: ['Pharmacy', 'Medical Supplies'],
        onboardingComplete: true
      },
      {
        email: 'shop1@stockply.demo',
        password: 'password123',
        role: 'shop',
        name: 'Nexus Electronics',
        shopName: 'Nexus Electronics',
        shopType: 'Electronics',
        location: 'Mumbai, IND',
        onboardingComplete: true
      },
      {
        email: 'shop2@stockply.demo',
        password: 'password123',
        role: 'shop',
        name: 'City Health Pharmacy',
        shopName: 'City Health Pharmacy',
        shopType: 'Pharmacy',
        location: 'Delhi, IND',
        onboardingComplete: true
      }
    ]);

    const supplier1 = users.find(u => u.email === 'supplier1@stockply.demo');
    const supplier2 = users.find(u => u.email === 'supplier2@stockply.demo');
    const shop1 = users.find(u => u.email === 'shop1@stockply.demo');
    const shop2 = users.find(u => u.email === 'shop2@stockply.demo');

    console.log('Inserting Demo Products...');
    const sup1Products = await Product.create([
      { name: 'MacBook Pro M3', sku: 'APPL-MBP-M3', category: 'Electronics', price: 199990, stock: 50, owner: supplier1._id },
      { name: 'iPhone 15 Pro', sku: 'APPL-IP15P', category: 'Electronics', price: 129990, stock: 100, owner: supplier1._id }
    ]);
    const sup2Products = await Product.create([
      { name: 'Paracetamol 500mg', sku: 'MED-PARA-500', category: 'Pharmacy', price: 50, stock: 5000, owner: supplier2._id },
      { name: 'First Aid Kit Pro', sku: 'MED-FAK-PRO', category: 'Pharmacy', price: 850, stock: 200, owner: supplier2._id }
    ]);
    
    await Product.create([
      { name: 'MacBook Pro M3', sku: 'APPL-MBP-M3', category: 'Electronics', price: 210000, stock: 5, supplier: 'TechNova Solutions', owner: shop1._id },
      { name: 'Paracetamol 500mg', sku: 'MED-PARA-500', category: 'Pharmacy', price: 65, stock: 200, supplier: 'MediCare Supply Co', owner: shop2._id }
    ]);

    console.log('Inserting Demo Partners...');
    await Partner.create([
      {
        name: shop1.shopName,
        category: shop1.shopType,
        status: 'Active',
        behavior: 'On-time',
        revenue: 'Rs. 4,50,000',
        location: shop1.location,
        email: shop1.email,
        owner: supplier1._id
      },
      {
        name: shop2.shopName,
        category: shop2.shopType,
        status: 'Active',
        behavior: 'On-time',
        revenue: 'Rs. 85,000',
        location: shop2.location,
        email: shop2.email,
        owner: supplier2._id
      }
    ]);

    console.log('Inserting Demo Orders...');
    await Order.create([
      {
        orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        shopId: shop1._id,
        supplierId: supplier1._id,
        shopName: shop1.shopName,
        items: [
          { productId: sup1Products[0]._id, name: sup1Products[0].name, quantity: 2, price: sup1Products[0].price }
        ],
        totalAmount: sup1Products[0].price * 2,
        status: 'Processing',
        paymentStatus: 'Paid',
        priority: 'High'
      },
      {
        orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        shopId: shop2._id,
        supplierId: supplier2._id,
        shopName: shop2.shopName,
        items: [
          { productId: sup2Products[1]._id, name: sup2Products[1].name, quantity: 10, price: sup2Products[1].price }
        ],
        totalAmount: sup2Products[1].price * 10,
        status: 'Delivered',
        paymentStatus: 'Paid',
        priority: 'Medium'
      }
    ]);

    console.log('Demo Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedDatabase();
