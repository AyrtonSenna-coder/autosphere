import React from 'react';
import AdvancedSearch from '../components/Search/AdvancedSearch';

const CarListing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Cars</h1>
      <AdvancedSearch onSearch={(filters) => console.log(filters)} />
      {/* Car listings will be displayed here */}
    </div>
  );
};

export default CarListing;