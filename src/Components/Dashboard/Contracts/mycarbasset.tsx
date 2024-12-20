import React from 'react'
import Carbonasset from './carbonasset'
import { z } from 'zod'
import { myInstanceNext } from '@/utils/Axios/axios'

const carbonAssetSchema = z.object({
    date : z.date(),
    quantity : z.number(),
    project : z.string(),
    price : z.number(),
    status : z.union([z.boolean(),z.literal('processing')]),
})

const carbonAssetArraySchema = z.array(carbonAssetSchema)

const MyCarbonAssets = async () => {

    const fetchCarbonAssets = async () => {
        try{
            const res = await myInstanceNext.get('/getassets');
            const parsedResponse = carbonAssetArraySchema.safeParse(res.data);
        
            if (parsedResponse.success){
                const carbonAssets = parsedResponse.data;
                return carbonAssets;
            }
            else{
                console.error("Invalid Data Format", parsedResponse.error)
                return [];
            }
           } catch(error){
            console.error("Error fetching carbon assets", error);
            return [];
           }
        }
 
    const carbonAssets = await fetchCarbonAssets();
  
 
 
    return (
        <div className="bg-purple-100 rounded-lg p-6 space-y-4">
         
         <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
            <div>Date</div>
            <div >Quantity</div>
            <div >Project Name</div>
            <div >Price</div>
            <div>Status</div>
         </div>
    
          <div className="space-y-4">
            {carbonAssets.length > 0 ? (
              carbonAssets.map((asset, index) => (
                <Carbonasset
                  key={index}
                  date={asset.date}
                  quantity={asset.quantity}
                  project={asset.project}
                  price={asset.price}
                  status={asset.status}
                />
              ))
            ) : (
              <div className="text-gray-500">You have no carbon assets</div>
            )}
          </div>
        </div>
      );
}

export default MyCarbonAssets;