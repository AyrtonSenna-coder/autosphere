import React from 'react';
import { Link } from 'react-router-dom';

const CarDetails = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Car Details</h1>
      <p className="text-gray-600">This page is under development.</p>
      <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
        ← Back to Home
      </Link>
    </div>
  );
};

export default CarDetails;