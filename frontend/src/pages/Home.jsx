import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Zap, Star } from 'lucide-react';

const Home = () => {
  const featuredCars = [
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
      ]
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
      ]
    },
    {
      _id: '3',
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2020,
      price: 35800,
      mileage: 24700,
      fuelType: 'Diesel',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          alt: 'Mercedes C-Class'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Perfect Car
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover thousands of certified pre-owned vehicles with our advanced search and virtual inspection features.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by make, model, or features..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Search Cars
              </button>
            </div>
          </div>
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
              <div
                key={car._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
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
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/cars"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View All Vehicles
            </Link>
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
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're revolutionizing car buying with cutting-edge technology and customer-focused services
            </p>
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
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect vehicle with AutoSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cars"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Inventory
            </Link>
            <Link
              to="/sell"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Sell Your Car
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;