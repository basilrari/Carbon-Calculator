import React from 'react'

type carbonassetprops = {
    date : string,
    quantity : number,
    project : string,
    price : number,
    status : 'current' | 'sold' ,
};

export type carbonAssetArray = carbonassetprops[];

const Carbonasset : React.FC<carbonassetprops> = ({date, quantity, project, price, status}) => {
 

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-purple-100 rounded-lg shadow-sm">
    
    <div className="text-sm font-medium text-gray-800">{date}</div>
    
    <div className="text-sm font-medium text-gray-800">{quantity.toFixed(3)}</div>
    
    <div className="text-sm font-medium text-gray-800">{project}</div>
    
    <div className="text-sm font-medium text-gray-800">{price.toFixed(3)}</div>
    
    <div className="flex items-center">
      {status === 'current' && (
        <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      {status === 'sold' && (
        <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 110 12 6 6 0 010-12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      
    </div>
  </div>
  );
};

export default Carbonasset;