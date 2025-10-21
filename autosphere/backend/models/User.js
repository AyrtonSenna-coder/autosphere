const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['customer', 'dealer', 'admin'],
    default: 'customer'
  },
  profile: {
    phone: String,
    avatar: String,
    location: {
      city: String,
      state: String
    },
    bio: String
  },
  preferences: {
    savedSearches: [{
      name: String,
      filters: Object,
      createdAt: Date
    }],
    favoriteCars: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car'
    }],
    notificationSettings: {
      email: { type: Boolean, default: true },
      priceDrop: { type: Boolean, default: true },
      newCars: { type: Boolean, default: false }
    }
  },
  dealerInfo: {
    companyName: String,
    license: String,
    description: String,
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  },
  isVerified: { type: Boolean, default: false },
  lastLogin: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);