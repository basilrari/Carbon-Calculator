import React from "react";

type StatItemProps = {
  value: number | string;
  label: string;
};

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-center p-6">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-500">{label}</div>
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
    <div className="flex justify-between items-center bg-white shadow-sm pr-10 pl-10 rounded-md border border-gray-200">
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <StatItem value={stat.value} label={stat.label} />
          {index < stats.length - 1 && (
            <div className="h-10 w-px bg-gray-500 mx-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatsCard;