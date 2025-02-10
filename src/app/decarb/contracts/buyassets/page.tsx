import React from 'react';
import BuyCharComponent from '@/Components/Dashboard/Contracts/BuyAssets/buyAsset';
import MyAssets from '@/Components/Dashboard/Contracts/BuyAssets/myassets';
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
    project: 'Project Forest',
    price: 16.67,
    status: 'current',
  },
  { date: '2025-01-01', quantity: 10, project: 'Project Alpha', price: 176.7, status: 'current' },
  { date: '2025-01-05', quantity: 20, project: 'Project Beta', price: 353.4, status: 'current' },
  { date: '2025-01-10', quantity: 15, project: 'Project Gamma', price: 265.05, status: 'current' },
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
  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <BuyCharComponent
          walletAmount={validatedWalletData.success ? validatedWalletData.data.amount : 0}
        />
      </div>

      <div>
        <MyAssets
          carbonAssets={validatedCarbonAssets.success ? validatedCarbonAssets.data : []}
        />
      </div>
    </div>
  );
};

export default Page;