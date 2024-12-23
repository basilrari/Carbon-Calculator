import React, { useEffect } from 'react'
import Individualasset, { NewIndividualassetprops } from './Individualasset'
import { z } from 'zod'
import { myInstance } from '@/utils/Axios/axios'
import { useState } from 'react'
import { MyAssetArray,Individualassetprops } from './Individualasset'

const carbonAssetSchema = z.object({
    date : z.string(),
    quantity : z.number(),
    project : z.string(),
    price : z.number(),
    status : z.literal('current'),
})

interface onAggregatedData {
   onAggregatedData : (data: {totalQuantity : number, totalPrice : number, selectedCount : number} ) => void
} 

const carbonAssetArraySchema = z.array(carbonAssetSchema)

const CurrentAssets= ({onAggregatedData} : onAggregatedData) => {

    const[selectedItems, setSelectedItems] = useState<MyAssetArray>([])
    const [carbonAssets, setCarbonAssets] = useState<MyAssetArray>([]); 
    
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedCount, setSelectedCount] = useState(0);
        
    useEffect(() => {
        const fetchCarbonAssets = async () => {
          try {
            const res = await myInstance.get('/api/currentassets');
            const parsedResponse = carbonAssetArraySchema.safeParse(res.data);
    
            if (parsedResponse.success) {
              setCarbonAssets(parsedResponse.data); 
            } else {
              console.error('Invalid Data Format', parsedResponse.error);
            }
          } catch (error) {
            console.error('Error fetching carbon assets', error);
          } 
        }
        fetchCarbonAssets();
    },[]);
    
    const handleSelectionChange = (item: Individualassetprops | undefined) => {
         setSelectedItems((prev) => [...(prev || []) , ...(item ? [item] : []) ] )
    }

    useEffect(() => {
        const quantity = selectedItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const price = selectedItems.reduce((total, item) => total + item.price, 0);
        setTotalQuantity(quantity);
        setTotalPrice(price);
        setSelectedCount(selectedItems.length);
    
        
        onAggregatedData({ totalQuantity: quantity, totalPrice: price, selectedCount: (selectedItems || []).length });
      }, [selectedItems]);
    
    

    return (
        <div>
            <div>
                <h1 className='text-lg font-semibold p-2'>My Carbon Assets (DCO2)</h1>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 space-y-4">
            
             <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
                <div>Date</div>
                <div >Quantity</div>
                <div >Project Name</div>
                <div >Price</div>
                <div >Status</div>
             </div>
              <div className="space-y-4">
                {carbonAssets.length > 0 ? (
                  carbonAssets.map((asset, index) => (
                    <Individualasset
                      key={index}
                      date={asset.date}
                      quantity={asset.quantity}
                      project={asset.project}
                      price={asset.price} 
                      onSelectionChange={(data) => handleSelectionChange(data)}                    
                    />
                  ))
                ) : (
                  <div className="text-gray-500">You have no carbon assets</div>
                )}
              </div>
            </div>
        </div>
      );
}

export default CurrentAssets;