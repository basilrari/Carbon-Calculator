import React from "react";

type LearnCardProps = {
  title: string; 
  svgPath: string; 
}

const LearnCard: React.FC<LearnCardProps> = ({ title, svgPath }) => {
  return (
    <div className="flex justify-between bg-[#FBF8FF] shadow-sm rounded-md border border-gray-200 w-64 h-32 p-4 relative">
      <div className="text-lg font-bold text-gray-800">{title}</div>
      <div className="w-30 h-30 absolute bottom-0 right-0">
      <img src={svgPath} alt={title} className="w-full h-full " />
      </div>
    </div>
  );
};

export default LearnCard;
