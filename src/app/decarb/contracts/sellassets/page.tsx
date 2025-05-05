"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ItemDisplay from "@/Components/ItemDisplay";
import { z } from "zod";
import ActionSelection from "@/Components/ActionSelection";
import toast, { Toaster } from "react-hot-toast";
import myServer from "@/utils/Axios/axios";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/Components/LoadingAnimation";
import { chainConfig } from "@/utils/Config/chainConfig";

// ERC20 ABI for balanceOf function
const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// Define schemas for validation using zod
const carbonAssetSchema = z.object({
  date: z.string(),
  project: z.string(),
  price: z.number(),
  contract: z.string(),
  balance: z.number(), // Added balance field
});

const carbonAssetArraySchema = z.array(carbonAssetSchema);

// Carbon assets data (initially with balance 0, updated by fetchBalances)
const carbonAssetsData = [
  {
    date: "2025-02-08",
    project: "North Pikounda REDD+",
    price: 2500,
    contract: "0xB297F730E741a822a426c737eCD0F7877A9a2c22",
    balance: 0,
  },
  {
    date: "2025-02-08",
    project: "Panama Wind Energy Private Limited",
    price: 4000,
    contract: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81",
    balance: 0,
  },
];

// Validate carbon assets data
const validatedCarbonAssets = carbonAssetArraySchema.safeParse(carbonAssetsData);

if (!validatedCarbonAssets.success) {
  console.error("Invalid carbon assets data:", validatedCarbonAssets.error?.errors);
}

type CarbonAsset = {
  date: string;
  project: string;
  price: number;
  contract: string;
  balance: number;
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
    balance: number;
  } | null>(null);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [carbonAssets, setCarbonAssets] = useState<CarbonAsset[]>(carbonAssetsData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch tokenTuebalances
  useEffect(() => {
    const fetchBalances = async () => {
      const storedWallet = window.localStorage.getItem("walletAddress");
      if (!storedWallet) {
        toast.error("No wallet address found. Please connect your wallet.", {
          duration: 4000,
          style: { maxWidth: "300px", fontSize: "14px" },
        });
        return;
      }
      setWalletAddress(storedWallet);

      try {
        const provider = new ethers.JsonRpcProvider(chainConfig.rpcTarget);
        const updatedAssets = await Promise.all(
          carbonAssets.map(async (asset) => {
            const contract = new ethers.Contract(asset.contract, erc20ABI, provider);
            const balance = await contract.balanceOf(storedWallet);
            return {
              ...asset,
              balance: parseFloat(ethers.formatUnits(balance, 18)),
            };
          })
        );
        setCarbonAssets(updatedAssets);
        console.log("Token balances fetched:", updatedAssets);
      } catch (error) {
        console.error("Error fetching token balances:", error);
        toast.error("Failed to fetch token balances. Please try again.", {
          duration: 4000,
          style: { maxWidth: "300px", fontSize: "14px" },
        });
      }
    };

    fetchBalances();
  }, []);

  const handleQuantityChange = (contract: string, value: string) => {
    const qty = parseInt(value) || 0; // Default to 0 if invalid or empty
    const asset = carbonAssets.find((a) => a.contract === contract);

    if (!asset) return; // Exit if asset not found

    console.log("handleQuantityChange - contract:", contract, "value:", value, "qty:", qty);

    // Check if another asset already has a quantity > 0
    const hasOtherSelection = Object.entries(quantities).some(
      ([otherContract, otherQty]) => otherContract !== contract && otherQty > 0
    );

    if (hasOtherSelection) {
      toast.error("You can select only 1 item.", {
        duration: 4000,
        style: { maxWidth: "300px", fontSize: "14px" },
      });
      setQuantities({});
      setSelectedAsset(null);
      return;
    }

    // Validate quantity against token balance
    if (qty > asset.balance) {
      toast.error(`Selected quantity (${qty}) exceeds your balance (${asset.balance}) for ${asset.project}.`, {
        duration: 4000,
        style: { maxWidth: "300px", fontSize: "14px" },
      });
      return;
    }

    if (qty > 0) {
      // Set this asset as selected and limit quantity to 1-3
      setSelectedAsset({
        project: asset.project,
        price: asset.price,
        contract: contract,
        balance: asset.balance,
      });
      setQuantities({ [contract]: qty > 3 ? 3 : qty < 1 ? 1 : qty });
    } else {
      // If quantity is 0 or empty, deselect this asset
      setSelectedAsset(null);
      setQuantities((prev) => ({ ...prev, [contract]: 0 }));
    }
  };

  const assetsForDisplay = validatedCarbonAssets.success
    ? carbonAssets.map((asset) => ({
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

  // Handle sell action logic
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

    // Validate quantity against token balance
    if (quantities[selectedAsset.contract] > selectedAsset.balance) {
      console.log("Validation failed - selected quantity exceeds balance");
      toast.error(
        `Selected quantity (${quantities[selectedAsset.contract]}) exceeds your balance (${selectedAsset.balance}) for ${selectedAsset.project}.`,
        {
          duration: 4000,
          style: { maxWidth: "300px", fontSize: "14px" },
        }
      );
      return;
    }

    try {
      console.log("Starting sell transaction...");
      setLoading(true);
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
        console.log("Sell successful!");
        toast.success("Sell successful!", {
          style: { maxWidth: "300px", fontSize: "14px" },
        });
        setTimeout(() => {
          router.push("/decarb/contracts");
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative ${loading ? "pointer-events-none" : ""}`}>
      <Toaster />
      {loading && <LoadingOverlay type="sell" />}
      <div className="w-full mb-6 mt-5">
        <ActionSelection
          actionType="sell"
          project={selectedAsset?.project || ""}
          quantity={quantities[selectedAsset?.contract] || 0}
          price={selectedAsset ? selectedAsset.price * (quantities[selectedAsset.contract] || 0) : 0}
          contract={selectedAsset?.contract || ""}
          selectedItems={selectedAsset ? [{ id: selectedAsset.contract, selectedQuantity: quantities[selectedAsset.contract] || 0 }] : []}
          onAction={handleSell}
          backLink="/decarb/contracts"
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