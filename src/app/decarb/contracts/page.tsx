import React from 'react'
import BuyorSell from '@/Components/Dashboard/Contracts/BuyorSellComp'
import Carbonasset from '@/Components/Dashboard/Contracts/carbasset'

const page = () => {
  return (
    <div className='flex-1 flex flex-col p-6 w-full'>
      <div className='text-2xl font-semibold pl-3 pt-2'>
        <h1>Contracts</h1>
      </div>

      <div className='w-full mb-6 mt-5' >
        <BuyorSell/>
      </div>

      <div><Carbonasset date='24 January 2024' price={754} quantity={343} project='zfzf' status={true}/></div>
   </div>
  

  )
}

export default page