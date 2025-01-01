"use client"
import React from 'react'
import MyCarbAssets from './mycarbonassets'
import { useState } from 'react'
import { AggregateDataProps } from '@/types/global.types'
import RetireAsset from './retireAsset'

const MainRetireComponent = () => {

  const [ aggregatedData, setAggregatedData ] = useState<AggregateDataProps>()
  
  return (
    <div>
        <div className='text-2xl font-semibold pl-3 pt-2'>
                <h1>Retirements</h1>
            </div>
        <div className='w-full mb-6 mt-5'>
          <RetireAsset totalQuantity={aggregatedData?.totalQuantity} totalPrice={aggregatedData?.totalPrice} selectedCount={aggregatedData?.selectedCount}/>
        </div>
         <div>
            <MyCarbAssets onAggregatedData={(data) => setAggregatedData(data)}/>
        </div>
    </div>

  )
}

export default MainRetireComponent