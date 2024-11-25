import React from "react";

type StatItemProps = {
    value: string | number; 
    label: string;          
  };

const StatItem: React.FC<StatItemProps> = ({ value, label,}) => {
  return (
    <div className="text-center p-6">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-500">{label}</div>
    </div>
  );
};

const StatsCard = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md pr-10 pl-10  rounded-md border border-gray-200">
      <StatItem value="132" label="Total Carbon Locked" />
      <div className="h-10 w-px bg-gray-500 mx-4"></div>
      <StatItem value="$16000" label="Total Liquidity" />
      <div className="h-10 w-px bg-gray-500 mx-4"></div>
      <StatItem value="42" label="Total Carbon Retired" />
    </div>
  );
};

export default StatsCard;
