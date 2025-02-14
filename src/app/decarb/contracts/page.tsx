import React from 'react';
import BuyorSell from '@/Components/Dashboard/Contracts/BuyorSellComp';
import MyCarbonAssets from '@/Components/Dashboard/Contracts/mycarbasset';



// Dummy price for CHAR
const charPrice = 150;

const Page = () => {
  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <BuyorSell price={charPrice} />
      </div>
      <div>
        <MyCarbonAssets  />
      </div>
    </div>
  );
};

export default Page;
