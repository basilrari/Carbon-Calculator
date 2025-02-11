import React from 'react';
import { z } from 'zod';
import Retirement from './Retirement';

// Schema Definitions
const retirementSchema = z.object({
  date: z.date(),
  quantity: z.number(),
  project: z.string(),
  price: z.number(),
});

const retirementArraySchema = z.array(retirementSchema);

// Dummy Data
const dummyRetirements = [
  {
    date: new Date('2025-01-01'),
    quantity: 5,
    project: 'North Pikounda REDD+',
    price: 100,
  },
  {
    date: new Date('2025-01-02'),
    quantity: 10,
    project: 'Wind based power generation by Panama Wind Energy Private Limited IN, Maharashtra, India',
    price: 200,
  },
];

// Component Definition
const MyRetirements = () => {
  // Validate dummy data against the schema
  const parsedResponse = retirementArraySchema.safeParse(dummyRetirements);
  const retirements = parsedResponse.success ? parsedResponse.data : [];

  return (
    <div>
      <div className="p-2">
        <h1 className="text-lg font-bold text-gray-800">My Retirements</h1>
      </div>
      <div className="bg-blue-100 rounded-lg p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          <div>Date</div>
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          <div>View</div>
        </div>
        {/* Content */}
        <div className="space-y-4">
          {retirements.length > 0 ? (
            retirements.map((asset, index) => (
              <Retirement
                key={index}
                date={asset.date}
                quantity={asset.quantity}
                project={asset.project}
                price={asset.price}
              />
            ))
          ) : (
            <div className="text-gray-300">You have no retirements</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRetirements;