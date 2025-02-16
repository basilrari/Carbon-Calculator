import React from 'react';
import { carbonassetprops } from '@/types/global.types';

const Carbonasset: React.FC<carbonassetprops> = ({ date, quantity, project, price, status }) => {
  const safeQuantity = quantity ?? 0; // Fallback to 0 if quantity is undefined
  const safePrice = price ?? 0; // Fallback to 0 if price is undefined

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-purple-100 rounded-lg shadow-sm">
      
      <div className="text-sm font-medium text-gray-800">{safeQuantity}</div>
      <div className="text-sm font-medium flex  text-gray-800">{project || 'Unknown'}</div>
      <div className="text-sm font-medium text-gray-800">{safePrice.toFixed(3)}</div>
     
    </div>
  );
};

export default Carbonasset;
