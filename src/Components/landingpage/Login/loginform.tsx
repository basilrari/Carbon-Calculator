"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Web3Auth } from '@web3auth/modal';
import { IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { chainConfig } from '@/utils/Config/chainConfig';
import myServer from '@/utils/Axios/axios';

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId: "BPI5cUhq659hPghmNobHZT8c52Mpb4mlSrTTGIKWCw_nSUk1Wt5lEeBU6cLfgex0vpE57SfMy_F4vpWihcm7uOw", // Replace with your actual Web3Auth Client ID
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const Loginform = () => {
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        if (web3auth.connected) {
          console.log("Web3Auth connected!");
          setLoggedIn(true);
          setProvider(web3auth.provider);
          const accounts = await web3auth.provider?.request({ method: "eth_accounts" });
          const privateKey = await web3auth.provider?.request({
            method: "eth_private_key"
          });
          if (accounts && accounts.length > 0 && privateKey) {
            console.log("Wallet Address Login:", accounts[0]);
            console.log("Private Key:", privateKey);

            // Ensure successful storage before proceeding
            const success = await handleEncryptionAndStorage(privateKey, accounts[0]);
            if (!success) {
              throw new Error("Failed to store private key or wallet address");
            }
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
      const privateKey = await web3authProvider?.request({ method: "eth_private_key" });
      if (accounts && accounts.length > 0 && privateKey) {
        console.log("Wallet Address:", accounts[0]);

        // Ensure successful storage before proceeding
        const success = await handleEncryptionAndStorage(privateKey, accounts[0]);
        if (!success) {
          throw new Error("Failed to store private key or wallet address");
        }

        router.push('/decarb/dashboard'); // Redirect only if storage is successful
      }
    } catch (error) {
      console.error("Failed to connect Web3Auth:", error);
      toast.error("Failed to connect Web3Auth or store data");
    }
  };

  const fetchPublicKey = async () => {
    const response = await myServer.get('/encryption/getPublicKey');
    if (response.status !== 200) {
      throw new Error('Failed to fetch public key');
    }
    const { publicKey } = await response.data;
    console.log("Public Key:", publicKey);
    return publicKey;
  };

  const encryptPrivateKey = async (privateKey, publicKey) => {
    // Import the public key
    const publicKeyObj = await crypto.subtle.importKey(
      'spki',
      pemToArrayBuffer(publicKey),
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" }
      },
      false,
      ["encrypt"]
    );

    // Encrypt the private key
    const encodedPrivateKey = new TextEncoder().encode(privateKey);
    const encrypted = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      publicKeyObj,
      encodedPrivateKey
    );

    return arrayBufferToBase64(encrypted);
  };

  function pemToArrayBuffer(pem) {
    const b64Lines = pem.replace(/(-----(BEGIN|END) PUBLIC KEY-----|\n)/g, '');
    const b64 = b64Lines.replace(/\s+/g, '');
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  const handleEncryptionAndStorage = async (privateKey, walletAddress) => {
    try {
      console.log("Encrypting and storing private key...");
      const publicKey = await fetchPublicKey();
      const encryptedPrivateKey = await encryptPrivateKey(privateKey, publicKey);
      console.log("Encrypted Private Key:", encryptedPrivateKey);

      // Store both encrypted private key and wallet address
      window.localStorage.setItem('encryptedPrivateKey', encryptedPrivateKey);
      window.localStorage.setItem('walletAddress', walletAddress);

      // Verify storage
      const storedKey = window.localStorage.getItem('encryptedPrivateKey');
      const storedAddress = window.localStorage.getItem('walletAddress');

      if (!storedKey || !storedAddress) {
        throw new Error("Storage verification failed");
      }

      console.log("Private key and wallet address encrypted and stored successfully!");
      return true;
    } catch (error) {
      console.error("Encryption or storage failed:", error);
      toast.error("Failed to encrypt or store private key or wallet address");
      return false;
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