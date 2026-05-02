const mongoose = require('mongoose');
const User = require('./src/models/User');

const checkDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/stockply');
    console.log('Connected to Local DB (localhost)');

    const user = await User.findOne({ email: 'shop1@stockply.demo' });
    if (!user) {
      console.log('User not found in local DB!');
    } else {
      console.log('User found in local DB:', user.email);
    }
    process.exit(0);
  } catch (err) {
    console.error('Local DB connection failed:', err.message);
    process.exit(1);
  }
}

checkDB();
