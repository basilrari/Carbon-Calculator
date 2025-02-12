"use client";
import React, { useState, useMemo, useCallback } from 'react'
import CurrentAssets from './Currentassets';
import { AggregateDataProps } from '@/types/global.types'
import SellAsset from './sellAsset';

const MainSellComponent = () => {
   const [aggregatedData, setAggregatedData] = useState<AggregateDataProps>();
  
    // Memoize the callback to avoid re-creating it on every render
    const handleAggregatedData = useCallback((data: AggregateDataProps) => {
      setAggregatedData(data);
    }, []);

  return (
    <div>
      
      <div className="w-full mb-6 mt-5">
        <SellAsset
          totalQuantity={aggregatedData?.totalQuantity}
          totalPrice={aggregatedData?.totalPrice}
          selectedCount={aggregatedData?.selectedCount}
          selectedItems={aggregatedData?.selectedItems || []}
        />
      </div>
      <div>
        <CurrentAssets onAggregatedData={handleAggregatedData} />
      </div>
    </div>
  );
};

export default MainSellComponent;