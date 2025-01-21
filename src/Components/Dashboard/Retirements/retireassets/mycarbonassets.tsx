"use client"
import React, { useEffect, useState } from 'react';
import Individualasset from './Individualasset';
import { z } from 'zod';
import { MyAssetArray, onAggregatedDataProps } from '@/types/global.types';

const carbonAssetSchema = z.object({
  id: z.number(),
  date: z.string(),
  quantity: z.number(),
  project: z.string(),
  price: z.number(),
  status: z.literal('current'),
});

const carbonAssetArraySchema = z.array(carbonAssetSchema);

const MyCarbAssets: React.FC<onAggregatedDataProps> = ({ onAggregatedData }) => {
  const [selectedItems, setSelectedItems] = useState<
    { id: number; selectedQuantity: number; price: number }[]
  >([]);
  const [carbonAssets, setCarbonAssets] = useState<MyAssetArray>([]);

  useEffect(() => {
    // Dummy data for carbon assets
    const dummyData = [
      { id: 1, date: '2025-01-01', quantity: 100, project: 'Project A', price: 200, status: 'current' },
      { id: 2, date: '2025-01-02', quantity: 150, project: 'Project B', price: 300, status: 'current' },
      { id: 3, date: '2025-01-03', quantity: 200, project: 'Project C', price: 400, status: 'current' },
    ];

    // Simulate successful data fetching
    const parsedResponse = carbonAssetArraySchema.safeParse(dummyData);

    if (parsedResponse.success) {
      setCarbonAssets(parsedResponse.data);
    } else {
      console.error('Invalid Data Format', parsedResponse.error);
    }
  }, []);

  const handleSelectionChange = (data: { id: number; selectedQuantity: number; price: number } | number) => {
    setSelectedItems((prev) => {
      if (typeof data === 'number') {
        return prev.filter((item) => item.id !== data); // Remove deselected item
      } else {
        const existingItemIndex = prev.findIndex((item) => item.id === data.id);

        if (existingItemIndex !== -1) {
          const updatedItems = [...prev];
          updatedItems[existingItemIndex] = data;
          return updatedItems;
        } else {
          return [...prev, data];
        }
      }
    });
  };

  useEffect(() => {
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.selectedQuantity, 0);
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

    onAggregatedData({
      totalQuantity,
      totalPrice,
      selectedCount: selectedItems.length,
    });

    // Print transaction details to the console
    console.log('Selected Items:', selectedItems);
  }, [selectedItems, onAggregatedData]);

  return (
    <div>
      <h1 className="text-lg font-semibold p-2">My Carbon Assets (DCO2)</h1>
      <div className="bg-purple-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          <div>Date</div>
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          
          <div>Retire</div>
        </div>
        <div className="space-y-4">
          {carbonAssets.length > 0 ? (
            carbonAssets.map((asset) => (
              <Individualasset
                key={asset.id}
                id={asset.id}
                date={asset.date}
                quantity={asset.quantity}
                project={asset.project}
                price={asset.price}
                status={asset.status}
                onSelectionChange={handleSelectionChange}
              />
            ))
          ) : (
            <div className="text-gray-500">You have no carbon assets</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCarbAssets;
