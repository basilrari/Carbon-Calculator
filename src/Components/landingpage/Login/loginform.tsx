"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Web3Auth } from '@web3auth/modal';
import { IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { chainConfig } from '@/utils/Config/chainConfig';

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId: "BPI5cUhq659hPghmNobHZT8c52Mpb4mlSrTTGIKWCw_nSUk1Wt5lEeBU6cLfgex0vpE57SfMy_F4vpWihcm7uOw", // Replace with your actual Web3Auth Client ID
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const Loginform = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        if (web3auth.connected) {
          setLoggedIn(true);
          setProvider(web3auth.provider);
          const accounts = await web3auth.provider?.request({ method: "eth_accounts" });
          const privateKey = await web3auth.provider?.request({
            method: "eth_private_key"
          });
          if (accounts && accounts.length > 0) {
            console.log("Wallet Address Login:", accounts[0]);
            console.log("Private Key:", privateKey);
            // Store wallet address in local storage
            window.localStorage.setItem('walletAddress', accounts[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const handleWeb3AuthLogin = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(true);
      toast.success("Web3Auth login successful!");

      // Fetch wallet address
      const accounts = await web3authProvider?.request({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        console.log("Wallet Address:", accounts[0]);
        // Store wallet address in local storage
        window.localStorage.setItem('walletAddress', accounts[0]);
      }

      router.push('/decarb/dashboard'); // Redirect or perform other actions
    } catch (error) {
      console.error("Failed to connect Web3Auth:", error);
      toast.error("Failed to connect Web3Auth");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="border bg-white bg-opacity-70 p-6 rounded-lg shadow-md w-80">
        <button
          type="button"
          onClick={handleWeb3AuthLogin}
          className="w-full bg-[#2F4F4F] font-medium text-white p-2 mt-1.5 rounded-md hover:bg-cyan-700 transition"
        >
          Login with Web3
        </button>
      </div>
    </div>
  );
};

export default Loginform;
