import React from 'react'
import BuyorSell from '@/Components/Dashboard/Contracts/BuyorSellComp'
import MyCarbonAssets from '@/Components/Dashboard/Contracts/mycarbasset'

const page = () => {
  return (
    

      <div>
        <div className='w-full mb-6 mt-5' >
          <BuyorSell/>
        </div>
        <div>
          <MyCarbonAssets/>
        </div>
      </div>
   

  )
}

export default page