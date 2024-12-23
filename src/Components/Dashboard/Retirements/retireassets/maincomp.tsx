import React from 'react'
import MyCarbAssets from './mycarbonassets'
import { useState } from 'react'
import { AggregatedDataProps } from './mycarbonassets'

const MainRetireComponent = () => {

  const [ aggregatedData, setAggregatedData] = useState<AggregatedDataProps>()
  

  return (
    <div>
        <div>

        </div>
         <div>
            <MyCarbAssets onAggregatedData={(data) => setAggregatedData(data)}/>
        </div>
        </div>
  )
}

export default MainRetireComponent