"use client";
import React, { useState, useCallback, useEffect } from "react";
import Individualasset from "./Individualasset";

const dummyAssets = [
  {
    id: 1,
    date: "2025-01-01",
    quantity: 10,
    project: "Project A",
    price: 100,
    status: "Available",
  },
  {
    id: 2,
    date: "2025-01-02",
    quantity: 20,
    project: "Project B",
    price: 200,
    status: "Available",
  },
  {
    id: 3,
    date: "2025-01-03",
    quantity: 30,
    project: "Project C",
    price: 300,
    status: "Available",
  },
];

const CurrentAssets: React.FC<any> = ({ onAggregatedData }) => {
  const [selectedItems, setSelectedItems] = useState({});

  const handleSelectionChange = useCallback((id, quantity) => {
    setSelectedItems((prev) => {
      const updated = { ...prev, [id]: quantity };
      if (quantity === 0) delete updated[id]; // Remove items with 0 quantity
      return updated;
    });
  }, []);

  useEffect(() => {
    const totalQuantity = Object.values(selectedItems).reduce(
      (sum, qty) => sum + qty,
      0
    );
    const totalPrice = Object.entries(selectedItems).reduce(
      (sum, [id, qty]) => sum + qty * dummyAssets.find((a) => a.id === +id)?.price,
      0
    );
    onAggregatedData({
      totalQuantity,
      totalPrice,
      selectedCount: Object.keys(selectedItems).length,
    });
  }, [selectedItems, onAggregatedData]);

  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold p-2">My Carbon Assets (DCO2)</h1>
      </div>
      <div className="bg-purple-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          <div>Date</div>
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          <div>Status</div>
          <div>Selected Qty</div>
        </div>
        <div className="space-y-4">
          {dummyAssets.map((asset) => (
            <Individualasset
              key={asset.id}
              {...asset}
              onSelectionChange={handleSelectionChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAssets;
