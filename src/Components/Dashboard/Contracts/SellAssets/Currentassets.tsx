"use client";
import React, { useState, useCallback } from 'react';
import Individualasset from './Individualasset';

const dummyAssets = [
  {
    id: 1,
    date: '2025-01-01',
    quantity: 10,
    project: 'Project A',
    price: 100,
    status: 'Current', // Dummy status
  },
  {
    id: 2,
    date: '2025-01-02',
    quantity: 20,
    project: 'Project B',
    price: 200,
    status: 'Current', // Dummy status
  },
  {
    id: 3,
    date: '2025-01-03',
    quantity: 30,
    project: 'Project C',
    price: 300,
    status: 'Current', // Dummy status
  },
]; // Dummy data

const CurrentAssets: React.FC<any> = ({ onAggregatedData = () => {} }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = useCallback((item) => {
    setSelectedItems((prev) => {
      if (!prev.includes(item)) {
        return [...prev, item];
      } else {
        return prev.filter((i) => i !== item);
      }
    });
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold p-2">My Carbon Assets (DCO2)</h1>
      </div>
      <div className="bg-purple-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          <div>Date</div>
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          <div>Status</div>
        </div>
        <div className="space-y-4">
          {dummyAssets.map((asset) => (
            <Individualasset
              key={asset.id}
              {...asset}
              onSelectionChange={handleSelectionChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAssets;
