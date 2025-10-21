const express = require('express');
const Car = require('../models/car');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all cars with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      make,
      model,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      fuelType,
      transmission,
      bodyType,
      search
    } = req.query;

    const filter = {};
    
    if (make) filter.make = new RegExp(make, 'i');
    if (model) filter.model = new RegExp(model, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    if (minYear || maxYear) {
      filter.year = {};
      if (minYear) filter.year.$gte = parseInt(minYear);
      if (maxYear) filter.year.$lte = parseInt(maxYear);
    }
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (bodyType) filter.bodyType = bodyType;
    if (search) {
      filter.$text = { $search: search };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const cars = await Car.find(filter)
      .populate('seller', 'name profile.avatar dealerInfo')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Car.countDocuments(filter);

    res.json({
      cars,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('seller', 'name profile.avatar dealerInfo rating reviewCount');
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Increment view count
    car.views += 1;
    await car.save();

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new car listing (protected)
router.post('/', auth, async (req, res) => {
  try {
    const carData = {
      ...req.body,
      seller: req.user.id
    };

    const car = new Car(carData);
    await car.save();
    
    await car.populate('seller', 'name profile.avatar dealerInfo');
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update car (protected - owner or admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is owner or admin
    if (car.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('seller', 'name profile.avatar dealerInfo');

    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// AI-powered car recommendation endpoint
router.get('/:id/recommendations', async (req, res) => {
  try {
    const currentCar = await Car.findById(req.params.id);
    
    if (!currentCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const recommendations = await Car.find({
      _id: { $ne: currentCar._id },
      $or: [
        { make: currentCar.make },
        { bodyType: currentCar.bodyType },
        { fuelType: currentCar.fuelType },
        { price: { $gte: currentCar.price * 0.7, $lte: currentCar.price * 1.3 } }
      ],
      status: 'available'
    })
    .limit(6)
    .populate('seller', 'name profile.avatar dealerInfo');

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;