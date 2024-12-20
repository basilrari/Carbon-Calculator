import React from 'react'
import BuyorSell from '@/Components/Dashboard/Contracts/BuyorSellComp'

const page = () => {
  return (
    <div className='flex-1 flex flex-col p-6 w-full'>
      <div className='text-2xl font-semibold pl-3 pt-2'>
        <h1>Contracts</h1>
      </div>

      <div className='w-full mb-6 mt-5' >
        <BuyorSell/>
      </div>
   </div>
  

  )
}

export default page