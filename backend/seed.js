const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

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
      { name: 'iPhone 15 Pro', sku: 'APPL-IP15P', category: 'Electronics', price: 129990, stock: 100, owner: supplier1._id },
      { name: 'AirPods Pro Gen 2', sku: 'APPL-AIRP-G2', category: 'Electronics', price: 24900, stock: 250, owner: supplier1._id },
      { name: 'iPad Air 5th Gen', sku: 'APPL-IPAD-AIR', category: 'Electronics', price: 59900, stock: 45, owner: supplier1._id },
      { name: 'Samsung S24 Ultra', sku: 'SAM-S24U', category: 'Electronics', price: 129999, stock: 30, owner: supplier1._id },
      { name: 'Sony WH-1000XM5', sku: 'SONY-WH5', category: 'Electronics', price: 29990, stock: 80, owner: supplier1._id },
      { name: 'Logitech MX Master 3S', sku: 'LOGI-MX3S', category: 'Electronics', price: 9999, stock: 150, owner: supplier1._id },
      { name: 'Dell XPS 15', sku: 'DELL-XPS15', category: 'Electronics', price: 185000, stock: 15, owner: supplier1._id },
      { name: 'Apple Watch Series 9', sku: 'APPL-AW9', category: 'Electronics', price: 41900, stock: 120, owner: supplier1._id },
      { name: 'LG 27" 4K Monitor', sku: 'LG-274K', category: 'Electronics', price: 35000, stock: 60, owner: supplier1._id }
    ]);
    const sup2Products = await Product.create([
      { name: 'Paracetamol 500mg', sku: 'MED-PARA-500', category: 'Pharmacy', price: 50, stock: 5000, owner: supplier2._id },
      { name: 'First Aid Kit Pro', sku: 'MED-FAK-PRO', category: 'Pharmacy', price: 850, stock: 200, owner: supplier2._id },
      { name: 'Vitamin C 1000mg', sku: 'MED-VITC-1K', category: 'Pharmacy', price: 350, stock: 1500, owner: supplier2._id },
      { name: 'Digital Thermometer', sku: 'MED-THERM-D', category: 'Pharmacy', price: 299, stock: 400, owner: supplier2._id },
      { name: 'N95 Face Masks (Box of 50)', sku: 'MED-N95-50', category: 'Pharmacy', price: 999, stock: 800, owner: supplier2._id },
      { name: 'Antibacterial Wipes', sku: 'MED-WIPES', category: 'Pharmacy', price: 150, stock: 2000, owner: supplier2._id },
      { name: 'Ibuprofen 400mg', sku: 'MED-IBU-400', category: 'Pharmacy', price: 80, stock: 4500, owner: supplier2._id },
      { name: 'Hand Sanitizer 500ml', sku: 'MED-SANI-500', category: 'Pharmacy', price: 250, stock: 1200, owner: supplier2._id },
      { name: 'BP Monitor Machine', sku: 'MED-BPMON', category: 'Pharmacy', price: 2499, stock: 150, owner: supplier2._id },
      { name: 'Omega 3 Fish Oil', sku: 'MED-OMG3', category: 'Pharmacy', price: 899, stock: 600, owner: supplier2._id }
    ]);
    
    await Product.create([
      { name: 'MacBook Pro M3', sku: 'APPL-MBP-M3', category: 'Electronics', price: 210000, stock: 5, supplier: 'TechNova Solutions', owner: shop1._id },
      { name: 'iPhone 15 Pro', sku: 'APPL-IP15P', category: 'Electronics', price: 135000, stock: 12, supplier: 'TechNova Solutions', owner: shop1._id },
      { name: 'AirPods Pro Gen 2', sku: 'APPL-AIRP-G2', category: 'Electronics', price: 26000, stock: 25, supplier: 'TechNova Solutions', owner: shop1._id },
      { name: 'Samsung S24 Ultra', sku: 'SAM-S24U', category: 'Electronics', price: 135000, stock: 8, supplier: 'TechNova Solutions', owner: shop1._id },
      { name: 'Sony WH-1000XM5', sku: 'SONY-WH5', category: 'Electronics', price: 32000, stock: 15, supplier: 'TechNova Solutions', owner: shop1._id },
      
      { name: 'Paracetamol 500mg', sku: 'MED-PARA-500', category: 'Pharmacy', price: 65, stock: 200, supplier: 'MediCare Supply Co', owner: shop2._id },
      { name: 'Vitamin C 1000mg', sku: 'MED-VITC-1K', category: 'Pharmacy', price: 450, stock: 120, supplier: 'MediCare Supply Co', owner: shop2._id },
      { name: 'Digital Thermometer', sku: 'MED-THERM-D', category: 'Pharmacy', price: 350, stock: 45, supplier: 'MediCare Supply Co', owner: shop2._id },
      { name: 'Hand Sanitizer 500ml', sku: 'MED-SANI-500', category: 'Pharmacy', price: 300, stock: 80, supplier: 'MediCare Supply Co', owner: shop2._id },
      { name: 'Ibuprofen 400mg', sku: 'MED-IBU-400', category: 'Pharmacy', price: 100, stock: 350, supplier: 'MediCare Supply Co', owner: shop2._id }
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
    const orders = [];
    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const priorities = ['High', 'Medium', 'Low'];
    const paymentStatuses = ['Pending', 'Paid', 'Failed'];

    // Create 10 orders for shop1 with supplier1
    for (let i = 0; i < 10; i++) {
      const product = sup1Products[Math.floor(Math.random() * sup1Products.length)];
      const qty = Math.floor(Math.random() * 5) + 1;
      orders.push({
        orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        shopId: shop1._id,
        supplierId: supplier1._id,
        shopName: shop1.shopName,
        supplierName: supplier1.companyName,
        items: [{ productId: product._id, name: product.name, quantity: qty, price: product.price }],
        totalAmount: product.price * qty,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
        deliveryDate: new Date(Date.now() + Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000))
      });
    }

    // Create 10 orders for shop2 with supplier2
    for (let i = 0; i < 10; i++) {
      const product = sup2Products[Math.floor(Math.random() * sup2Products.length)];
      const qty = Math.floor(Math.random() * 20) + 5;
      orders.push({
        orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        shopId: shop2._id,
        supplierId: supplier2._id,
        shopName: shop2.shopName,
        supplierName: supplier2.companyName,
        items: [{ productId: product._id, name: product.name, quantity: qty, price: product.price }],
        totalAmount: product.price * qty,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
        deliveryDate: new Date(Date.now() + Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000))
      });
    }

    // Create 5 cross orders (shop1 with supplier2)
    for (let i = 0; i < 5; i++) {
      const product = sup2Products[Math.floor(Math.random() * sup2Products.length)];
      const qty = Math.floor(Math.random() * 10) + 2;
      orders.push({
        orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        shopId: shop1._id,
        supplierId: supplier2._id,
        shopName: shop1.shopName,
        supplierName: supplier2.companyName,
        items: [{ productId: product._id, name: product.name, quantity: qty, price: product.price }],
        totalAmount: product.price * qty,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
        deliveryDate: new Date(Date.now() + Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000))
      });
    }

    await Order.create(orders);

    console.log('Demo Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedDatabase();
