import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">🚗 AutoSphere</h1>
        <p className="text-xl mb-8">Your Premier Car Dealership</p>
        
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-4">Welcome to AutoSphere</h2>
          <p className="text-lg mb-6">
            Find your perfect car with our advanced search and virtual showroom features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Cars
            </button>
            <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Sell Your Car
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: 'Virtual Showroom', desc: '360° car viewing' },
            { title: 'AI Car Match', desc: 'Smart recommendations' },
            { title: 'Certified Quality', desc: 'Thorough inspections' }
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;