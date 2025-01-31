"use client"
import React from 'react'
import MyButton from '../../MyButton'
import { useRouter } from 'next/navigation'
import { AggregateDataProps } from '@/types/global.types'
import Image from 'next/image'
import Link from 'next/link'
import myServer from '@/utils/Axios/axios'

const RetireAsset: React.FC<AggregateDataProps> = ({ totalQuantity, totalPrice, selectedCount }) => {
    const payload = {
        quantity: totalQuantity,
        price: totalPrice,
        selectedCount: selectedCount,
    };

    const router = useRouter();

    const handleRetire = async () => {
        try {
            console.log('Retiring the following assets:', payload);
            console.log('Payload sent to API:', payload);
    
            const retireResponse = await myServer.get('/retire/retireTest', payload);
    
            console.log("Retire response status:", retireResponse.status);
            console.log("Retire response data:", retireResponse.data);
    
            if (retireResponse.status === 200 && retireResponse.data.status === 'success') {
                alert("Retirement successful!");
                router.push('/decarb/retirements'); // Navigate after successful retirement
            } else {
                alert("There was an issue with the retirement. Please try again.");
            }
        } catch (error) {
            console.error('Error in sending data', error);
            alert('An error occurred while processing your retirement. Please try again.');
        }
    };
    

    return (
        <div className="bg-[#f0dfbe] rounded-lg p-6 w-auto mx-auto shadow-md font-sans">
            <div className="flex justify-between">
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                    {selectedCount} Carbon Assets Selected
                </h2>
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                    DeCarb BioChar Carbon Pool (CHAR)
                </h2>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                    <p className="text-md font-medium text-gray-600 pr-2">
                        Quantity:{' '}
                        <span className="text-lg font-bold text-gray-800">{totalQuantity}</span>
                    </p>
                    <p className="text-md text-gray-600">
                        Price:{' '}
                        <span className="text-lg font-bold text-gray-800">₹{totalPrice}</span>
                    </p>
                </div>

                <div className="flex justify-end">
                    <h1 className="text-3xl p-2 font-semibold">DCO2</h1>
                    <Image
                        src="/images/decarbtoken.png"
                        alt="Token"
                        width={48}
                        height={48}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <div className="flex space-x-4">
                    <Link href="/decarb/retirements">
                        <MyButton text="BACK" variant="red" />
                    </Link>
                    <MyButton text="RETIRE" onClick={handleRetire} variant="green" />
                </div>
            </div>
        </div>
    );
};

export default RetireAsset;
