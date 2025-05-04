"use client";

import React, { useState } from "react";

const CalculatorPage = () => {
  const EMISSION_FACTORS = {
    PETROL: 2.31, // kg CO2/L
    DIESEL: 2.68, // kg CO2/L
    ELECTRIC: 0.82, // kg CO2/kWh
    HYBRID: 1.5, // kg CO2/L 
    LPG: 2.983, // kg CO2/kg
    WASTE: 2.86, // kg CO2/kg
    SHOPPING: 0.0083,
    PUBLIC_TRANSPORT: 0.1516, // kg CO2 per INR spent
  };

  const [transports, setTransports] = useState([
    { type: "car", fuel: "petrol", distance: "", efficiency: 15 },
  ]);

  const [inputs, setInputs] = useState({
    electricityUsage: "", // in kWh
    lpgUsage: "", // in kg
    wasteGenerated: "", // in kg
    shoppingAmount: "", // in INR
    publicTransportDistance: "", // in km
  });

  const [footprint, setFootprint] = useState({
    transport: 0,
    energy: 0,
    waste: 0,
    shopping: 0,
    total: 0,
  });

  const handleTransportChange = (index, field, value) => {
    const updatedTransports = [...transports];
    
    // For numeric fields, ensure values are not negative
    if (field === "distance") {
      // Allow empty string or non-negative number
      value = value === "" ? "" : Math.max(0, parseFloat(value) || 0).toString();
    } else if (field === "efficiency") {
      // Efficiency should be at least 0.1
      value = value === "" ? "" : Math.max(0.1, parseFloat(value) || 0.1).toString();
    }
    
    updatedTransports[index][field] = value;
    setTransports(updatedTransports);
  };

  const addTransport = () => {
    setTransports([
      ...transports,
      { type: "car", fuel: "petrol", distance: "", efficiency: 15 },
    ]);
  };

  const removeTransport = (index) => {
    const updatedTransports = transports.filter((_, i) => i !== index);
    setTransports(updatedTransports);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // For number inputs, ensure values are not negative
    if (type === "number" && value !== "") {
      const numValue = parseFloat(value);
      if (numValue < 0) {
        return; // Ignore negative values
      }
    }
    
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculateCarbonFootprint = () => {
    const transportEmissions = transports.reduce((total, transport) => {
      const emissionFactor =
        transport.fuel === "petrol"
          ? EMISSION_FACTORS.PETROL
          : transport.fuel === "diesel"
          ? EMISSION_FACTORS.DIESEL
          : transport.fuel === "electric"
          ? EMISSION_FACTORS.ELECTRIC
          : EMISSION_FACTORS.HYBRID;

      const distance = parseFloat(transport.distance) || 0;
      const efficiency = parseFloat(transport.efficiency) || 1;

      const emissions = (distance / efficiency) * emissionFactor;

      return total + emissions;
    }, 0);

    const publicTransportEmissions =
      (parseFloat(inputs.publicTransportDistance) || 0) * EMISSION_FACTORS.PUBLIC_TRANSPORT;

    const energyEmissions =
      (parseFloat(inputs.electricityUsage) || 0) * EMISSION_FACTORS.ELECTRIC +
      (parseFloat(inputs.lpgUsage) || 0) * EMISSION_FACTORS.LPG;

    const wasteEmissions = (parseFloat(inputs.wasteGenerated) || 0) * EMISSION_FACTORS.WASTE;

    const shoppingEmissions = (parseFloat(inputs.shoppingAmount) || 0) * EMISSION_FACTORS.SHOPPING;

    const totalEmissions =
      transportEmissions +
      publicTransportEmissions +
      energyEmissions +
      wasteEmissions +
      shoppingEmissions;

    setFootprint({
      transport: transportEmissions + publicTransportEmissions,
      energy: energyEmissions,
      waste: wasteEmissions,
      shopping: shoppingEmissions,
      total: totalEmissions,
    });
  };

  return (
    <div
      className="flex flex-col h-screen overflow-y-auto p-6 w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <h1 className="text-3xl font-bold text-green-700 text-center">
         Carbon Footprint Calculator
      </h1>
      <p className="text-center text-gray-700 mt-2">
        Enter detailed information to get a precise estimate of your carbon
        footprint.
      </p>

      <div className="w-full mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Transport</h2>

        {transports.map((transport, index) => (
          <div key={index} className="mb-4 border-b border-gray-300 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Transport Type:
                </label>
                <select
                  value={transport.type}
                  onChange={(e) =>
                    handleTransportChange(index, "type", e.target.value)
                  }
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-600"
                >
                  <option value="car">Car</option>
                  <option value="two-wheeler">Two-Wheeler</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Fuel Type:
                </label>
                <select
                  value={transport.fuel}
                  onChange={(e) =>
                    handleTransportChange(index, "fuel", e.target.value)
                  }
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-600"
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Distance (km):
                </label>
                <input
                  type="number"
                  min="0"
                  value={transport.distance}
                  onChange={(e) =>
                    handleTransportChange(index, "distance", e.target.value)
                  }
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-600"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Fuel Efficiency (km/L):
                </label>
                <input
                  type="number"
                  min="0.1"
                  value={transport.efficiency}
                  onChange={(e) =>
                    handleTransportChange(index, "efficiency", e.target.value)
                  }
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-600"
                  placeholder="15"
                />
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => removeTransport(index)}
                className="text-red-600 text-sm font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addTransport}
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          + Add Another Transport
        </button>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            Total Distance Traveled on Public Transport (km):
          </label>
          <input
            type="number"
            min="0"
            name="publicTransportDistance"
            value={inputs.publicTransportDistance}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-600"
            placeholder="0"
          />
        </div>

        <h2 className="text-lg font-bold text-gray-800 mt-6">
          Energy, Waste & Shopping
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Electricity Usage (kWh)", name: "electricityUsage" },
            { label: "LPG Usage (kg)", name: "lpgUsage" },
            { label: "Waste Generated (kg)", name: "wasteGenerated" },
            { label: "Shopping Amount (INR)", name: "shoppingAmount" },
          ].map(({ label, name }) => (
            <div key={name} className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">
                {label}:
              </label>
                              <input
                type="number"
                min="0"
                name={name}
                value={inputs[name as keyof typeof inputs]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-600"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={calculateCarbonFootprint}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md"
          >
            Calculate
          </button>
        </div>

        <div className="mt-8 p-6 bg-green-50 rounded-lg shadow-lg">
  <h2 className="text-xl font-bold text-green-800 text-center mb-4">
       Your Estimated Carbon Footprint
  </h2>
  <div className="text-center">
    <p className="text-3xl font-bold text-green-700 mb-2">
      {footprint.total.toFixed(2)} kg CO2<span className="text-xs align-super text-green-700">*</span>
    </p>
    <p className="text-md text-gray-600 font-medium mb-6">
      Total Carbon Emissions
    </p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="bg-green-100 rounded-md p-4 shadow-sm flex flex-col items-center">
      <h3 className="text-lg font-semibold text-green-800">Transport</h3>
      <p className="text-2xl font-bold text-green-600 mt-2">
        {footprint.transport.toFixed(2)} kg CO2<span className="text-xs align-super text-green-600">*</span>
      </p>
    </div>
    <div className="bg-green-100 rounded-md p-4 shadow-sm flex flex-col items-center">
      <h3 className="text-lg font-semibold text-green-800">Energy</h3>
      <p className="text-2xl font-bold text-green-600 mt-2">
        {footprint.energy.toFixed(2)} kg CO2<span className="text-xs align-super text-green-600">*</span>
      </p>
    </div>
    <div className="bg-green-100 rounded-md p-4 shadow-sm flex flex-col items-center">
      <h3 className="text-lg font-semibold text-green-800">Waste</h3>
      <p className="text-2xl font-bold text-green-600 mt-2">
        {footprint.waste.toFixed(2)} kg CO2<span className="text-xs align-super text-green-600">*</span>
      </p>
    </div>
    <div className="bg-green-100 rounded-md p-4 shadow-sm flex flex-col items-center">
      <h3 className="text-lg font-semibold text-green-800">Shopping</h3>
      <p className="text-2xl font-bold text-green-600 mt-2">
        {footprint.shopping.toFixed(2)} kg CO2<span className="text-xs align-super text-green-600">*</span>
      </p>
    </div>
  </div>
  <p className="text-xs text-gray-500 mt-4 ">
    * This is an estimated value based on input data and standard emission factors. Actual values may vary depending on additional factors not considered     in this calculator.
  </p>
</div>
      </div>
    </div>
  );
};

export default CalculatorPage;