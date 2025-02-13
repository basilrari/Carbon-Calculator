"use client"
import React, { useState } from 'react';

interface IndividualassetProps {
  id: number;
  date: string;
  quantity: number;
  project: string;
  price: number;
  status: string;
  onSelectionChange: (data: { id: number; selectedQuantity: number; price: number } | number) => void;
}

const Individualasset: React.FC<IndividualassetProps> = ({
  id,
  date,
  quantity,
  project,
  price,
  status,
  onSelectionChange,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value)>3){
      alert("Max qty 3")
    }
    const value = Math.min(Number(e.target.value), 3); // Limit the selection to available quantity
    setSelectedQuantity(value);
    
    if (value > 0) {
      onSelectionChange({ id, selectedQuantity: value, price: (price / quantity) * value });
    } else{
      alert("Please select at least 1 to sell.")
      onSelectionChange(id); // Deselect if quantity is 0
    }
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-2">
      <div>{date}</div>
      <div>{quantity}</div>
      <div>{project}</div>
      <div>{price}</div>
      
      <div>
        <input
          type="number"
          min=""
          max={quantity}
          value={selectedQuantity}
          onChange={handleQuantityChange}
          className="w-20 border rounded px-2"
        />
      </div>
    </div>
  );
};

export default Individualasset;