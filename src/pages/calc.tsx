"use client";

import React from "react";
import Link from "next/link";

const CalculatorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-white">
      <div className="bg-gradient-to-b from-[#FEEDCC] to-[#3E8E86] bg-opacity-80 p-10 rounded-2xl shadow-xl max-w-lg">
        <h1 className="text-4xl font-bold mb-6 text-[#2F4F4F]">Personal Carbon Credit Calculator</h1>
        <p className="text-lg mb-10 text-white">
          Estimate your carbon footprint and calculate your carbon credits based on your daily activities and consumption patterns. 
          Take a step towards a greener lifestyle with personalized suggestions to offset your carbon emissions.
        </p>

        <Link href="/calculator">
          <button className="bg-[#5BB8AE] hover:bg-[#45998A] text-white px-8 py-3 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105">
            Go to Calculator
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CalculatorPage;
