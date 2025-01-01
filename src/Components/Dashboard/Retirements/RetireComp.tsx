"use client"
import React from 'react';
import MyButton from '../MyButton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const RetirementComp = () => {

  const router = useRouter();

  const handleRetire = () => {
    router.push('/decarb/retirements/retireassets');
  };

  return (
    <div className="flex items-center justify-between p-6 border rounded-lg shadow-md bg-white w-full mx-auto">
      <div className="flex items-center space-x-4">
        <Image
          src="/images/decarbtoken.png"
          alt="Token"
          className="w-12 h-12"
        />
        <div>
          <h5 className="text-sm font-medium text-gray-600">
            DeCarb BioChar Carbon Pool (CHAR)
          </h5>
          <h2 className="text-2xl font-bold text-gray-900">7 KG</h2>
        </div>
      </div>

      <div className="flex space-x-4">
        <MyButton
          variant="green"
          text="RETIRE"
          onClick={handleRetire}       
        />     
      </div>
    </div>
  );
};

export default RetirementComp;
