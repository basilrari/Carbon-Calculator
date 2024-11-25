import React from "react";

// Define the types for the LearnCard props
type LearnCardProps = {
  title: string; // The title of the card
  svgPath: string; // The SVG component
};

const LearnCard: React.FC<LearnCardProps> = ({ title, svgPath }) => {
  return (
    <div className="flex justify-between bg-[#FBF8FF] shadow-sm rounded-md border border-gray-200 w-64 h-32 p-4">
      <div className="text-lg font-semibold text-gray-800">{title}</div>
      <div className="w-12 h-12 absolute botom-2 ">
      <img src={svgPath} alt={title} className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default LearnCard;
