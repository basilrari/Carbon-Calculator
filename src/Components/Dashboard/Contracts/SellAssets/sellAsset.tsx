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
    <div>
        <div>
            <div>
                <div>
                    <h1>{currentAsset?.selectedCount} Carbon Assets Selected</h1>
                </div>
                <div>
                    <h2>DeCarb BioChar Carbon Pool (CHAR)</h2>
                </div>
            </div>

            <div>
                <h2>Quantity: {currentAsset?.totalQuantity}</h2>
                <h2>Price: {currentAsset?.totalPrice}</h2>
            </div>

            <div>
                <h1>DCO2</h1>
                <img
                 src='/images/decarbtoken.png'
                 className='w-12 h-12'
                 />
            </div>       
        </div>

        <div>
            <MyButton variant='red' text='BACK' onClick={handleBack}/>
            <MyButton variant='yellow' text='SELL CHAR' onClick={handleSell}/>
        </div>
    </div>
  )
}

export default SellAsset