"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import ItemDisplay from "@/Components/ItemDisplay"; // Adjust the import path as needed
import SellAsset from "@/Components/Dashboard/Contracts/SellAssets/sellAsset";
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

// Token contracts with addresses (matching CurrentAssets)
const tokenContracts = [
  { address: "0xB297F730E741a822a426c737eCD0F7877A9a2c22", name: "North Pikounda REDD+", price: 2375 },
  { address: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81", name: "Panama Wind Energy Private Limited", price: 3800 },
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
  const [selectedAsset, setSelectedAsset] = useState<{
    project: string;
    price: number;
    contract: string;
  } | null>(null);
  
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({}); // Store quantities per asset contract
  const [assets, setAssets] = useState<CarbonAsset[]>([]); // Store actual asset balances

  useEffect(() => {
    const fetchBalances = async () => {
      const storedWallet = window.localStorage.getItem("walletAddress");
      if (!storedWallet) return;

      try {
        const provider = new ethers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org"); // Use Mumbai testnet RPC or adjust for your chain
        console.log("Connected to provider:", provider);

        const balances = await Promise.all(
          tokenContracts.map(async (token) => {
            const contract = new ethers.Contract(token.address, erc20ABI, provider);
            const balance = await contract.balanceOf(storedWallet);
            const balanceInUnits = parseFloat(ethers.formatUnits(balance, 18)); // Convert to human-readable units (assuming 18 decimals)

            return {
              date: new Date().toISOString().split("T")[0],
              project: token.name,
              price: token.price,
              contract: token.address,
              balance: balanceInUnits, // Store the actual balance for quantity limiting
            };
          })
        );
        console.log("Fetched balances:", balances);
        setAssets(balances);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchBalances();
  }, []);

  const handleQuantityChange = (contract: string, value: string) => {
    const qty = parseInt(value) || 0; // Default to 0 if invalid or empty
    const asset = assets.find(a => a.contract === contract);
    if (!asset) return;

    // Check if another asset already has a quantity > 0
    const hasOtherSelection = Object.entries(quantities).some(
      ([otherContract, otherQty]) => otherContract !== contract && otherQty > 0
    );

    if (hasOtherSelection) {
      alert("You can select only 1 item. Both items' quantities have been reset to 0.");
      // Reset all quantities to 0
      setQuantities({});
      setSelectedAsset(null);
      return; // Prevent changes after reset
    }

    // Limit quantity to the asset's balance (rounded down to nearest integer)
    const maxQuantity = Math.floor(asset.balance);
    if (qty > maxQuantity) {
      alert(`You can only sell up to ${maxQuantity} units of ${asset.project}.`);
      return; // Prevent exceeding balance
    }

    if (qty > 0) {
      // Set this asset as selected
      setSelectedAsset({
        project: asset.project,
        price: asset.price,
        contract: asset.contract,
      });
      setQuantities({ [contract]: qty > maxQuantity ? maxQuantity : qty }); // Limit to balance
    } else {
      // If quantity is 0 or empty, deselect this asset
      setSelectedAsset(null);
      setQuantities((prev) => ({ ...prev, [contract]: 0 }));
    }
  };

  const assetsForDisplay = assets.map((asset) => ({
    Project: asset.project,
    Price: `₹${asset.price}`,
    Quantity: {
      type: 'input',
      value: quantities[asset.contract] !== undefined ? quantities[asset.contract].toString() : '', // Start empty, show number if set
      onChange: (value: string) => handleQuantityChange(asset.contract, value),
    },
  }));

  const headers = ["Project", "Price", "Quantity"];

  // Memoize the callback to avoid re-creating it on every render
  const handleAggregatedData = useCallback((data: AggregateDataProps) => {
    // No need to set state here since we’re directly using quantities and selectedAsset
  }, []);

  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <SellAsset
          totalQuantity={selectedAsset ? quantities[selectedAsset.contract] || 0 : 0}
          totalPrice={selectedAsset ? (quantities[selectedAsset.contract] || 0) * (selectedAsset.price || 0) : 0}
          selectedCount={selectedAsset ? 1 : 0}
          selectedItems={selectedAsset ? [{
            id: selectedAsset.contract,
            project: selectedAsset.project,
            price: selectedAsset.price,
            selectedQuantity: quantities[selectedAsset.contract] || 0,
          }] : []}
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