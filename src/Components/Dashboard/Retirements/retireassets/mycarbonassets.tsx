"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Individualasset from "./Individualasset";
import { chainConfig } from "@/utils/Config/chainConfig";

const erc20ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  }
];

const tokenContracts = [
  { address: "0xB297F730E741a822a426c737eCD0F7877A9a2c22", name: "North Pikounda REDD+" },
  { address: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81", name: "Panama Wind Energy Private Limited " }
];

const CurrentAssets: React.FC<any> = ({ onAggregatedData }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchBalances = async () => {
      const storedWallet = window.localStorage.getItem("walletAddress");
      if (!storedWallet) return;
      setWalletAddress(storedWallet);

      try {
        const provider = new ethers.JsonRpcProvider(chainConfig.rpcTarget);
        const balances = await Promise.all(
          tokenContracts.map(async (token, index) => {
            const contract = new ethers.Contract(token.address, erc20ABI, provider);
            const balance = await contract.balanceOf(storedWallet);
            return {
              id: index + 1,
              quantity: Number(ethers.formatUnits(balance, 18)),
              project: `${token.name} Carbon Credit`,
              price: 100,
              contract: token.address
            };
          })
        );
        setAssets(balances.filter(asset => asset.quantity > 0));
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchBalances();
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);

const handleSelectionChange = (updatedItem) => {
  setSelectedItems((prev) => {
    // Find existing item
    const existingIndex = prev.findIndex(item => item.id === updatedItem.id);

    let newSelection;
    if (existingIndex !== -1) {
      // If quantity is 0, remove item
      if (updatedItem.selectedQuantity === 0) {
        newSelection = prev.filter(item => item.id !== updatedItem.id);
      } else {
        // Update item
        newSelection = [...prev];
        newSelection[existingIndex] = updatedItem;
      }
    } else {
      // Add new item
      newSelection = [...prev, updatedItem];
    }

    // Calculate aggregated data
    const totalQuantity = newSelection.reduce((sum, item) => sum + item.selectedQuantity, 0);
    const totalPrice = newSelection.reduce((sum, item) => sum + item.price, 0);
    const selectedCount = newSelection.length;

    onAggregatedData({
      totalQuantity,
      totalPrice,
      selectedCount,
      selectedItems: newSelection,
    });

    return newSelection;
  });
};
    

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">My Carbon Assets (DCO2)</h1>
      <div className="bg-purple-100 rounded-lg p-6">
        <div className="flex flex-rows-3 gap-12 justify-between text-gray-500 font-bold text-sm pb-2 border-b border-gray-300">
          <div className="text-center">Available Quantity</div>
          <div className="px-10">Project Name</div>
          <div className="text-center">Select Quantity</div>
        </div>
        <div className="divide-y divide-gray-300 justify-between">
          {assets.map((asset) => (
            <div key={asset.id} >
              <Individualasset
                id={asset.id} // Pass id
                quantity={asset.quantity} // Pass quantity
                project={asset.project} // Pass project name
                // Pass price
                contract={asset.contract} // Pass contract
                onSelectionChange={handleSelectionChange} // Pass selection handler
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAssets;
