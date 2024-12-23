import React from 'react'
import SellAsset from '@/Components/Dashboard/Contracts/SellAssets/sellAsset'
import CurrentAssets from '@/Components/Dashboard/Contracts/SellAssets/Currentassets'
import { SellContextProvider } from '@/Components/context/SellContext'

const page = () => {
  return (
    <div>
        <SellContextProvider>
        <div className='w-full mb-6 mt-5'>
            <SellAsset/>
        </div>
        <CurrentAssets/>
        </SellContextProvider>
    </div>
  )
}

export default page