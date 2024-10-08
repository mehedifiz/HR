import React from 'react';

const PackageCard = ({ employees, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center border">
      <h2 className="text-2xl font-bold mb-4">Package for {employees} Employees</h2>
      <div className="text-3xl font-bold mb-4">${price}</div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Subscribe
      </button>
    </div>
  );
};

export default PackageCard;