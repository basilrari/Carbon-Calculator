"use client"
import React from 'react'
import MyButton from '../../MyButton'
import { useRouter } from 'next/navigation'
import { myInstance } from '@/utils/Axios/axios';
import { count } from 'console';
import { useSellContext } from '@/Components/context/SellContext';

const SellAsset = () => {
    const {currentAsset} = useSellContext()

    const payload = {
        quantity: currentAsset?.totalQuantity,
        price: currentAsset?.totalPrice,
        selectedCount: currentAsset?.selectedCount,
      };

    const router = useRouter();

    const handleBack = () =>{
        router.push('/decarb/contracts')
    }

    const handleSell = async () =>{
        try{
            const res = await myInstance.post("/api/sellassets",payload)
            if (res.status === 200){
                router.push('/decarb/contracts')
            }
            else{
                console.log('Failed to sell assets')
            }
        } catch(error){
            console.log("Error in sending data",error)
        }
    }

  return (
    <div className="bg-blue-50 rounded-lg p-6 w-auto  mx-auto shadow-md font-sans">
    <div className='flex justify-between'>
        <h2 className="text-lg font-bold text-gray-700 mb-2">
            {currentAsset?.selectedCount} Carbon Assets Selected
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
            ${currentAsset?.totalQuantity}
         </span>
        </p>
        
       <p className=" text-md text-gray-600">
            Price:{" "}
            <span className="text-lg font-bold text-gray-800 ">
                ${currentAsset?.totalPrice}
            </span>
        </p> 
    </div>

     <div className='flex justify-end'>
        
         <h1 className='text-3xl p-2 font-semibold'>DCO2</h1>
         <img
              src="/images/decarbtoken.png"
              alt="Token"
              className="w-12 h-12"
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
      text="BUY CHAR"
      onClick={handleSell}
      variant="green"
    />
  </div>
  </div>
  
</div>
  )
}

export default SellAsset