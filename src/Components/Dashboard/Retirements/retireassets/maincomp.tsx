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
      <div className='text-2xl font-semibold pl-3 pt-2'>
        <h1>Retirements</h1>
      </div>
      <div className='w-full mb-6 mt-5'>
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
