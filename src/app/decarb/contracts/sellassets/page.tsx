"use client";

import React, { useState } from "react";
import { ethers } from "ethers"; // Added for potential future use if needed
import ItemDisplay from "@/Components/ItemDisplay"; // Adjust the import path as needed
import { z } from "zod";
import ActionSelection from "@/Components/ActionSelection"; // Use ActionSelection
import toast, { Toaster } from "react-hot-toast"; // Ensure toast is imported
import myServer from "@/utils/Axios/axios";
import { useRouter } from "next/navigation"; // Updated for Next.js 13+

// Define schemas for validation using zod (unchanged)
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

// Dummy wallet data (unchanged)
const dummyWalletData = { amount: 100.0 };

// Dummy carbon assets data (unchanged)
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

// Validate dummy data (unchanged)
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
  price: z.number;
  contract: string;
  Quantity?: {
    type: "input";
    value: string; // Changed to string to allow empty input
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
  const router = useRouter();

  const handleQuantityChange = (contract: string, value: string) => {
    const qty = parseInt(value) || 0; // Default to 0 if invalid or empty

    console.log("handleQuantityChange - contract:", contract, "value:", value, "qty:", qty);

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
      const asset = dummyCarbonAssets.find((a) => a.contract === contract);
      if (asset) {
        setSelectedAsset({
          project: asset.project,
          price: asset.price,
          contract: contract,
        });
        setQuantities({ [contract]: qty > 3 ? 3 : qty < 1 ? 1 : qty }); // Limit to 1-3
      }
    } else {
      // If quantity is 0 or empty, deselect this asset
      setSelectedAsset(null);
      setQuantities((prev) => ({ ...prev, [contract]: 0 }));
    }
  };

  const assetsForDisplay = validatedCarbonAssets.success
    ? validatedCarbonAssets.data.map((asset) => ({
      Project: asset.project,
      Price: asset.price,
      Quantity: {
        type: "input",
        value: quantities[asset.contract] !== undefined ? quantities[asset.contract].toString() : "",
        onChange: (value: string) => handleQuantityChange(asset.contract, value),
      },
    }))
    : [];

  const headers = ["Project", "Price", "Quantity"];

  // Handle sell action logic with debugging
  const handleSell = async () => {
    console.log("handleSell triggered - selectedAsset:", selectedAsset);
    console.log("handleSell triggered - quantities:", quantities);
    if (!selectedAsset || !quantities[selectedAsset.contract] || quantities[selectedAsset.contract] <= 0) {
      console.log("Validation failed - no valid selection or quantity");
      toast.error("Please select a valid quantity before selling.", {
        duration: 4000,
        style: { maxWidth: "300px", fontSize: "14px" },
      });
      return;
    }

    try {
      console.log("Starting sell transaction...");
      setLoading(true); // Set loading state at the start
      const encryptedPrivateKey = window.localStorage.getItem("encryptedPrivateKey");
      const data = {
        quantity: quantities[selectedAsset.contract],
        contractAddress: selectedAsset.contract,
        encryptedPrivateKey: encryptedPrivateKey,
      };

      console.log("Sending data to backend:", data);
      const response = await myServer.post("/sell/sellTransfer", data);
      console.log("Backend response:", response);

      if (response.status === 200) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        alert("Sell successful!");
        toast.success("Sell successful!", {
          style: { maxWidth: "300px", fontSize: "14px" },
        });
        setTimeout(() => {
          router.push("/decarb/contracts/sellassets");
        }, 3000);
      } else {
        console.error("Error from backend:", response);
        toast.error("Transaction failed. Please try again.", {
          duration: 4000,
          style: { maxWidth: "300px", fontSize: "14px" },
        });
      }
    } catch (error) {
      console.error("Sell transaction failed:", error);
      toast.error("Transaction failed. Please try again.", {
        duration: 4000,
        style: { maxWidth: "300px", fontSize: "14px" },
      });
    } 
  };

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Toaster /> {/* Add Toaster for toast notifications */}
      <div className="w-full mb-6 mt-5">
        <ActionSelection
          actionType="sell"
          project={selectedAsset?.project || ""}
          quantity={quantities[selectedAsset?.contract] || 0}
          price={selectedAsset ? selectedAsset.price * (quantities[selectedAsset.contract] || 0) : 0}
          contract={selectedAsset?.contract || ""}
          selectedItems={selectedAsset ? [{ id: selectedAsset.contract, selectedQuantity: quantities[selectedAsset.contract] || 0 }] : []}
          onAction={handleSell}
          backLink="/decarb/contracts" // Ensure this is a string
          primaryButtonText="SELL CHAR"
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
      <div>
        <div className="flex items-center justify-between p-2">
          <h1 className="text-lg font-bold text-gray-800">Available Carbon Assets for Sale</h1>
        </div>
        <ItemDisplay
          items={assetsForDisplay}
          headers={headers}
          quantityMode="input"
          bgColor="#C293FF"
          itemBgColor="#ECDDFF"
        />
      </div>
    </div>
  );
};

export default Page;