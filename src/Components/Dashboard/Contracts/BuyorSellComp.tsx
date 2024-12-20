"use client"
import React from 'react';
import MyButton from '../MyButton';
import { useRouter } from 'next/navigation';

const BuyorSell = () => {
  const router = useRouter();

  const handleBuy = () => {
    router.push('/buy');
  };

  const handleSell = () => {
    router.push('/sell');
  };

  return (
    <div className="flex items-center justify-between p-6 border rounded-lg shadow-md bg-white w-full mx-auto">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <img
          src="/images/decarbtoken.png"
          alt="Token"
          className="w-12 h-12"
        />
        <div>
          <h5 className="text-sm font-medium text-gray-600">
            DeCarb BioChar Carbon Pool (CHAR)
          </h5>
          <h2 className="text-2xl font-bold text-gray-900">$16.67</h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex space-x-4">
        <MyButton
          variant="green"
          text="BUY CHAR"
          onClick={handleBuy}
          
        />
        <MyButton
          variant="yellow"
          text="SELL CHAR"
          onClick={handleSell}
          
        />
      </div>
    </div>
  );
};

export default BuyorSell;
