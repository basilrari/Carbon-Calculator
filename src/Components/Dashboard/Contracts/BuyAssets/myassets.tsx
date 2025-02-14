"use client";

import React, { useState } from "react";
import Link from "next/link";

type CarbonAsset = {
  date: string;
  project: string;
  price: number;
  available: number;
};

type BuyAssetsProps = {
  carbonAssets: CarbonAsset[];
  onSelectAsset: (asset: CarbonAsset | null, qty: number) => void;
};

const BuyAssets: React.FC<BuyAssetsProps> = ({
  carbonAssets,
  onSelectAsset,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<CarbonAsset | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = (index: number, value: string) => {
    if (value === "") {
      setQuantity(0);
      setSelectedAsset(null);
      onSelectAsset(null, 0);
      return;
    }

    const numValue = Number(value);
    if (numValue > 3) {
      alert("You can only purchase up to 3 units.");
      return;
    }

    if (numValue >= 1 && numValue <= 3) {
      setQuantity(numValue);
      setSelectedAsset(carbonAssets[index]);
      onSelectAsset(carbonAssets[index], numValue);
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-lg font-semibold p-2">Buy Carbon Assets (DCO2)</h1>
      <div className="bg-purple-100 rounded-lg p-6">
        {/* Table Header */}
        <div className="flex items-center justify-between font-bold text-gray-600 border-b pb-2 px-4">
          <div className="w-1/3 text-left">Project Name</div>
          <div className="w-1/3 text-center">Price</div>
          <div className="w-1/3 text-right">Quantity</div>
        </div>

        {/* Table Rows */}
        <div className="mt-4">
          {carbonAssets.length > 0 ? (
            carbonAssets.map((asset, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
              >
                {/* Project Name as a Link */}
                <div className="w-1/3 text-left group">
                  <Link
                    href={`/decarb/project/${encodeURIComponent(
                      asset.project
                    )}`}
                    className="text-black hover:underline flex items-center"
                  >
                    {asset.project}
                    <span className="opacity-0 group-hover:opacity-200 transition-opacity duration-200 ml-1">
                      ↗
                    </span>
                  </Link>
                </div>

                <div className="w-1/3 text-center">
                  ₹{asset.price.toFixed(2)}
                </div>
                <div className="w-1/3 text-right relative">
                  <input
                    type="number"
                    min="1"
                    max="3"
                    value={
                      selectedAsset?.project === asset.project ? quantity : ""
                    }
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">
              No assets available for purchase
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyAssets;
