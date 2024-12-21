import React from 'react'
import RetirementComp from '@/Components/Dashboard/Retirements/RetireComp'
import MyRetirements from '@/Components/Dashboard/Retirements/MyRetirements'

const page = () => {
  return (
    <div className='flex-1 flex flex-col p-6 w-full'>
      <div className='text-2xl font-semibold pl-3 pt-2'>
        <h1>Retirements</h1>
      </div>

      <div className='w-full mb-6 mt-5' >
        <RetirementComp/>
      </div>

      <div>
        <MyRetirements/>
      </div>
   </div>
  

  )
}

export default page