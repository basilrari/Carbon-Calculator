import React from 'react';
import RetirementComp from '@/Components/Dashboard/Retirements/RetireComp';
import MyRetirements from '@/Components/Dashboard/Retirements/MyRetirements';

const page = () => {
  // Dummy data
  const retirementSummary = { quantity: 7, poolName: 'DeCarb BioChar Carbon Pool (CHAR)' };
  const dummyRetirements = [
    {
    date: '2025-01-01',
    quantity: 100,
    project: 'Wind based power generation by Panama Wind Energy Private Limited IN, Maharashtra, India',
    price: 16.67,
    
  },
  { date: '2025-01-01', quantity: 10, project: 'North Pikounda REDD+', price: 176.7,  },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 w-full">
      <div className="text-2xl font-semibold pl-3 pt-2">
        <h1>Retirements</h1>
      </div>

      <div className="w-full mb-6 mt-5">
        <RetirementComp {...retirementSummary} />
      </div>

      <div>
        <MyRetirements retirements={dummyRetirements} />
      </div>
    </div>
  );
};

export default page;
