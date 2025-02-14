"use client"
import React, { useState, useMemo, useCallback } from 'react'
import MyCarbAssets from './mycarbonassets'
import { AggregateDataProps } from '@/types/global.types'
import RetireAsset from './retireAsset'

const MainRetireComponent = () => {
  const [aggregatedData, setAggregatedData] = useState<AggregateDataProps>();

  // Memoize the callback to avoid re-creating it on every render
  const handleAggregatedData = useCallback((data: AggregateDataProps) => {
    setAggregatedData(data);
  }, []);

  return (
    <div>
      
      <div className='w-full mb-6'>
      <RetireAsset
  totalQuantity={aggregatedData?.totalQuantity}
  selectedCount={aggregatedData?.selectedCount}
  contractAddress={aggregatedData?.selectedItems?.[0]?.contract || ""}
/>

      </div>
      <div>
        <MyCarbAssets onAggregatedData={handleAggregatedData} />
      </div>
    </div>
  );
}

export default MainRetireComponent;
