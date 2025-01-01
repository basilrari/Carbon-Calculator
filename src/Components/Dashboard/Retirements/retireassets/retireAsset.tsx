"use client"
import React from 'react'
import MyButton from '../../MyButton'
import { useRouter } from 'next/navigation'
import { myInstance } from '@/utils/Axios/axios';
import { AggregateDataProps } from './mycarbonassets';
import Image from 'next/image';

const RetireAsset: React.FC<AggregateDataProps> = ({totalQuantity, totalPrice, selectedCount}) => {
    
    const payload = {
        quantity: totalQuantity,
        price: totalPrice,
        selectedCount: selectedCount,
      };

    const router = useRouter();

    const handleBack = () =>{
        router.push('/decarb/retirements')
    }

    const handleRetire = async () =>{
        try{
            const res = await myInstance.post("/api/sellassets",payload)
            if (res.status === 200){
                router.push('/decarb/retirements')
            }
            else{
                console.log('Failed to sell assets')
            }
        } catch(error){
            console.log("Error in sending data",error)
        }
    }

  return (
    <div className="bg-[#f0dfbe] rounded-lg p-6 w-auto  mx-auto shadow-md font-sans">
    <div className='flex justify-between'>
        <h2 className="text-lg font-bold text-gray-700 mb-2">
            {selectedCount} Carbon Assets Selected
        </h2>
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
            DeCarb BioChar Carbon Pool (CHAR)
         </h2>
    </div>

  <div className="flex items-center justify-between mb-4 ">
    <div className='flex-1 ' >
        <p className="text-md font-medium text-gray-600 pr-2">
          Quantity:{" "}
          <span className="text-lg font-bold text-gray-800 ">
            ${totalQuantity}
         </span>
        </p>
        
       <p className=" text-md text-gray-600">
            Price:{" "}
            <span className="text-lg font-bold text-gray-800 ">
                ${totalPrice}
            </span>
        </p> 
    </div>

     <div className='flex justify-end'>
        
         <h1 className='text-3xl p-2 font-semibold'>DCO2</h1>
         <Image
              src="/images/decarbtoken.png"
              alt="Token"
              width={48}
              height={48}
          />
     </div>
  </div>

  <div className='flex justify-end'>

    <div className="flex  space-x-4 ">
    <MyButton
      text="BACK"
      variant="red"
      onClick={handleBack}
    />
    <MyButton
      text="RETIRE"
      onClick={handleRetire}
      variant="green"
    />
  </div>
  </div>
  
</div>
  )
}

export default RetireAsset