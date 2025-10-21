const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  fuelType: { 
    type: String, 
    enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid'],
    required: true 
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic', 'Semi-Automatic'],
    required: true
  },
  bodyType: {
    type: String,
    enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'MPV'],
    required: true
  },
  color: { type: String, required: true },
  doors: { type: Number, required: true },
  seats: { type: Number, required: true },
  engineSize: { type: String, required: true },
  power: { type: String, required: true }, // HP
  features: [{
    category: String,
    items: [String]
  }],
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  virtualTour: {
    enabled: Boolean,
    url: String,
    thumbnail: String
  },
  inspectionReport: {
    overallScore: Number,
    sections: [{
      name: String,
      score: Number,
      issues: [String],
      images: [String]
    }]
  },
  location: {
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'sold', 'pending'],
    default: 'available'
  },
  views: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
  certification: {
    isCertified: Boolean,
    type: String,
    expiryDate: Date
  }
}, {
  timestamps: true
});

// Index for search functionality
carSchema.index({
  make: 'text',
  model: 'text',
  'features.items': 'text'
});

carSchema.index({ price: 1, year: -1, mileage: 1 });

module.exports = mongoose.model('Car', carSchema);