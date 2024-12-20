import React from 'react';
import WalletConnect from '@/Components/Dashboard/Wallet/wallet';

const page = () => {
  return (
    <div 
      className=" flex flex-col p-6 w-full bg-cover bg-center" 
      style={{ backgroundImage: "url('/images/background.jpg')" }} // Replace with your image path
    >    
      <h1 className="text-2xl font-semibold pl-3 pt-2 text-black">Wallet</h1>   
      <div className="w-full mt-8">
        <WalletConnect />
      </div>
    </div>
  );
};

export default page;
