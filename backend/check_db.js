const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./src/models/User');

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI.replace('localhost', '127.0.0.1'));
    console.log('Connected to DB');

    const user = await User.findOne({ email: 'shop1@stockply.demo' }).select('+password');
    if (!user) {
      console.log('User not found!');
    } else {
      console.log('User found:', user.email);
      console.log('Password Hash:', user.password);
      const isMatch = await bcrypt.compare('password123', user.password);
      console.log('password123 match?', isMatch);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDB();
