"use client";

import React, { useState } from "react";
import { ethers } from "ethers"; // Added for potential future use if needed
import ItemDisplay from "@/Components/ItemDisplay"; // Adjust the import path as needed
import { z } from "zod";
import ActionSelection from "@/Components/ActionSelection"; // Use ActionSelection
import toast, { Toaster } from "react-hot-toast"; // Ensure toast is imported
import myServer from "@/utils/Axios/axios";

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
  price: number;
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
        project: dummyCarbonAssets.find((a) => a.contract === contract)?.project || "",
        price: dummyCarbonAssets.find((a) => a.contract === contract)?.price || 0,
        contract,
      });
      setQuantities({ [contract]: qty > 3 ? 3 : qty < 1 ? 1 : qty }); // Limit to 1-3
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

  // Handle buy action logic with Razorpay integration from BuyCharComponent
  const handleBuy = async () => {
    if (!selectedAsset || !quantities[selectedAsset.contract]) {
      toast.error("Please select a quantity before buying.", {
        duration: 4000,
        style: { maxWidth: "300px", fontSize: "14px" },
      });
      return;
    }

    try {
      const apiKey = "rzp_test_74fvUBAvMzsdVl"; // Replace with actual key
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = async () => {
        const quantity = quantities[selectedAsset.contract]; // Define quantity here
        const price = selectedAsset.price * quantity; // Calculate total price
        const options = {
          key: apiKey,
          amount: Math.round(Number(price) * 100),
          currency: "INR",
          name: "DeCarb",
          description: `Purchase ${quantity} units of ${selectedAsset.project}`,
          image: "/images/decarbtoken.png",
          theme: { color: "#2F4F4F" },
          handler: async function (response: any) {
            console.log("Payment response:", response);
            try {
              const backendResponse = await myServer.get("/buy/buyTest", {
                params: {
                  amount: price,
                  quantity,
                  project: selectedAsset.project,
                  paymentId: response.razorpay_payment_id,
                },
              });

              if (backendResponse.status === 200) {
                const walletAddress = window.localStorage.getItem("walletAddress");
                const data = {
                  quantity,
                  tokenAddress: selectedAsset.contract,
                  toAddress: walletAddress,
                };
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const response = await myServer.post("/buy/buyTokens", data);

                setLoading(false);
                setProcessingPayment(false);
                toast.success("Token Purchase successful!", {
                  duration: 4000,
                  style: { maxWidth: "300px", fontSize: "14px" },
                });
              } else {
                toast.error("Payment was successful, but order processing failed.", {
                  duration: 4000,
                  style: { maxWidth: "300px", fontSize: "14px" },
                });
              }
            } catch (error) {
              toast.error("Payment successful, but order processing failed.", {
                duration: 4000,
                style: { maxWidth: "300px", fontSize: "14px" },
              });
            } finally {
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          },
          modal: { ondismiss: () => setLoading(false) },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.open();
      };

      document.body.appendChild(script);
    } catch (error) {
      toast.error("Error initiating payment. Please try again.", {
        style: { maxWidth: "300px", fontSize: "14px" },
      });
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Toaster /> {/* Add Toaster for toast notifications */}
      <div className="w-full mb-6 mt-5">
        <ActionSelection
          actionType="buy"
          project={selectedAsset?.project || ""}
          quantity={quantities[selectedAsset?.contract] || 0}
          price={selectedAsset ? selectedAsset.price * (quantities[selectedAsset.contract] || 0) : 0}
          contract={selectedAsset?.contract || ""}
          onAction={handleBuy}
          backLink="/decarb/contracts" // Ensure this is a string
          primaryButtonText="BUY CHAR"
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
      <div>
        <div className="flex items-center justify-between p-2">
          <h1 className="text-lg font-bold text-gray-800">Available Carbon Assets</h1>
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