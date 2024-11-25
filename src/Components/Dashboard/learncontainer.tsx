import React from "react";
import LearnCard from "./learncard";

const LearnCardsContainer: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full space-x-4">
      <LearnCard title="Carbon Pools" svgPath="/images/Ellipse.svg" />
      {/* <LearnCard title="Energy Efficiency" svgPath="/images/efficiency.svg" />
      <LearnCard title="Sustainable Tech" svgPath="/images/tech.svg" />
      <LearnCard title="Green Solutions" svgPath="/images/solutions.svg" /> */}
    </div>
  );
};

export default LearnCardsContainer;
