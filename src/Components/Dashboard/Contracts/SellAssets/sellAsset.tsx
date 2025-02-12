"use client";
import { useState } from "react";
import React from "react";
import MyButton from "../../MyButton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import myServer from "@/utils/Axios/axios";
import { Loader2 } from "lucide-react";
// Separate Loading Overlay Component
const LoadingOverlay = () => (
  <div className="fixed inset-0 w-full h-full z-50">
    {/* Base background */}

    {/* Blurred overlay */}
    <div className="absolute inset-0 backdrop-blur-xl bg-white/50" />

    {/* Content container */}
    <div className="relative h-full flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl max-w-md w-full border border-white/20">
        <div className="flex flex-col items-center space-y-8">
          {/* Main loading spinner */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-800/20 animate-pulse"></div>
            <div className="relative w-20 h-20">
              <Loader2 className="w-20 h-20 text-emerald-800 animate-spin" />
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-emerald-800 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Text content */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-emerald-900">
              Processing Your Purchase
            </h2>
            <div className="space-y-3">
              <p className="text-emerald-700 font-medium">
                Securing your transaction on the blockchain
              </p>
              <div className="flex items-center justify-center space-x-2 text-red-500">
                <svg
                  className="w-5 h-5 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="font-semibold">
                  Please do not refresh or close this page
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-800 h-2 rounded-full transition-all duration-[5000ms] ease-linear"
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SellAsset: React.FC<{
  totalQuantity: number;
  totalPrice: number;
  selectedCount: number;
  selectedItems: any[]; // Add this prop
}> = ({
  totalQuantity = 0,
  totalPrice = 0,
  selectedCount = 0,
  selectedItems = [],
}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSell = async () => {
    setLoading(true); // Start loading before API call
  
    try {
      const encryptedPrivateKey = window.localStorage.getItem("encryptedPrivateKey");
      const data = {
        quantity: selectedItems[0].selectedQuantity,
        contractAddress: selectedItems[0].id,
        encryptedPrivateKey: encryptedPrivateKey,
      };
      
      console.log("Data:", data);
      const response = await myServer.post("/sell/sellTransfer", data);
      console.log("Response:", response);
  
      if (response.status === 200) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulating processing delay
        alert("Sell successful! Transaction Hash: " + response.data.transactionHash);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Sell transaction failed:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      },5000) // Stop loading after success or failure
    }
  
    router.push("/decarb/contracts/sellassets");
  };
  
  return (
    <div className={`relative ${loading ? "blur-sm pointer-events-none" : ""}`}>

      {/* ✅ Loading Overlay */}
      {loading && <LoadingOverlay />}

    <div className="bg-blue-50 rounded-lg p-6 shadow-md font-sans">
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
          <Image
            src="/images/decarbtoken.png"
            alt="Token"
            width={48}
            height={48}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Link href="/decarb/contracts">
          <MyButton text="BACK" variant="red" />
        </Link>
        <MyButton text="SELL CHAR" onClick={handleSell} variant="yellow" />
      </div>
    </div>
    </div>
  );
};

export default SellAsset;
