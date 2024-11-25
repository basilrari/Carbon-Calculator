import React from "react";
import LearnCard from "./learncard";

const LearnCardsContainer: React.FC = () => {
  return (
    <div className="flex justify-between items-center space-x-16 ml-2">
      <LearnCard title="Carbon Pools" svgPath="/images/carbonpools.svg" />
      <LearnCard title="Carbon Credits" svgPath="/images/carboncredit.svg" />
      <LearnCard title="Retirements" svgPath="/images/retirement.svg" />
      <LearnCard title="Carbon Trading" svgPath="/images/carbontrading.svg" />
    </div>
  );
};

export default LearnCardsContainer;
