"use client";

import React, { useState } from "react";
import { ethers } from "ethers"; // Added for potential future use if needed
import ItemDisplay from "@/Components/ItemDisplay"; // Adjust the import path as needed
import BuyCharComponent from "@/Components/Dashboard/Contracts/BuyAssets/buyAsset";
import { z } from "zod";

// Define schemas for validation using zod
const walletSchema = z.object({
  amount: z.number(),
});

const carbonAssetSchema = z.object({
  date: z.string(),
  project: z.string(),
  price: z.number(),
  contract: z.string(),
});

const carbonAssetArraySchema = z.array(carbonAssetSchema);

// Dummy wallet data
const dummyWalletData = { amount: 100.0 };

// Dummy carbon assets data
const dummyCarbonAssets = [
  {
    date: "2025-02-08",
    project: "North Pikounda REDD+",
    price: 2500,
    contract: "0xB297F730E741a822a426c737eCD0F7877A9a2c22",
  },
  {
    date: "2025-02-08",
    project: "Panama Wind Energy Private Limited",
    price: 4000,
    contract: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81",
  },
];

// Validate dummy data
const validatedWalletData = walletSchema.safeParse(dummyWalletData);
const validatedCarbonAssets = carbonAssetArraySchema.safeParse(dummyCarbonAssets);

if (!validatedWalletData.success || !validatedCarbonAssets.success) {
  console.error("Invalid data:", {
    walletErrors: validatedWalletData.error?.errors,
    assetErrors: validatedCarbonAssets.error?.errors,
  });
}

type CarbonAsset = {
  date: string;
  project: string;
  price: number;
  contract: string;
  Quantity?: {
    type: 'input';
    value: string; // Changed to string to allow empty input
    onChange: (value: string) => void;
  };
};

const Page = () => {
  // Include `contract` in `selectedAsset`
  const [selectedAsset, setSelectedAsset] = useState<{
    project: string;
    price: number;
    contract: string;
  } | null>(null);
  
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({}); // Store quantities per asset contract

  const handleQuantityChange = (contract: string, value: string) => {
    const qty = parseInt(value) || 0; // Default to 0 if invalid or empty

    // Check if another asset already has a quantity > 0
    const hasOtherSelection = Object.entries(quantities).some(
      ([otherContract, otherQty]) => otherContract !== contract && otherQty > 0
    );

    if (hasOtherSelection) {
      alert("You can select only 1 item ");
      // Reset all quantities to 0
      setQuantities({});
      setSelectedAsset(null);
      return; // Prevent changes after reset
    }

    if (qty > 0) {
      // Set this asset as selected and limit quantity to 1-3
      setSelectedAsset({
        project: dummyCarbonAssets.find(a => a.contract === contract)?.project || "",
        price: dummyCarbonAssets.find(a => a.contract === contract)?.price || 0,
        contract,
      });
      setQuantities({ [contract]: qty > 3 ? 3 : qty < 1 ? 1 : qty }); // Limit to 1-3
    } else {
      // If quantity is 0 or empty, deselect this asset
      setSelectedAsset(null);
      setQuantities((prev) => ({ ...prev, [contract]: 0 }));
    }
  };

  const assetsForDisplay = validatedCarbonAssets.success ? validatedCarbonAssets.data.map((asset) => ({
    Project: asset.project,
    Price: asset.price,
    Quantity: {
      type: 'input',
      value: quantities[asset.contract] !== undefined ? quantities[asset.contract].toString() : '', // Start empty, show number if set
      onChange: (value: string) => handleQuantityChange(asset.contract, value),
    },
  })) : [];

  const headers = ["Project", "Price", "Quantity"];

  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <BuyCharComponent
          project={selectedAsset?.project ?? ""}
          price={selectedAsset ? selectedAsset.price * (quantities[selectedAsset.contract] || 0) : 0}
          quantity={quantities[selectedAsset?.contract] || 0}
          contract={selectedAsset?.contract ?? ""}
        />
      </div>
      <div>
        <div className="flex items-center justify-between p-2">
          <h1 className="text-lg font-bold text-gray-800">Available Carbon Assets</h1>
        </div>
        <ItemDisplay
          items={assetsForDisplay}
          headers={headers}
          quantityMode="input" // Set to 'input' to render the quantity as a number input
          bgColor="#C293FF" // Light purple background for the table container (10% opacity will be applied)
          itemBgColor="#ECDDFF" // Light lavender background for item boxes (full opacity)
        />
      </div>
    </div>
  );
};

export default Page;