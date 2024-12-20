import Image from "next/image";
import React from "react";

const WalletConnect = () => {
  return (
    <div className="flex items-center p-32 justify-center h-auto">
      <div className=" bg-white bg-opacity-50 rounded-lg shadow-lg p-8 space-y-6 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Connect Your Wallet
        </h1>

        <div className="space-y-4">
          <button className="flex items-center space-x-4 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <Image
              src="/images/metamask.png"
              alt="MetaMask Logo"
              width={32}
              height={32}
            />
            <span className="text-gray-700 font-medium">MetaMask</span>
          </button>

        
          <button className="flex items-center space-x-4 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <Image
              src="/images/coinbase.png"
              alt="Coinbase Wallet Logo"
              width={32}
              height={32}
            />
            <span className="text-gray-700 font-medium">Coinbase Wallet</span>
          </button>

          <button className="flex items-center space-x-4 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <Image
              src="/images/rainbow.png"
              alt="Rainbow Wallet Logo"
              width={32}
              height={32}
            />
            <span className="text-gray-700 font-medium">Rainbow</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">Protected By Privy</p>
      </div>
    </div>
  );
};

export default WalletConnect;
