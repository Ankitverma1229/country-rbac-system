import React from "react";
import { MoreHorizontal, TrendingUp } from "lucide-react";

const MetricsCard = ({ title, value, Icon }) => {
  return (
    <div className="rounded-2xl p-5 shadow-md bg-[#EAF4FA] flex flex-col justify-between w-full sm:w-64  md:w-[30%] backdrop-blur-lg min-h-[12rem]">
      <div className="flex justify-between items-center mb-4">
        <Icon className="text-gray-700 w-7 h-7" />
        <button className="text-gray-600 hover:text-gray-900 p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-gray-700 text-3xl font-bold">{value}</p>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <div className="bg-[#d8f2ef] text-[#749b94] flex items-center gap-2 rounded-md px-2 py-1">
          <TrendingUp className="w-4 h-4" />
          <span>{value}</span>
        </div>
        <span className="text-gray-500 text-sm">Compare to last week</span>
      </div>
    </div>
  );
};

export default MetricsCard;
