"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import ItemDisplay from "@/Components/ItemDisplay"; // Adjust the import path as needed
import RetireAsset from "@/Components/Dashboard/Retirements/retireAsset";
import { z } from "zod";
import { AggregateDataProps } from "@/types/global.types";

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

// Token contracts with addresses (matching MyCarbAssets)
const tokenContracts = [
  { address: "0xB297F730E741a822a426c737eCD0F7877A9a2c22", name: "North Pikounda REDD+" },
  { address: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81", name: "Panama Wind Energy Private Limited" },
];

const erc20ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  }
];

// Validate dummy data
const validatedWalletData = walletSchema.safeParse(dummyWalletData);

if (!validatedWalletData.success) {
  console.error("Invalid wallet data:", validatedWalletData.error?.errors);
}

type CarbonAsset = {
  date: string;
  project: string;
  price: number;
  contract: string;
  Quantity?: {
    type: 'input';
    value: string;
    onChange: (value: string) => void;
  };
};

const Page = () => {
  const [aggregatedData, setAggregatedData] = useState<AggregateDataProps>();
  const [assets, setAssets] = useState<CarbonAsset[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      const storedWallet = window.localStorage.getItem("walletAddress");
      if (!storedWallet) return;

      try {
        const provider = new ethers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org"); // Celo Alfajores RPC
        const balances = await Promise.all(
          tokenContracts.map(async (token, index) => {
            const contract = new ethers.Contract(token.address, erc20ABI, provider);
            const balance = await contract.balanceOf(storedWallet);
            const balanceInUnits = parseFloat(ethers.formatUnits(balance, 18)); // Convert to human-readable units (assuming 18 decimals)

            return balanceInUnits > 0 ? {
              date: new Date().toISOString().split("T")[0],
              project: token.name,
              price: 100, // Fixed price as in MyCarbAssets
              contract: token.address,
              balance: balanceInUnits, // Store the actual balance for quantity limiting
            } : null;
          })
        );
        setAssets(balances.filter(Boolean) as CarbonAsset[]);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchBalances();
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = (contract: string, value: string) => {
    const qty = parseInt(value) || 0; // Default to 0 if invalid or empty
    const asset = assets.find(a => a.contract === contract);
    if (!asset) return;

    // Limit quantity to the asset's balance (rounded down to nearest integer)
    const maxQuantity = Math.floor(asset.balance);
    if (qty > maxQuantity) {
      alert(`You can only retire up to ${maxQuantity} units of ${asset.project}.`);
      return; // Prevent exceeding balance
    }

    // Update selected items
    setSelectedItems((prev) => {
      const existingIndex = prev.findIndex((item: any) => item.contract === contract);
      let newSelection;

      if (existingIndex !== -1) {
        // If quantity is 0, remove item
        if (qty === 0) {
          newSelection = prev.filter((item: any) => item.contract !== contract);
        } else {
          // Update item
          newSelection = [...prev];
          newSelection[existingIndex] = { ...asset, selectedQuantity: qty, id: existingIndex + 1 };
        }
      } else {
        // Add new item
        newSelection = [...prev, { ...asset, selectedQuantity: qty, id: prev.length + 1 }];
      }

      // Calculate aggregated data
      const totalQuantity = newSelection.reduce((sum, item: any) => sum + (item.selectedQuantity || 0), 0);
      const totalPrice = newSelection.reduce((sum, item: any) => sum + (item.price || 0), 0);
      const selectedCount = newSelection.length;

      setAggregatedData({
        totalQuantity,
        totalPrice,
        selectedCount,
        selectedItems: newSelection,
      });

      return newSelection;
    });
  };

  const assetsForDisplay = assets.map((asset) => ({
    Project: asset.project,
    Price: `₹${asset.price}`,
    Quantity: {
      type: 'input',
      value: selectedItems.find((item: any) => item.contract === asset.contract)?.selectedQuantity?.toString() || '', // Show selected quantity or empty
      onChange: (value: string) => handleSelectionChange(asset.contract, value),
    },
  }));

  const headers = ["Project", "Price", "Quantity"];

  // Memoize the callback to avoid re-creating it on every render
  const handleAggregatedData = useCallback((data: AggregateDataProps) => {
    setAggregatedData(data);
    console.log(data);
  }, []);

  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <RetireAsset
          totalQuantity={aggregatedData?.totalQuantity}
          selectedCount={aggregatedData?.selectedCount}
          contractAddress={aggregatedData?.selectedItems?.[0]?.contract || ""}
        />
      </div>
      <div>
        <div className="flex items-center justify-between p-2">
          <h1 className="text-lg font-bold text-gray-800">My Carbon Assets (DCO2)</h1>
        </div>
        <ItemDisplay
          items={assetsForDisplay}
          headers={headers}
          quantityMode="input" // Set to 'input' to render the quantity as a number input
          bgColor="#71D1F0" // Optional: table background color
          itemBgColor="#D4F4FF"  // Light lavender background for item boxes (full opacity)
        />
      </div>
    </div>
  );
};

export default Page;