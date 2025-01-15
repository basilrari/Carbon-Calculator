import React from "react";
import LearnCard from "./learncard";

const LearnCardsContainer: React.FC = () => {
  const learnCardsData = [
    { title: "Carbon Pools", svgPath: "/images/carbonpools.svg" },
    { title: "Carbon Credits", svgPath: "/images/carboncredit.svg" },
    { title: "Retirements", svgPath: "/images/retirement.svg" },
    { title: "Carbon Trading", svgPath: "/images/carbontrading.svg" },
  ];

  return (
    <div className="flex justify-between items-center space-x-16 ml-2">
      {learnCardsData.map((card, index) => (
        <LearnCard key={index} title={card.title} svgPath={card.svgPath} />
      ))}
    </div>
  );
};

export default LearnCardsContainer;