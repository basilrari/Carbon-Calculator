import React from 'react';
import Carbonasset from '../carbonasset';

type MyAssetsProps = {
  carbonAssets: {
    date: string;
    quantity: number;
    project: string;
    price: number;
    status: string;
  }[];
};

const MyAssets: React.FC<MyAssetsProps> = ({ carbonAssets }) => {
  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold p-2">My Carbon Assets (DCO2)</h1>
      </div>
      <div className="bg-purple-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          <div>Date</div>
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          <div>Status</div>
        </div>
        <div className="space-y-4">
          {carbonAssets.length > 0 ? (
            carbonAssets.map((asset, index) => (
              <Carbonasset
                key={index}
                date={asset.date}
                quantity={asset.quantity}
                project={asset.project}
                price={asset.price}
                status={asset.status}
              />
            ))
          ) : (
            <div className="text-gray-500">You have no carbon assets</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAssets;