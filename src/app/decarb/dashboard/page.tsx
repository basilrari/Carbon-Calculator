"use client"
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { chainConfig } from '@/utils/Config/chainConfig'; // Adjust path as necessary
import StatsCard from '@/Components/Dashboard/overview/carbondetail';
import LearnCardsContainer from '@/Components/Dashboard/overview/learncontainer';
import ImageComponent from '@/Components/Dashboard/overview/ImageComponent';
import BuyCharComp from '@/Components/Dashboard/overview/BuyCharComp';
import DiscoverComp from '@/Components/Dashboard/overview/DiscoverComp';
import Image from 'next/image';



// ERC-20 ABI for balance checking
const erc20ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  }
];

// Example contract addresses - Replace these with actual addresses from Celo Testnet
const nctAddress = '0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81'; // Wind based power generation by Panama Wind Energy Private Limited IN, Maharashtra, India
const tco2Address = '0xB297F730E741a822a426c737eCD0F7877A9a2c22'; // North Pikounda REDD+

const page = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [carbonCredits, setCarbonCredits] = useState<{ nct: string, tco2: string }>({ nct: '0', tco2: '0' });
  const statsData = [
    { value: "135", label: "Total Carbon Locked" },
    { value: "₹16000", label: "Total Liquidity" },
    { value: "42", label: "Total Carbon Retired" },
  ];

  useEffect(() => {
    const fetchWalletData = async () => {
      const storedWalletAddress = window.localStorage.getItem('walletAddress');
      if (storedWalletAddress) {
        setWalletAddress(storedWalletAddress);
        console.log("Wallet Address:", storedWalletAddress);

        try {
          // Initialize Web3 with the RPC of your chain
          const web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.rpcTarget));
          // Fetch CELO balance
          const balanceWei = await web3.eth.getBalance(storedWalletAddress);
          const balanceCelo = web3.utils.fromWei(balanceWei, 'ether');
          setWalletBalance(balanceCelo);
          console.log("Wallet Balance:", balanceCelo, "CELO");

          // Check for Carbon Credits (NCT and TCO2)
          const nctContract = new web3.eth.Contract(erc20ABI, nctAddress);
          const tco2Contract = new web3.eth.Contract(erc20ABI, tco2Address); // Here you might want to check multiple TCO2 contracts

          const nctBalance = await nctContract.methods.balanceOf(storedWalletAddress).call();
          const tco2Balance = await tco2Contract.methods.balanceOf(storedWalletAddress).call();

          setCarbonCredits({
            nct: web3.utils.fromWei(nctBalance, 'ether'), // Assuming 18 decimals, adjust if different
            tco2: web3.utils.fromWei(tco2Balance, 'ether') // Same assumption for TCO2
          });

          console.log("NCT Carbon Credits:", web3.utils.fromWei(nctBalance, 'ether'));
          console.log("TCO2 Carbon Credits:", web3.utils.fromWei(tco2Balance, 'ether'));

        } catch (error) {
          console.error("Failed to fetch wallet data:", error);
        }
      }
    };

    fetchWalletData();
  }, []);

  return (
    <div className="flex-1 flex flex-col p-6 w-full">

      
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-semibold pl-3 pt-2">Welcome, Basil </h1>
        <div className='overflow-hidden rounded-full w-12 h-12'>
          <Image src="/images/greenbg.png" alt="image" height={48} width={48} className='object-cover w-full h-full'/>
          </div> 
      </div>



      <div className="w-full mb-6 mt-5">
        <StatsCard stats={statsData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 w-full mx-auto ">
      <div>
         <DiscoverComp/>
         <ImageComponent />
      </div>
      
      <div ><BuyCharComp /></div>
     </div>
      <div className=" w-auto">
        <LearnCardsContainer />
      </div>
    </div>
  );
};

export default page;