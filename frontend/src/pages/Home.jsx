import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Car, Shield, Zap, Star } from 'lucide-react';
import AdvancedSearch from '../components/Search/AdvancedSearch';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for featured cars
    const mockCars = [
      {
        _id: '1',
        make: 'Audi',
        model: 'A4 Premium',
        year: 2021,
        price: 32450,
        mileage: 18500,
        fuelType: 'Hybrid',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'Audi A4'
          }
        ],
        location: { city: 'New York', state: 'NY' }
      },
      {
        _id: '2',
        make: 'BMW',
        model: '3 Series',
        year: 2022,
        price: 41200,
        mileage: 12300,
        fuelType: 'Petrol',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'BMW 3 Series'
          }
        ],
        location: { city: 'Los Angeles', state: 'CA' }
      }
    ];
    
    setFeaturedCars(mockCars);
    setLoading(false);
  }, []);

  const handleSearch = (searchData) => {
    console.log('Searching for:', searchData);
    // In a real app, this would call your API
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Find Your Perfect Car
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Discover thousands of certified pre-owned vehicles with our advanced search and virtual inspection features.
          </motion.p>
          
          <AdvancedSearch onSearch={handleSearch} isLoading={loading} />
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-gray-600 text-lg">
              Hand-picked selection of quality cars
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={car.images[0]?.url}
                    alt={car.images[0]?.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Certified
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {car.make} {car.model}
                  </h3>
                  <div className="flex justify-between text-gray-600 text-sm mb-3">
                    <span>{car.year}</span>
                    <span>{car.mileage.toLocaleString()} mi</span>
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      ${car.price.toLocaleString()}
                    </span>
                    <Link
                      to={`/cars/${car._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AutoSphere?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12" />,
                title: "360° Inspection",
                description: "Comprehensive digital inspection reports with high-resolution images"
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: "AI Car Match",
                description: "Intelligent algorithm recommends perfect vehicles for your needs"
              },
              {
                icon: <Car className="w-12 h-12" />,
                title: "Virtual Showroom",
                description: "Explore cars in immersive 360° views from home"
              },
              {
                icon: <Star className="w-12 h-12" />,
                title: "Certified Quality",
                description: "Every vehicle undergoes rigorous certification process"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;