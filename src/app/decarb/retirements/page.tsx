import React from 'react';
import RetirementComp from '@/Components/Dashboard/Retirements/RetireComp';
import MyRetirements from '@/Components/Dashboard/Retirements/MyRetirements';

const page = () => {
  // Dummy data
  const retirementSummary = { quantity: 7, poolName: 'DeCarb BioChar Carbon Pool (CHAR)' };
  const dummyRetirements = [
    { date: new Date(), quantity: 2.5, project: 'Rimba Raya Biodiversity Reserve Project', price: 15.5 },
    { date: new Date(), quantity: 3.2, project: 'Yingpeng HFC23 Decompostion Project', price: 20.0 },
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
