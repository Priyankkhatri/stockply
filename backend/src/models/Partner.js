const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'General' },
  status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Active' },
  behavior: { type: String, default: 'On-time' },
  revenue: { type: String, default: 'Rs. 0' },
  lastOrder: { type: String, default: 'No orders yet' },
  address: { type: String },
  email: { type: String },
  phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Partner', partnerSchema);
