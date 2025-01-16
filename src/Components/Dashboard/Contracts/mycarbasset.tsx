"use client"
import React from 'react';
import Carbonasset from './carbonasset';
import { z } from 'zod';
import { carbonAssetArray } from '@/types/global.types';

const carbonAssetSchema = z.object({
  date: z.string(),
  quantity: z.number(),
  project: z.string(),
  price: z.number(),
  status: z.union([z.literal('current'), z.literal('sold')]),
});

const carbonAssetArraySchema = z.array(carbonAssetSchema);

type MyCarbonAssetsProps = {
  carbonAssets: carbonAssetArray;
};

const MyCarbonAssets: React.FC<MyCarbonAssetsProps> = ({ carbonAssets }) => {
  const [isCurrent, setIsCurrent] = React.useState(true);

  const parsedAssets = carbonAssetArraySchema.safeParse(carbonAssets);

  if (!parsedAssets.success) {
    return <div>Error: Invalid asset data</div>;
  }

  const filteredAssets = parsedAssets.data.filter(
    (asset) => asset.status === (isCurrent ? 'current' : 'sold')
  );

  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <h1 className="text-lg font-bold text-gray-800">My Carbon Assets (DCO2)</h1>
        <div className="flex justify-end">
          <button
            onClick={() => setIsCurrent(true)}
            className={`px-4 py-2 rounded-full ${
              isCurrent ? ' text-green-800 font-bold' : 'text-gray-700'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setIsCurrent(false)}
            className={`px-4 py-2 rounded-full ${
              !isCurrent ? 'text-green-800 font-bold' : 'text-gray-700'
            }`}
          >
            Sold
          </button>
        </div>
      </div>

      <div className="bg-purple-100 rounded-lg p-6 space-y-6">
        <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
          <div>Date</div>
          <div>Quantity</div>
          <div>Project Name</div>
          <div>Price</div>
          <div>Status</div>
        </div>

        <div className="space-y-4">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset, index) => (
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
            <div className="text-gray-500">
              You have no {isCurrent ? 'current' : 'sold'} assets
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCarbonAssets;