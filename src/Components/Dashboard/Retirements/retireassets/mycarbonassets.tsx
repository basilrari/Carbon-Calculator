"use client";
import React, { useEffect, useState } from "react";
import Individualasset from "./Individualasset";

const MyCarbAssets: React.FC<{ onAggregatedData: (data: { totalQuantity: number; totalPrice: number; selectedCount: number }) => void }> = ({ onAggregatedData }) => {
  const [selectedItems, setSelectedItems] = useState<
    { id: number; selectedQuantity: number; price: number; contract: string; project: string }[]
  >([]);
  const [carbonAssets, setCarbonAssets] = useState<
    { id: number; date: string; quantity: number; project: string; price: number; status: string; contract: string }[]
  >([]);

  useEffect(() => {
    const dummyData = [
      { id: 1, date: "2025-01-01", quantity: 100, project: "North Pikounda REDD+", contract: "0xB297F730E741a822a426c737eCD0F7877A9a2c22", price: 200, status: "current" },
      { id: 2, date: "2025-01-02", quantity: 150, project: "Wind based power generation by Panama Wind Energy Private Limited IN, Maharashtra, India", contract: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81", price: 300, status: "current" },
    ];

    setCarbonAssets(dummyData);
  }, []);

  const handleSelectionChange = (data: { id: number; selectedQuantity: number; price: number; contract: string; project: string }) => {
    setSelectedItems((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === data.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = data;
        return updatedItems;
      } else {
        return [...prev, data];
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

    console.log("Selected Items:", selectedItems);
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
              <Individualasset key={asset.id} {...asset} onSelectionChange={handleSelectionChange} />
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
