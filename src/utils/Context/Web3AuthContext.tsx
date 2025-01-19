// Web3AuthContext.tsx
"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { chainConfig } from '@/utils/Config/chainConfig'; // Adjust the path as needed

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId: "BPI5cUhq659hPghmNobHZT8c52Mpb4mlSrTTGIKWCw_nSUk1Wt5lEeBU6cLfgex0vpE57SfMy_F4vpWihcm7uOw", // Replace with your actual Web3Auth Client ID
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

interface IWeb3AuthContext {
  provider: IProvider | null;
  loggedIn: boolean;
  handleLogin: () => Promise<void>;
}

export const Web3AuthContext = createContext<IWeb3AuthContext | null>(null);

export const Web3AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        if (web3auth.connected) {
          setLoggedIn(true);
          const web3authProvider = web3auth.provider;
          if (web3authProvider) {
            setProvider(web3authProvider);
            const accounts = await web3authProvider.request({ method: "eth_accounts" });
            if (accounts && accounts.length > 0) {
              console.log("Wallet Address:", accounts[0]);
              window.localStorage.setItem('walletAddress', accounts[0]);
              // Optionally fetch private key here
            }
          }
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      }
    };
    init();
  }, []);

  const handleLogin = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(true);
      const accounts = await web3authProvider.request({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        console.log("Wallet Address:", accounts[0]);
        window.localStorage.setItem('walletAddress', accounts[0]);
        // Optionally fetch private key here
      }
    } catch (error) {
      console.error("Failed to connect Web3Auth:", error);
    }
  };

  return (
    <Web3AuthContext.Provider value={{ provider, loggedIn, handleLogin }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export function useWeb3Auth(): IWeb3AuthContext {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
  }
  return context;
}