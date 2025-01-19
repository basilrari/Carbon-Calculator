import React from "react";
import Image from "next/image";

type LearnCardProps = {
  title: string;
  svgPath: string;
};

const LearnCard: React.FC<LearnCardProps> = ({ title, svgPath }) => {
  return (
    <div className="flex justify-between bg-[#FBF8FF] shadow-sm rounded-md border border-gray-200 w-64 h-32 p-4 relative">
      <div className="text-lg font-bold text-gray-800">{title}</div>
      <div className="w-20 h-20 absolute bottom-0 right-0">
        <Image 
          src={svgPath} 
          alt={title} 
          width={80} 
          height={80} 
        />
      </div>
    </div>
  );
};

export default LearnCard;