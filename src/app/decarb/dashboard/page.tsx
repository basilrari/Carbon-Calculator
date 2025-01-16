"use client"
import React, { useEffect, useState } from 'react';
import StatsCard from "@/Components/Dashboard/Overview/carbondetail";
import LearnCardsContainer from "@/Components/Dashboard/Overview/learncontainer";

const page = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const statsData = [
    { value: "135", label: "Total Carbon Locked" },
    { value: "$16000", label: "Total Liquidity" },
    { value: "42", label: "Total Carbon Retired" },
  ];

  useEffect(() => {
    // Check if the wallet address is stored in local storage
    const storedWalletAddress = window.localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      console.log("Wallet Address Fetched : ", storedWalletAddress);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col p-6 w-full">
      <h1 className="text-2xl font-semibold pl-3 pt-2">Overview</h1>
      <div className="w-full mb-6 mt-5">
        <StatsCard stats={statsData} />
      </div>
      <div className="absolute bottom-6 w-auto">
        <LearnCardsContainer />
      </div>
    </div>
  );
};

export default page;
