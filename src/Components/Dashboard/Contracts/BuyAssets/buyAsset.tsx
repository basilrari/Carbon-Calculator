"use client";
import { useState } from "react";
import MyButton from "../../MyButton";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import myServer from "@/utils/Axios/axios";

type BuyCharComponentProps = {
  price?: number; // Made optional to prevent runtime errors
  quantity?: number;
  project?: string;
  contract?: string;
};

const BuyCharComponent: React.FC<BuyCharComponentProps> = ({
  price = 0,
  quantity = 0,
  project = "N/A",
  contract = "NA"
}) => {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!quantity) {
      alert("Please select a quantity before buying.");
      return;
    }

    setLoading(true);

    try {
      const apiKey = "rzp_test_74fvUBAvMzsdVl"; // Replace with actual key
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = async () => {
        const options = {
          key: apiKey,
          amount: Math.round(Number(price) * 100),
          currency: "INR",
          name: "DeCarb",
          description: `Purchase ${quantity} units of ${project}`,
          image: "/images/decarbtoken.png",
          theme: {
            color: "#2F4F4F",
          },
          handler: async function (response: any) {
            console.log("Payment response:", response);
            try {
              const backendResponse = await myServer.get("/buy/buyTest", {
                params: {
                  // Ensured correct request format
                  amount: price,
                  quantity,
                  project,
                  paymentId: response.razorpay_payment_id,
                },
              });
              console.log("Backend response status:", backendResponse.status);
              console.log("Backend response data:", backendResponse.data);

              if (backendResponse.status === 200) {
                //toast.success("Payment successful!");
                console.log("Payment successful!");
                console.log("Selected Project:", project);
                console.log("Selected Quantity:", quantity);
                console.log("Total Price:", price);
                console.log("contract address:", contract);
                const walletAddress = window.localStorage.getItem("walletAddress");
                console.log("Wallet Address:", walletAddress);
              
                const data = {
                  quantity: quantity,
                  tokenAddress: contract,
                  toAddress: walletAddress
                };
              
                const response = await myServer.post('/buy/buyTokens', data)
                console.log("API Response:", response.data);
                alert("Token Purchase successful! Txn Hash: " + response.data.transactionHash);
              } else {
                alert("Payment was successful, but order processing failed.");
              }
            } catch (error) {
              console.error("Error processing purchase:", error);
              alert("Payment successful, but order processing failed.");
            }
            setLoading(false);
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.open();
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error("Error initiating payment:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 w-auto mx-auto shadow-md font-sans">
      <h2 className="text-lg font-semibold">
        DeCarb BioChar Carbon Pool (CHAR)
      </h2>
      <p className="text-sm text-gray-600">
        Project: <span className="font-semibold">{project}</span>
      </p>
      <p className="text-sm text-gray-600">
        Quantity: <span className="font-semibold">{quantity}</span>
      </p>
      <p className="text-sm text-gray-600">
        Total Price:{" "}
        <span className="font-semibold">₹{Number(price).toFixed(2)}</span>
      </p>

      <div className="flex justify-end space-x-4 mt-4">
        <Link href="/decarb/contracts">
          <MyButton text="BACK" variant="red" />
        </Link>
        <MyButton
          text="BUY CHAR"
          onClick={handleBuy}
          variant="green"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default BuyCharComponent;
