"use client";
import React, { useState, useCallback } from "react";
import MyCarbAssets from "@/Components/Dashboard/Retirements/retireassets/mycarbonassets";
import RetireAsset from "@/Components/Dashboard/Retirements/retireassets/retireAsset";

const MainRetireComponent = () => {
  const [aggregatedData, setAggregatedData] = useState<{
    totalQuantity?: number;
    totalPrice?: number;
    selectedCount?: number;
  }>({});

  const handleAggregatedData = useCallback((data: typeof aggregatedData) => {
    setAggregatedData(data);
  }, []);

  return (
    <div>
      <div className="text-2xl font-semibold pl-3 pt-2">
        <h1>Retirements</h1>
      </div>
      <div className="w-full mb-6 mt-5">
        <RetireAsset
          totalQuantity={aggregatedData?.totalQuantity}
          totalPrice={aggregatedData?.totalPrice}
          selectedCount={aggregatedData?.selectedCount}
        />
      </div>
      <div>
        <MyCarbAssets onAggregatedData={handleAggregatedData} />
      </div>
    </div>
  );
};

export default MainRetireComponent;
