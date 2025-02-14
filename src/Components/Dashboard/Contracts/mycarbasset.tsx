"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { carbonAssetArray } from "@/types/global.types";
import Carbonasset from "./carbonasset";
import Link from "next/link";
import { chainConfig } from "@/utils/Config/chainConfig";

const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

const tokenContracts = [
  { address: "0xB297F730E741a822a426c737eCD0F7877A9a2c22", name: "North Pikounda REDD+" },
  { address: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81", name: "Panama Wind Energy Private Limited" },
];



type MyCarbonAssetsProps = {
  carbonAssets: carbonAssetArray;
};

const MyCarbonAssets: React.FC<MyCarbonAssetsProps> = ({ carbonAssets }) => {
  const [isCurrent, setIsCurrent] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletAssets, setWalletAssets] = useState<any[]>([]);

  

  useEffect(() => {
    const fetchBalances = async () => {
      const storedWallet = window.localStorage.getItem("walletAddress");
      if (!storedWallet) return;
      setWalletAddress(storedWallet);

      try {
        const provider = new ethers.JsonRpcProvider(chainConfig.rpcTarget);
        const balances = await Promise.all(
          tokenContracts.map(async (token) => {
            const contract = new ethers.Contract(token.address, erc20ABI, provider);
            const balance = await contract.balanceOf(storedWallet);

            return {
              id: token.address,
              date: new Date().toISOString().split("T")[0],
              quantity: parseFloat(ethers.formatUnits(balance, 18)),
              project: `${token.name}`,
              price: 100, // Placeholder price
              status: "current",
            };
          })
        );
        setWalletAssets(balances);
      } catch (error) {
        console.error("Error fetching wallet assets:", error);
      }
    };

    fetchBalances();
  }, []);

 

  const allAssets = [ ...walletAssets]; // Combine user and wallet assets

  const filteredAssets = allAssets.filter(
    (asset) => asset.status === (isCurrent ? "current" : "sold")
  );

  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <h1 className="text-lg font-bold text-gray-800">My Carbon Assets (DCO2)</h1>
      </div>

      <div className="bg-purple-100 rounded-lg p-6 space-y-6">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          
        </div>

        <div className="space-y-4">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset, index) => (
              <Carbonasset
                key={index}
                date={asset.date}
                quantity={asset.quantity}
                project={
                  <div className="group text-left">
                    <Link
                      href={`/decarb/project/${encodeURIComponent(asset.project)}`}
                      className="text-black hover:underline inline-flex items-center"
                    >
                      {asset.project}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
                        ↗
                      </span>
                    </Link>
                  </div>
                }
                price={asset.price}
                status={asset.status}
              />
            ))
          ) : (
            <div className="text-gray-500">
              You have no {isCurrent ? "current" : "sold"} assets
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCarbonAssets;
