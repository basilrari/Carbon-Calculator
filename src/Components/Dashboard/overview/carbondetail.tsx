import React from "react";

type StatItemProps = {
  value: number | string;
  label: string;
};

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-center p-4 sm:p-6">
      <div className="text-lg sm:text-2xl font-bold">{value}</div>
      <div className="text-gray-500 text-sm sm:text-base">{label}</div>
    </div>
  );
};

type StatsCardProps = {
  stats: StatItemProps[];
};

const StatsCard: React.FC<StatsCardProps> = ({ stats = [] }) => {
  if (!stats || stats.length === 0) {
    return <div>No stats available</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-sm rounded-md border border-gray-200 p-4 sm:p-10 w-full">
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <StatItem value={stat.value} label={stat.label} />
          {index < stats.length - 1 && (
            <div className="h-px sm:h-10 w-full sm:w-px bg-gray-500 mx-2 sm:mx-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatsCard;
