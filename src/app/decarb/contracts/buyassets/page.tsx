"use client"
import React, { useState } from 'react';

import BuyCharComponent from '@/Components/Dashboard/Contracts/BuyAssets/buyAsset';
import BuyAssets from '@/Components/Dashboard/Contracts/BuyAssets/myassets';
import { z } from 'zod';

// Define schemas for validation using zod
const walletSchema = z.object({
  amount: z.number(),
});

const carbonAssetSchema = z.object({
  date: z.string(),
  quantity: z.number(),
  project: z.string(),
  price: z.number(),
  status: z.literal('current'),
});

const carbonAssetArraySchema = z.array(carbonAssetSchema);

// Dummy wallet data
const dummyWalletData = { amount: 100.0 };

// Dummy carbon assets data
const dummyCarbonAssets = [
  {
    date: '2025-01-01',
    quantity: 100,
    project: 'Wind based power generation by Panama Wind Energy Private Limited IN, Maharashtra, India',
    price: 16.67,
    status: 'current',
  },
  { date: '2025-01-01', quantity: 10, project: 'North Pikounda REDD+', price: 176.7, status: 'current' },
  
];

// Validate dummy data
const validatedWalletData = walletSchema.safeParse(dummyWalletData);
const validatedCarbonAssets = carbonAssetArraySchema.safeParse(dummyCarbonAssets);

if (!validatedWalletData.success || !validatedCarbonAssets.success) {
  console.error('Invalid data:', {
    walletErrors: validatedWalletData.error?.errors,
    assetErrors: validatedCarbonAssets.error?.errors,
  });
}

const Page = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const handleSelectAsset = (asset: any, qty: number) => {
    setSelectedAsset(asset);
    setSelectedQuantity(qty);
  };

  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <BuyCharComponent
          walletAmount={validatedWalletData.success ? validatedWalletData.data.amount : 0}
          selectedAsset={selectedAsset}
          selectedQuantity={selectedQuantity}
        />
      </div>

      <div>
        <BuyAssets
          carbonAssets={validatedCarbonAssets.success ? validatedCarbonAssets.data : []}
          onSelectAsset={handleSelectAsset}
        />
      </div>
      
      
    </div>
  );
};

export default Page;
