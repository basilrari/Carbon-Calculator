import React from "react";
import Image from "next/image";

type LearnCardProps = {
  title: string;
  svgPath: string;
};

const LearnCard: React.FC<LearnCardProps> = ({ title, svgPath }) => {
  return (
    <div className="flex justify-between items-center bg-[#FBF8FF] shadow-sm rounded-md border border-gray-200 w-full h-28 sm:h-32 p-4 relative">
      <div className="text-sm sm:text-lg font-bold text-gray-800">{title}</div>
      <div className="w-16 sm:w-20 h-16 sm:h-20">
        <Image 
          src={svgPath} 
          alt={title} 
          width={80} 
          height={80} 
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default LearnCard;
