import React from 'react'
import StatsCard from '@/Components/Dashboard/carbondetail'
import LearnCardsContainer from '@/Components/Dashboard/learncontainer';

const page = () => {
  return (
    <div className="flex-1 flex flex-col p-6">    
        <h1 className='text-2xl font-semibold pl-3 pt-2'>Overview</h1>   
        <div className="w-full mb-6 mt-5">
          <StatsCard />
        </div>
        <div className='absolute bottom-6'>
        <LearnCardsContainer/>
        </div>
       
        </div>
  )
};

export default page;