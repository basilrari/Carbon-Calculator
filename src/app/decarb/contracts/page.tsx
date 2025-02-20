"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ItemDisplay from "@/Components/ItemDisplay"; // Adjust the import path as needed
import { chainConfig } from "@/utils/Config/chainConfig";
import ActionSelection from "@/Components/ActionHeader";
import Link from "next/link";

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
  {
    address: "0xB297F730E741a822a426c737eCD0F7877A9a2c22",
    name: "North Pikounda REDD+",
  },
  {
    address: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81",
    name: "Panama Wind Energy Private Limited",
  },
];

// Dummy price for CHAR
const charPrice = 150;

type CarbonAsset = {
  Quantity: number;
  Project: string;
};

const Page = () => {
  const [isCurrent, setIsCurrent] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletAssets, setWalletAssets] = useState<CarbonAsset[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      const storedWallet = window.localStorage.getItem("walletAddress");
      if (!storedWallet) return;
      setWalletAddress(storedWallet);

      try {
        const provider = new ethers.JsonRpcProvider(chainConfig.rpcTarget);
        const balances = await Promise.all(
          tokenContracts.map(async (token) => {
            const contract = new ethers.Contract(
              token.address,
              erc20ABI,
              provider
            );
            const balance = await contract.balanceOf(storedWallet);

            return {
              Quantity: parseFloat(ethers.formatUnits(balance, 18)),
              Project: token.name,
            };
          })
        );
        setWalletAssets(balances);
        console.log("Wallet assets fetched:", balances);
      } catch (error) {
        console.error("Error fetching wallet assets:", error);
      }
    };

    fetchBalances();
  }, []);

  const headers = ["Quantity", "Project"];

  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <ActionSelection
          price={2375} // e.g., 2375
          primaryAction={{
            text: "BUY CHAR",
            href: "/decarb/contracts/buyassets",
          }}
          secondaryAction={{
            text: "SELL CHAR",
            href: "/decarb/contracts/sellassets",
          }}
        />
      </div>
      <div>
        <div className="flex items-center justify-between p-2">
          <h1 className="text-lg font-bold text-gray-800">
            My Carbon Assets (DCO2)
          </h1>
        </div>
        <ItemDisplay
          items={walletAssets.map((asset) => ({
            Quantity: asset.Quantity,
            Project: (
              <Link
                href={`/decarb/project/${encodeURIComponent(asset.Project)}`} className="group inline-flex items-center">
                <span className="text-black group-hover:underline relative cursor-pointer">
                  {asset.Project}
                  <span className="inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
                    ↗
                  </span>
                </span>
              </Link>
            ),
          }))}
          headers={headers}
          quantityMode="display" // Set to 'display' since quantities are shown as text, not inputs
          bgColor="#C293FF" // Light blue background for the table container (10% opacity will be applied)
          itemBgColor="#ECDDFF" // Teal background for item boxes (full opacity)
        />
      </div>
    </div>
  );
};

export default Page;
