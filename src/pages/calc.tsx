"use client";

import React from "react";
import Link from "next/link";

const CalculatorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-6">Personal Carbon Credit Calculator</h1>
      <p className="text-lg mb-10 max-w-lg">
        Estimate your carbon footprint and calculate your carbon credits based on your daily activities and consumption patterns. 
        This tool helps you take a step closer to a greener lifestyle by offering personalized suggestions to offset your carbon emissions.
      </p>

      {/* Next.js Link with a native button inside */}
      <Link href="/calculator">
        <button className="bg-[#5BB8AE] hover:bg-[#45998A] text-white px-8 py-3 rounded-lg font-medium">
          Go to Calculator
        </button>
      </Link>
    </div>
  );
};

export default CalculatorPage;
