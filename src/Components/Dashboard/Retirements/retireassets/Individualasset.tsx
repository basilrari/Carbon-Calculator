"use client";
import React, { useState } from "react";

interface IndividualassetProps {
  id: number;
  date: string;
  quantity: number;
  project: string;
  price: number;
  status: string;
  onSelectionChange: (data: { id: number; selectedQuantity: number; price: number }) => void;
}

const Individualasset: React.FC<IndividualassetProps> = ({
  id,
  date,
  quantity,
  project,
  price, // Total price for the quantity
  onSelectionChange,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const pricePerUnit = price / quantity; // Calculate price per unit

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), 3); // Limit to available quantity
    setSelectedQuantity(value);

    onSelectionChange({
      id,
      selectedQuantity: value,
      price: value * pricePerUnit, // Calculate total price for the selected quantity
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
          max={quantity}
          value={selectedQuantity || ''}
          onChange={handleQuantityChange}
          className="w-20 border rounded px-2"
        />
      </div>
    </div>
  );
};

export default Individualasset;
