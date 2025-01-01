
import React from 'react';
import MyButton from '../MyButton';
import Link from 'next/link';
import Image from 'next/image';

const RetirementComp = () => {
   

  return (
    <div className="flex items-center justify-between p-6 border rounded-lg shadow-md bg-white w-full mx-auto">
      <div className="flex items-center space-x-4">
        <Image
          src="/images/decarbtoken.png"
          alt="Token"
          width={48}
          height={48}
        />
        <div>
          <h5 className="text-sm font-medium text-gray-600">
            DeCarb BioChar Carbon Pool (CHAR)
          </h5>
          <h2 className="text-2xl font-bold text-gray-900">7 KG</h2>
        </div>
      </div>

      <div className="flex space-x-4">
        <Link href='/decarb/retirements/retireassets' >
          <MyButton
            variant="green"
            text="RETIRE"
          />
        </Link>   
      </div>
    </div>
  );
};

export default RetirementComp;
