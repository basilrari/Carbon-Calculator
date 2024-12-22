import React from 'react'
import BuyCharComponent from '@/Components/Dashboard/Contracts/BuyAssets/buyAsset'
import MyAssets from '@/Components/Dashboard/Contracts/BuyAssets/myassets'

const page = () => {
  return (
    <div >
      <div className='w-full mb-6 mt-5' >
        <BuyCharComponent/>
      </div>

      <div>
        <MyAssets/>
      </div>
   </div>
  

  )
}

export default page