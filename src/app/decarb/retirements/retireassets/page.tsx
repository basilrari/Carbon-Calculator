"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import ItemDisplay from "@/Components/ItemDisplay";
import { z } from "zod";
import RetireHeader from "@/Components/Dashboard/Retirements/RetireHeader"; // Use RetireHeader instead of ActionSelection
import toast, { Toaster } from "react-hot-toast";
import myServer from "@/utils/Axios/axios";
import { useRouter } from "next/navigation";

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

const dummyWalletData = { amount: 100.0 };

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
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  const handleQuantityChange = (contract: string, value: string) => {
    const qty = parseInt(value) || 0;

    const hasOtherSelection = Object.entries(quantities).some(
      ([otherContract, otherQty]) => otherContract !== contract && otherQty > 0
    );

    if (hasOtherSelection) {
      alert("You can select only 1 item");
      setQuantities({});
      setSelectedAsset(null);
      return;
    }

    if (qty > 0) {
      const asset = dummyCarbonAssets.find((a) => a.contract === contract);
      if (asset) {
        setSelectedAsset({
          project: asset.project,
          price: asset.price,
          contract: contract,
        });
        setQuantities({ [contract]: qty > 3 ? 3 : qty < 1 ? 1 : qty });
      }
    } else {
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

  const handleRetire = async () => {
    if (!selectedAsset || !quantities[selectedAsset.contract] || quantities[selectedAsset.contract] <= 0) {
      toast.error("Please select a valid quantity before retiring.", {
        duration: 4000,
        style: { maxWidth: "300px", fontSize: "14px" },
      });
      return;
    }

    try {
      setLoading(true);
      const encryptedPrivateKey = window.localStorage.getItem("encryptedPrivateKey");
      const data = {
        name: "User Name", // Replace with actual user input or form data if needed
        recipientAddress: window.localStorage.getItem("walletAddress") || "",
        projectName: selectedAsset.project,
        amount: quantities[selectedAsset.contract],
        tokenAddress: selectedAsset.contract,
        encryptedPrivateKey: encryptedPrivateKey,
      };

      const response = await myServer.post("/retire/retireCarbonCredits", data);
      if (response.status === 200) {
        toast.success("Retirement successful!", {
          style: { maxWidth: "300px", fontSize: "14px" },
        });
        setTimeout(() => router.push("/decarb/retirements"), 3000);
      } else {
        toast.error("Retirement failed. Please try again.");
      }
    } catch (error) {
      console.error("Retirement failed:", error);
      toast.error("Retirement failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Toaster />
      <div className="w-full mb-6 mt-5">
        <RetireHeader
          totalQuantity={quantities[selectedAsset?.contract] || 0}
          selectedCount={selectedAsset ? 1 : 0} // Assuming only one asset can be selected
          contractAddress={selectedAsset?.contract || ""}
          project={selectedAsset?.project || "N/A"} // Pass the project name dynamically
        />
      </div>
      <div>
        <div className="flex items-center justify-between p-2">
          <h1 className="text-lg font-bold text-gray-800">Available Carbon Assets for Retirement</h1>
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