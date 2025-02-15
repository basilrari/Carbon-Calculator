"use client";
import React, { useState } from "react";

interface IndividualAssetProps {
  id: number;
  quantity: number;
  project: string;
  price: number;
  contract: string;
  onSelectionChange: (data: {
    id: number;
    selectedQuantity: number;
    price: number;
    contract: string;
    project: string;
  }) => void;
}

const Individualasset: React.FC<IndividualAssetProps> = ({
  id,
  quantity,
  project,
  price,
  contract,
  onSelectionChange,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number | undefined>();
  const pricePerUnit = price;

 

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value),quantity); 
    setSelectedQuantity(value);
  
    onSelectionChange({
      id,
      selectedQuantity: value, // Make sure this updates correctly
      price: value * pricePerUnit,
      contract,
      project,
    });
  };
     

  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-4 px-6">
  <div className="w-1/4 text-sm font-medium">{quantity}</div>
  <div className="w-2/4 text-sm font-medium">{project}</div>
  
  <div className="w-1/4">
    <input
      type="number"
      min="0"
      max={quantity}
      value={selectedQuantity}
      onChange={handleQuantityChange}
      className="w-20 border rounded px-2"    />
  </div>
</div>
  );
};

export default Individualasset;
