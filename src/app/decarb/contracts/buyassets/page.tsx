"use client";
import React, { useState } from "react";
import BuyCharComponent from "@/Components/Dashboard/Contracts/BuyAssets/buyAsset";
import BuyAssets from "@/Components/Dashboard/Contracts/BuyAssets/myassets";
import { z } from "zod";

// Define schemas for validation using zod
const walletSchema = z.object({
  amount: z.number(),
});

const carbonAssetSchema = z.object({
  date: z.string(),
  project: z.string(),
  price: z.number(),
  available: z.number(),
});

const carbonAssetArraySchema = z.array(carbonAssetSchema);

// Dummy wallet data
const dummyWalletData = { amount: 100.0 };

// Dummy carbon assets data
const dummyCarbonAssets = [
  { date: "2025-02-08", project: "North Pikounda REDD+", price: 16.67, available: 10 },
  { date: "2025-02-08", project: "Wind based power generation by Panama Wind Energy Private Limited IN, Maharashtra, India", price: 176.7, available: 5 },
  
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

const Page = () => {
  const [selectedAsset, setSelectedAsset] = useState<{ project: string; price: number } | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  // Function to handle selection
  const handleSelectAsset = (asset: { project: string; price: number } | null, qty: number) => {
    setSelectedAsset(asset);
    setQuantity(qty);
  };

  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <BuyCharComponent
          project={selectedAsset?.project}
          price={selectedAsset ? selectedAsset.price * quantity : 0}
          quantity={quantity}
        />
      </div>

      <div>
        <BuyAssets
          carbonAssets={validatedCarbonAssets.success ? validatedCarbonAssets.data : []}
          onSelectAsset={handleSelectAsset} // Pass the handler here
        />
      </div>
    </div>
  );
};

export default Page;
