"use client";
import React, { useState } from "react";

interface IndividualAssetProps {
  id: number;
  date: string;
  quantity: number;
  project: string;
  price: number;
  status: string;
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
  date,
  quantity,
  project,
  price,
  contract,
  onSelectionChange,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>();
  const pricePerUnit = price / quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), Math.min(quantity, 3)); 
    setSelectedQuantity(value);

    onSelectionChange({
      id,
      selectedQuantity: value,
      price: value * pricePerUnit,
      contract,
      project,
    });
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-2">
      <div>{date}</div>
      <div>{quantity}</div>
      <div>{project}</div>
      <div>₹{price}</div>
      <div>
        <input
          type="number"
          min="0"
          max={Math.min(quantity, 3)}
          value={selectedQuantity}
          onChange={handleQuantityChange}
          className="w-20 border rounded px-2"
        />
      </div>
    </div>
  );
};

export default Individualasset;
