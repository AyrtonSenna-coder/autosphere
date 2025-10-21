import React from 'react';
import { Link } from 'react-router-dom';
import AdvancedSearch from '../components/Search/AdvancedSearch';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-blue-900 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Car with Confidence</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover thousands of certified pre-owned vehicles with our advanced search and virtual inspection features.
          </p>
          <AdvancedSearch onSearch={(filters) => console.log(filters)} />
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* We'll map through featured cars here */}
          </div>
          <div className="text-center mt-12">
            <Link to="/cars" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Other sections... */}
    </div>
  );
};

export default Home;