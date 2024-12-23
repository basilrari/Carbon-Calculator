import React from 'react'
import SellAsset from '@/Components/Dashboard/Contracts/SellAssets/sellAsset'
import CurrentAssets from '@/Components/Dashboard/Contracts/SellAssets/Currentassets'
import { SellContextProvider } from '@/Components/context/SellContext'

const page = () => {
  return (
    <div>
        <SellContextProvider>
        <SellAsset/>
        <CurrentAssets/>
        </SellContextProvider>
    </div>
  )
}

export default page