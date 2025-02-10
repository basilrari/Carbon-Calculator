"use client";
import React, { useState } from "react";

type CarbonAsset = {
  date: string;
  project: string;
  price: number;
  available: number;
};

type BuyAssetsProps = {
  carbonAssets: CarbonAsset[];
  onSelectAsset: (asset: CarbonAsset | null, qty: number) => void; // New prop
};

const BuyAssets: React.FC<BuyAssetsProps> = ({ carbonAssets, onSelectAsset }) => {
  const [selectedAsset, setSelectedAsset] = useState<CarbonAsset | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = (index: number, value: string) => {
    if (value === "") {
      setQuantity(0);
      setSelectedAsset(null);
      onSelectAsset(null, 0); // Ensure Page also gets updated
      return;
    }

    const numValue = Number(value);
    if (numValue >= 1 && numValue <= 3) {
      setQuantity(numValue);
      setSelectedAsset(carbonAssets[index]);
      onSelectAsset(carbonAssets[index], numValue); // Update Page state
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold p-2">Buy Carbon Assets (DCO2)</h1>
      <div className="bg-purple-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          
          <div>Project Name</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>

        {/* Table Rows */}
        <div className="mt-4">
          {carbonAssets.length > 0 ? (
            carbonAssets.map((asset, index) => (
              <div key={index} className="flex justify-between items-center">
                
                <div>{asset.project}</div>
                <div>{asset.price}</div>
                <input
                  type="number"
                  min="1"
                  max="3"
                  value={selectedAsset?.project === asset.project ? quantity : ""}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="w-16 border border-gray-300 rounded px-2 py-1"
                />
              </div>
            ))
          ) : (
            <div className="text-gray-500">No assets available for purchase</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyAssets;
