import React from "react";
import Link from "next/link";
import MyButton from "../../MyButton";

type BuyCharComponentProps = {
  walletAmount: number;
  selectedAsset: {
    project: string;
    price: number;
  } | null;
  selectedQuantity: number;
};

const BuyCharComponent: React.FC<BuyCharComponentProps> = ({
  walletAmount,
  selectedAsset,
  selectedQuantity,
}) => {
  const totalPrice = selectedAsset ? selectedAsset.price * selectedQuantity : 0;

  const handleBuy = async () => {
    // Razorpay logic remains unchanged
    if (!selectedAsset || selectedQuantity === 0) {
      alert("Please select a carbon asset and enter a valid quantity.");
      return;
    }

    // Trigger Razorpay payment based on selected asset
    const amount = totalPrice;
    const apiKey = "rzp_test_74fvUBAvMzsdVl"; // Replace with actual key

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      const options = {
        key: apiKey,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: "DeCarb",
        description: `Purchase ${selectedQuantity} units of ${selectedAsset}`,
        image: "/images/decarbtoken.png",
        theme: {
          color: "#2F4F4F",
        },
        handler: function (response: any) {
          console.log("Payment response:", response);
          alert("Purchase successful!");
          const walletAddress = localStorage.getItem("walletAddress");

          if (!walletAddress) {
            console.error("walletAddress not found in localStorage");
            alert("Wallet address not found. Please connect your wallet.");
            return;
          }

          console.log("Retrieved Wallet Address:", walletAddress);

          console.log("Selected Project:", selectedAsset);
          console.log("Selected Quantity:", selectedQuantity);
          console.log("Total Price:", amount);
          console.log("Contract Address:", (selectedAsset as any).contract);
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    };

    document.body.appendChild(script);
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 w-auto mx-auto shadow-md font-sans">
      <h2 className="text-lg font-semibold">
        DeCarb BioChar Carbon Pool (CHAR)
      </h2>
      {selectedAsset ? (
        <>
          <p className="text-sm text-gray-600">
            Project:{" "}
            <span className="font-semibold">{selectedAsset.project}</span>
          </p>
          <p className="text-sm text-gray-600">
            Quantity: <span className="font-semibold">{selectedQuantity}</span>
          </p>
          <p className="text-sm text-gray-600">
            Total Price:{" "}
            <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          Please select a carbon asset to view details.
        </p>
      )}

      <div className="flex justify-end space-x-4 mt-4">
        <Link href="/decarb/contracts">
          <MyButton text="BACK" variant="red" />
        </Link>
        <MyButton
          text="BUY CHAR"
          onClick={handleBuy}
          variant="green"
          disabled={!selectedAsset || selectedQuantity === 0}
        />
      </div>
    </div>
  );
};

export default BuyCharComponent;
