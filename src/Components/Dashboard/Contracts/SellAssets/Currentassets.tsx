"use client";
import React, { useState, useCallback } from "react";
import Individualasset from "./Individualasset";

const dummyAssets = [
  {
    id: 1,
    date: "2025-01-01",
    quantity: 10,
    project: "Rimba Raya Biodiversity Reserve Project",
    price: 100,
  },
  {
    id: 2,
    date: "2025-01-02",
    quantity: 20,
    project: "Yingpeng HFC23 Decompostion Project",
    price: 200,
  },

];

const CurrentAssets: React.FC<any> = ({ onAggregatedData }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = useCallback((item) => {
    setSelectedItems((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      const updated = item.selectedQuantity > 0 ? [...filtered, item] : filtered;

      // Aggregate the updated data
      const totalQuantity = updated.reduce((sum, i) => sum + i.selectedQuantity, 0);
      const totalPrice = updated.reduce((sum, i) => sum + i.price, 0); // Correct total price calculation

      // Notify the parent with aggregated data
      onAggregatedData({
        totalQuantity,
        totalPrice,
        selectedCount: updated.length,
      });

      return updated;
    });
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold p-2">My Carbon Assets (DCO2)</h1>
      <div className="bg-purple-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          <div>Date</div>
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          <div>Sell</div>
        </div>
        <div className="space-y-4">
          {dummyAssets.map((asset) => (
            <Individualasset key={asset.id} {...asset} onSelectionChange={handleSelectionChange} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAssets;
