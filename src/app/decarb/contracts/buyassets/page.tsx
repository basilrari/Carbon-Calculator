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
    price: 16.67,
    contract: "0xB297F730E741a822a426c737eCD0F7877A9a2c22",
  },
  {
    date: "2025-02-08",
    project:
      "Panama Wind Energy Private Limited",
    price: 176.7,
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

const Page = () => {
  // Include `contract` in `selectedAsset`
  const [selectedAsset, setSelectedAsset] = useState<{
    project: string;
    price: number;
    contract: string;
  } | null>(null);
  
  const [quantity, setQuantity] = useState<number>(); // Default quantity to 1

  const handleSelectAsset = (
    asset: { project: string; price: number; contract: string } | null,
    qty: number
  ) => {
    setSelectedAsset(asset);
    setQuantity(qty > 0 ? qty : 1); // Ensure quantity is at least 1
  };

  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <BuyCharComponent
          project={selectedAsset?.project ?? ""}
          price={selectedAsset ? selectedAsset.price * quantity : 0}
          quantity={quantity}
          contract={selectedAsset?.contract ?? ""}
        />
      </div>

      <div>
        <BuyAssets
          carbonAssets={validatedCarbonAssets.success ? validatedCarbonAssets.data : []}
          onSelectAsset={handleSelectAsset}
        />
      </div>
    </div>
  );
};

export default Page;
