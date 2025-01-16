"use client"
import React, { useEffect, useState } from 'react'
import Individualasset from '../../Contracts/SellAssets/Individualasset'
import { z } from 'zod'
import { MyAssetArray, Individualassetprops, onAggregatedDataProps } from '@/types/global.types'

const carbonAssetSchema = z.object({
    id: z.number(),
    date: z.string(),
    quantity: z.number(),
    project: z.string(),
    price: z.number(),
    status: z.literal('current'),
});

const carbonAssetArraySchema = z.array(carbonAssetSchema);

const MyCarbAssets: React.FC<onAggregatedDataProps> = ({ onAggregatedData }) => {
    const [selectedItems, setSelectedItems] = useState<MyAssetArray>([]);
    const [carbonAssets, setCarbonAssets] = useState<MyAssetArray>([]);

    useEffect(() => {
        // Dummy data for carbon assets
        const dummyData = [
            { id: 1, date: '2025-01-01', quantity: 100, project: 'Project A', price: 200, status: 'current' },
            { id: 2, date: '2025-01-02', quantity: 150, project: 'Project B', price: 300, status: 'current' },
            { id: 3, date: '2025-01-03', quantity: 200, project: 'Project C', price: 400, status: 'current' },
        ];

        // Simulate successful data fetching
        const parsedResponse = carbonAssetArraySchema.safeParse(dummyData);

        if (parsedResponse.success) {
            setCarbonAssets(parsedResponse.data);
        } else {
            console.error('Invalid Data Format', parsedResponse.error);
        }
    }, []);

    const handleSelectionChange = (item: Individualassetprops | number) => {
        setSelectedItems((prev) => {
            if (typeof item === 'object') {
                return [...prev, item];
            } else {
                return prev.filter((selectedItem) => {
                    if (typeof selectedItem === 'object' && 'id' in selectedItem) {
                        return selectedItem.id !== item;
                    }
                    return true;
                });
            }
        });
    };

    useEffect(() => {
        const quantity = selectedItems.reduce((total, item) => total + item.quantity, 0);
        const price = selectedItems.reduce((total, item) => total + item.price, 0);

        onAggregatedData({
            totalQuantity: quantity,
            totalPrice: price,
            selectedCount: selectedItems.length,
        });
    }, [onAggregatedData, selectedItems]);

    return (
        <div>
            <div>
                <h1 className='text-lg font-semibold p-2'>My Carbon Assets (DCO2)</h1>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 space-y-4">
                <div className="flex justify-between text-gray-500 font-bold text-sm border-b border-gray-300 pb-2">
                    <div>Date</div>
                    <div>Quantity</div>
                    <div>Project Name</div>
                    <div>Price</div>
                    <div>Status</div> {/* Added Status Header */}
                </div>
                <div className="space-y-4">
                    {carbonAssets.length > 0 ? (
                        carbonAssets.map((asset, index) => (
                            <Individualasset
                                key={index}
                                id={asset.id}
                                date={asset.date}
                                quantity={asset.quantity}
                                project={asset.project}
                                price={asset.price}
                                status={asset.status} // Pass the status prop
                                onSelectionChange={(data) => handleSelectionChange(data)}
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

export default MyCarbAssets;
