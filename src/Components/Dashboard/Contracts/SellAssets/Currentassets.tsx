"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  { address: "0xB297F730E741a822a426c737eCD0F7877A9a2c22", name: "North Pikounda REDD+", price: 2375 },
  { address: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81", name: "Panama Wind Energy Private Limited", price: 3800 }
];

const CurrentAssets: React.FC<any> = ({ onAggregatedData }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [assets, setAssets] = useState([]);
  

  useEffect(() => {
    const fetchBalances = async () => {
      const storedWallet = window.localStorage.getItem("walletAddress");
      if (!storedWallet) return;
      setWalletAddress(storedWallet);
      console.log("Stored wallet address:", storedWallet);

      try {
        const provider = new ethers.JsonRpcProvider(chainConfig.rpcTarget);
        console.log("Connected to provider:", provider);

        const balances = await Promise.all(
          tokenContracts.map(async (token) => {
            console.log("Fetching balance for:", token.name);
            const contract = new ethers.Contract(token.address, erc20ABI, provider);
            const balance = await contract.balanceOf(storedWallet);
            console.log(`Balance for ${token.name}:`, ethers.formatUnits(balance, 18));

            return {
              id: token.address,
              date: new Date().toISOString().split("T")[0],
              quantity: ethers.formatUnits(balance, 18),
              project: `${token.name} `,
              price: '₹$token.price}' 
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

  const handleSelectionChange = useCallback((item) => {
    setSelectedItems((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      const updated = item.selectedQuantity > 0 ? [...filtered, item] : filtered;
  
      const totalQuantity = updated.reduce((sum, i) => sum + i.selectedQuantity, 0);
      const totalPrice = updated.reduce((sum, i) => sum + i.price, 0);
  
      onAggregatedData({
        totalQuantity,
        totalPrice,
        selectedCount: updated.length,
        selectedItems: updated, // Include selected items
      });
  
      return updated;
    });
  }, []);
  

  return (
    <div>
      <h1 className="text-lg font-semibold p-2">My Carbon Assets (DCO2)</h1>
      <div className="bg-purple-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          <div>Sell</div>
          
          
        </div>
        <div className="space-y-4">
          {assets.map((asset) => (
            <Individualasset key={asset.id} {...asset} onSelectionChange={handleSelectionChange} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAssets;