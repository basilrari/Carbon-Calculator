"use client";
import React, { useState } from "react";

const Individualasset = ({
  id,
  date,
  quantity,
  project,
  price,
  status,
  onSelectionChange,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    const value = Math.min(quantity, Math.max(0, parseInt(e.target.value) || 0));
    setSelectedQuantity(value);
    onSelectionChange(id, value);
  };

  return (
    <div className="flex justify-between text-gray-700 text-sm items-center">
      <div>{date}</div>
      <div>{quantity}</div>
      <div>{project}</div>
      <div>${price}</div>
      <div
        className={status === "Available" ? "text-green-500" : "text-red-500"}
      >
        {status}
      </div>
      <div>
        <input
          type="number"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          className="border border-gray-300 rounded px-2 py-1 w-20"
        />
      </div>
    </div>
  );
};

export default Individualasset;
