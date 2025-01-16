"use client";
import React from 'react';

const Individualasset = ({
  id,
  date,
  quantity,
  project,
  price,
  status,
  onSelectionChange,
}) => {
  return (
    <div
      className="flex justify-between text-gray-700 text-sm items-center"
      onClick={() => onSelectionChange(id)}
    >
      <div>{date}</div>
      <div>{quantity}</div>
      <div>{project}</div>
      <div>${price}</div>
      <div className={status === 'Available' ? 'text-green-500' : 'text-red-500'}>
        {status}
      </div>
    </div>
  );
};

export default Individualasset;
