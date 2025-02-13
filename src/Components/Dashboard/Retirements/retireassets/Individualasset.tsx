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
    const value = Math.min(Number(e.target.value), Math.min(quantity, 3)); 
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
    <div className="flex justify-between items-center border-b border-gray-300 py-2">
      <div>{quantity}</div>
      <div>{project}</div>
      <div>{price}</div>
      <div>
        <input
          type="number"
          min="0"
          max={Math.min(quantity, 3)}
          value={selectedQuantity } // Handle undefined state
          onChange={handleQuantityChange}
          className="w-20 border rounded px-2"
        />
      </div>
    </div>
  );
};

export default Individualasset;
