import React from "react";
import { Button } from "@/components/ui/button"; // Ensure the path for the Button component is correct
import { useRouter } from "next/router";

const CalculatorPage = () => {
  const router = useRouter();

  // Function to navigate to the calculator page
  const navigateToCalculator = () => {
    router.push("/calculator"); // Assuming your calculator is at the "/calculator" route
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-6">Personal Carbon Credit Calculator</h1>
      <p className="text-lg mb-10 max-w-lg">
        Estimate your carbon footprint and calculate your carbon credits based on your daily activities and consumption patterns. 
        This tool helps you take a step closer to a greener lifestyle by offering personalized suggestions to offset your carbon emissions.
      </p>
      <Button
        className="bg-[#5BB8AE] hover:bg-[#45998A] text-white px-8 py-3 rounded-lg font-medium"
        onClick={navigateToCalculator}
      >
        Go to Calculator
      </Button>
    </div>
  );
};

export default CalculatorPage; // Ensure the export matches the component name
