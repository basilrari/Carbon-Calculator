"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { myInstance } from '@/utils/Axios/axios';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { z } from 'zod';
import axios from 'axios';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
});

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13882", // Polygon Amoy Testnet Chain ID
  rpcTarget: "https://rpc.ankr.com/polygon_amoy",
  displayName: "Polygon Amoy Testnet",
  blockExplorerUrl: "https://www.oklink.com/amoy",
  ticker: "MATIC",
  tickerName: "Polygon",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId: "BPI5cUhq659hPghmNobHZT8c52Mpb4mlSrTTGIKWCw_nSUk1Wt5lEeBU6cLfgex0vpE57SfMy_F4vpWihcm7uOw", // Replace with your actual Web3Auth Client ID
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const Loginform = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleWeb3AuthLogin = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(true);
      toast.success("Web3Auth login successful!");
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