import React from 'react'
import SellAsset from '@/Components/Dashboard/Contracts/SellAssets/sellAsset'
import CurrentAssets from '@/Components/Dashboard/Contracts/SellAssets/Currentassets'

const page = () => {
  return (
    <div>
        <div className='w-full mb-6 mt-5'>
            <SellAsset/>
        </div>
        <CurrentAssets/>
    </div>
  )
}

export default page