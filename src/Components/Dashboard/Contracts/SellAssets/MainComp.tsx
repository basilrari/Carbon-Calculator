"use client";
import React, { useState } from 'react';
import CurrentAssets from './Currentassets';
import SellAsset from './sellAsset';

const MainSellComponent = () => {
  const [aggregatedData, setAggregatedData] = useState({
    totalQuantity: 100, // Dummy data
    totalPrice: 5000,   // Dummy data
    selectedCount: 5,   // Dummy data
  });

  return (
    <div>
      <div className="text-2xl font-semibold pl-3 pt-2">
        <h1>Retirements</h1>
      </div>
      <div className="w-full mb-6 mt-5">
        <SellAsset
          totalQuantity={aggregatedData.totalQuantity}
          totalPrice={aggregatedData.totalPrice}
          selectedCount={aggregatedData.selectedCount}
        />
      </div>
      <div>
        <CurrentAssets onAggregatedData={(data) => setAggregatedData(data)} />
      </div>
    </div>
  );
};

export default MainSellComponent;
