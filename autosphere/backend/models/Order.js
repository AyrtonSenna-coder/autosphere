const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'payment_received', 'delivered', 'cancelled'],
    default: 'pending'
  },
  payment: {
    method: String,
    transactionId: String,
    status: String,
    amount: Number,
    currency: { type: String, default: 'USD' }
  },
  delivery: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    scheduledDate: Date,
    status: {
      type: String,
      enum: ['scheduled', 'in_transit', 'delivered'],
      default: 'scheduled'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);