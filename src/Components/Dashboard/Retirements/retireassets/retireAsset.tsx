"use client";
import React from "react";
import MyButton from "../../MyButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const RetireAsset: React.FC<{ totalQuantity?: number; totalPrice?: number; selectedCount?: number }> = ({ totalQuantity, totalPrice, selectedCount }) => {
  const router = useRouter();

  const encryptedPrivateKey = window.localStorage.getItem("encryptedPrivateKey"); // Replace this with actual encryption logic
  const walletAddress = window.localStorage.getItem("walletAddress"); // Replace with actual wallet logic

  const handleRetire = async () => {
    console.log("Retiring the following assets:", { totalQuantity, totalPrice, selectedCount, encryptedPrivateKey, walletAddress });
    router.push("/decarb/retirements");
  };

  return (
    <div className="bg-[#f0dfbe] rounded-lg p-6 w-auto mx-auto shadow-md font-sans">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-700 mb-2">{selectedCount} Carbon Assets Selected</h2>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-md font-medium text-gray-600">Quantity: <span className="text-lg font-bold text-gray-800">{totalQuantity}</span></p>
          <p className="text-md text-gray-600">Price: <span className="text-lg font-bold text-gray-800">₹{totalPrice}</span></p>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="/decarb/retirements"><MyButton text="BACK" variant="red" /></Link>
        <MyButton text="RETIRE" onClick={handleRetire} variant="green" />
      </div>
    </div>
  );
};

export default RetireAsset;
