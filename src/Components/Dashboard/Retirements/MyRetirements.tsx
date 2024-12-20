import React from 'react'
import { z } from 'zod'
import { myInstanceNext } from '@/utils/Axios/axios'
import Retirement from './Retirement'

const retirementSchema = z.object({
    date : z.date(),
    quantity : z.number(),
    project : z.string(),
    price : z.number(),
    status : z.union([z.boolean(),z.literal('processing')]),
})

const retirementArraySchema = z.array(retirementSchema)

const MyRetirements = async () => {

    const fetchRetirements = async () => {
        try{
            const res = await myInstanceNext.get('/getretirements');
            const parsedResponse = retirementArraySchema.safeParse(res.data);
        
            if (parsedResponse.success){
                return parsedResponse.data;
            }
            else{
                console.error("Invalid Data Format", parsedResponse.error)
                return [];
            }
           } catch(error){
            console.error("Error fetching retirements", error);
            return [];
           }
        }
 
    const retirements = await fetchRetirements();
  
 
 
    return (
        <div className="bg-blue-100 rounded-lg p-6 space-y-4">
         
         <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
            <div>Date</div>
            <div >Quantity</div>
            <div >Project Name</div>
            <div >Price</div>
            <div>View</div>
         </div>
    
          <div className="space-y-4">
            {retirements.length > 0 ? (
              retirements.map((asset, index) => (
                <Retirement
                  key={index}
                  date={asset.date}
                  quantity={asset.quantity}
                  project={asset.project}
                  price={asset.price}
                 
                />
              ))
            ) : (
              <div className="text-gray-300">You have no retirements</div>
            )}
          </div>
        </div>
      );
}

export default MyRetirements;