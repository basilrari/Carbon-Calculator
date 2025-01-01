'use client'
import { useState, useEffect } from 'react';
import { myInstance } from '@/utils/Axios/axios';
import MyButton from '../../MyButton';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Image from 'next/image';

interface WalletResponse {
  amount: number;
}

interface BuyCharComponentState {
  quantity: number;
  price: number;
  walletAmount: number;
  loading: boolean;
}

const quantitySchema = z.number().min(1);


const BuyCharComponent = () => {
  const [state, setState] = useState<BuyCharComponentState>({
    quantity: 0,
    price: 0,
    walletAmount: 0,
    loading: false,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchWalletAmount = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const { data } = await myInstance.get<WalletResponse>('/api/wallet');
        setState((prev) => ({ ...prev, walletAmount: data.amount || 0 }));
      } catch (error) {
        const err = error as Error
        console.error('Error fetching wallet amount:', err.message);
        // alert('Failed to fetch wallet amount');
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchWalletAmount();
  }, []);

  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const parsedValue = parseFloat(value); 
        if (!value || isNaN(parsedValue)) {
            setState((prev) => ({ ...prev, quantity: 0, price: 0 }));
        } 
            
        const quantityValidation = quantitySchema.safeParse(parsedValue);
        if (quantityValidation.success) {
            setState((prev) => ({ ...prev, quantity: parsedValue, price: parsedValue * 17.67 }));
        } else {
            console.log(quantityValidation.error.errors[0].message);
            }
       };

  const handleBack = () => {
    router.push('/decarb/contracts');
  };

  const handleBuy = async () => {
    if (state.price > state.walletAmount) {
      alert('Insufficient funds in your wallet.');
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await myInstance.post('/api/buy', { quantity: state.quantity, price: state.price });

      if (response.status === 200) {
        alert('Purchase successful!');

        const { data } = await myInstance.get<WalletResponse>('/api/wallet');
        setState((prev) => ({
          ...prev,
          walletAmount: data.amount || 0,
        }));
        router.push("/decarb/contracts")
      } else {
        alert(`Purchase failed: ${response.data.message}`);
      }
    } catch (error) {
      const err = error as Error;
      console.error('Error during purchase:', err.message);
      alert(`Purchase failed: ${err.message || 'Unknown error'}`);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 w-auto  mx-auto shadow-md font-sans">
    <div className='flex justify-between'>
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Choose the quantity you would like to buy
        </h2>
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
            DeCarb BioChar Carbon Pool (CHAR)
         </h2>
    </div>

  <div className="flex items-center justify-between mb-4 ">
    <div className='flex items-center ' >
        <p className="text-sm font-medium text-gray-600 pr-2">
          Quantity:
        </p>
        <input
          id="quantity"
          type="text"
          value={state.quantity}
          onChange={handleQuantityChange}
          className=" text-xl border pl-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={state.loading}
        />
       <p className="pl-4 text-sm text-gray-600">
      Price:{" "}
      <span className="text-lg font-semibold text-gray-800 ">
        ${state.price.toFixed(2)}
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

  <div className='flex justify-between'>
  <p className="text-sm text-gray-600">
      Amount in Wallet:{" "}
      <span className="text-lg font-semibold text-indigo-600">
        ${state.walletAmount.toFixed(2)}
      </span>
    </p>

    <div className="flex justify-end space-x-4 ">
    <MyButton
      text="BACK"
      variant="red"
      onClick={handleBack}
  
    />
    <MyButton
      text="BUY CHAR"
      onClick={handleBuy}
      variant="green"
      disabled={state.loading || state.quantity === 0}
      
    />
  </div>
  </div>
  
</div>

  );
};

export default BuyCharComponent;
