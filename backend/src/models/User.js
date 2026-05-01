const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['shop', 'supplier'],
    default: 'shop'
  },
  name: {
    type: String,
    trim: true
  },
  onboardingComplete: {
    type: Boolean,
    default: false
  },

  // ─── Shop Owner fields ──────────────────────────────────────
  shopName: { type: String, trim: true },
  shopType: { type: String, trim: true },
  location: { type: String, trim: true },

  // ─── Supplier fields ────────────────────────────────────────
  companyName: { type: String, trim: true },
  categoriesSupplied: [{ type: String }],

}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
