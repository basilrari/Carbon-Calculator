import React from 'react'
import { Checkbox } from "@nextui-org/react";
import { useState } from 'react';
import { NewIndividualassetprops } from '@/types/global.types';


const Individualasset : React.FC<NewIndividualassetprops> = ({id, date, quantity, project, price, onSelectionChange}) => {

 const [isSelected, setIsSelected] = useState(false)
 
 const handleChange = () => {
    setIsSelected(!isSelected)
    { isSelected ? (onSelectionChange({id, date, quantity, project, price})
       ) : (
          onSelectionChange(id)
       )   
    }
 }

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-purple-100 rounded-lg shadow-sm">
    
    <div className="text-sm font-medium text-gray-800">{date}</div>
    
    <div className="text-sm font-medium text-gray-800">{quantity.toFixed(3)}</div>
    
    <div className="text-sm font-medium text-gray-800">{project}</div>
    
    <div className="text-sm font-medium text-gray-800">{price.toFixed(3)}</div>
    
    <div className="flex items-center">
      <Checkbox isSelected = {isSelected} onChange={handleChange}/>
    </div>
  </div>
  );
};

export default Individualasset;