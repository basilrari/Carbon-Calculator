import React from 'react'
import { Checkbox } from "@nextui-org/react";
import { useState } from 'react';

type Individualassetprops = {
    date : string,
    quantity : number,
    project : string,
    price : number,
};

export type MyAssetArray = Individualassetprops[];

type NewIndividualassetprops = Individualassetprops & {
    onSelectionChange : (data : Individualassetprops | undefined) => void;
}

const Individualasset : React.FC<NewIndividualassetprops> = ({date, quantity, project, price, onSelectionChange}) => {

 const [isSelected, setIsSelected] = useState(false)
 
 
 const handleChange = () => {
    setIsSelected(!isSelected)
    { isSelected ? (onSelectionChange({date, quantity, project, price})
       ) : (
          onSelectionChange(undefined)
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