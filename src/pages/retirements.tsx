"use client";

import React, { useState } from "react";
import ItemDisplay from "@/Components/itemDisplay";

const TestPage = () => {
  const dummyData = [
    { 
      Date: "2025-02-19", 
      Quantity: 5, 
      "Project Name": "North Pikounda REDD+", 
      Price: 100, 
      View: { type: 'button', label: 'View', onClick: () => alert("Viewing North Pikounda") } 
    },
    { 
      Date: "2025-02-20", 
      Quantity: { type: 'input', value: 0, onChange: (value: string) => handleQuantityChange(1, value) }, 
      "Project Name": "Panama Wind Energy Private Limited", 
      Price: 200, 
      Buy: { type: 'button', label: 'Buy', onClick: () => alert("Buying Panama Wind") } 
    },
  ];

  const headers = ["Date", "Quantity", "Project Name", "Price", "View"];

  const [data, setData] = useState(dummyData);

  const handleQuantityChange = (index: number, value: string) => {
    const newData = [...data];
    if (newData[index].Quantity.type === 'input') {
      newData[index].Quantity.value = value;
      setData(newData);
      alert(`Quantity for item ${index} changed to ${value}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Test Item Display Component</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Table View (Display Mode)</h2>
        <ItemDisplay
          items={data} 
          headers={headers} 
          quantityMode="display" 
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Table View (Input Mode)</h2>
        <ItemDisplay 
          items={data} 
          headers={headers} 
          quantityMode="input" 
          onQuantityChange={handleQuantityChange} 
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">JSON View</h2>
        <ItemDisplay 
          items={data} 
          headers={headers} 
          displayAsJson={true} 
        />
      </div>
    </div>
  );
};

export default TestPage;