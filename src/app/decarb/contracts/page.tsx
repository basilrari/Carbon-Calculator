import React from 'react';
import BuyorSell from '@/Components/Dashboard/Contracts/BuyorSellComp';
import MyCarbonAssets from '@/Components/Dashboard/Contracts/mycarbasset';

// Dummy data for carbon assets
const dummyAssets = [
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
  {
    date: '2024-12-15',
    quantity: 200,
    project: 'Ocean Cleanup Initiative',
    price: 20.15,
    status: 'sold',
  },
];

// Dummy price for CHAR
const charPrice = 150;

const Page = () => {
  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <BuyorSell price={charPrice} />
      </div>
      <div>
        <MyCarbonAssets carbonAssets={dummyAssets} />
      </div>
    </div>
  );
};

export default Page;
