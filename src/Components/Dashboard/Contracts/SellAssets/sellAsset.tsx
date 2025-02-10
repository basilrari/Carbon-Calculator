"use client";
import React, { useState } from "react";
import MyButton from "../../MyButton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import myServer from "@/utils/Axios/axios";

const SellAsset: React.FC<{
  totalQuantity: number;
  totalPrice: number;
  selectedCount: number;
  selectedItems: any[]; // Add this prop
}> = ({ totalQuantity = 0, totalPrice = 0, selectedCount = 0, selectedItems = [] }) => {


  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSell = async () => {
    setLoading(true);
  
    try {
      const sellResponse = await myServer.get('/sell/sellTest', {
        // Include any necessary data for the sale. Here we're using totalQuantity from props instead.
        quantity: totalQuantity
      });
  
      console.log("Sell response status:", sellResponse.status);
      console.log("Sell response data:", sellResponse.data);
  
      if (sellResponse.status === 200 && sellResponse.data.status === 'success') {
        alert("Sale successful!");
        setLoading(false);
        // Optionally, you might want to redirect or update UI here
        // router.push('/some-path'); // Example if you want to navigate after sale
      } else {
        alert("There was an issue with the sale. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error selling:', error);
      alert('An error occurred while processing your sale. Please try again.');
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-blue-50 rounded-lg p-6 shadow-md font-sans">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-700 mb-2">{selectedCount} Carbon Assets Selected</h2>
        <h2 className="text-sm font-semibold text-gray-700 mb-2">DeCarb BioChar Carbon Pool (CHAR)</h2>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-md font-medium text-gray-600 pr-2">
            Quantity:{" "}
            <span className="text-lg font-bold text-gray-800">
              {totalQuantity || 0}
            </span>
          </p>
          <p className="text-md text-gray-600">
            Price:{" "}
            <span className="text-lg font-bold text-gray-800">
              {totalPrice ? `₹${totalPrice.toFixed(2)}` : "₹0.00"}
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <h1 className="text-3xl p-2 font-semibold">DCO2</h1>
          <Image src="/images/decarbtoken.png" alt="Token" width={48} height={48} />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Link href="/decarb/contracts">
          <MyButton text="BACK" variant="red" />
        </Link>
        <MyButton text="SELL CHAR" onClick={handleSell} variant="yellow" disabled={loading} />
      </div>
    </div>
  );
};

export default SellAsset;