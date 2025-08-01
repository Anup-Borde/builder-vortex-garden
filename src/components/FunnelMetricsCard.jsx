"use client";

import { TrendingUp, Users, Clock, CheckCircle, Target } from "lucide-react";

const FunnelMetricsCard = () => {
  const funnelData = [
    {
      label: "Total Leads Created",
      value: "1,700",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "BRE 1",
      value: "73.8%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    { label: "BS pending", value: "45", icon: Clock, color: "text-orange-600" },
    {
      label: "BRE 2",
      value: "86.4%",
      icon: CheckCircle,
      color: "text-purple-600",
    },
    { label: "Approved", value: "18", icon: Target, color: "text-teal-600" },
    {
      label: "KYC Completed",
      value: "123",
      icon: CheckCircle,
      color: "text-indigo-600",
    },
    {
      label: "Nach Completed",
      value: "99",
      icon: CheckCircle,
      color: "text-pink-600",
    },
    {
      label: "Disbursed",
      value: "87",
      icon: Target,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="w-full h-64 flex flex-col justify-center">
      <div className="space-y-2 md:overflow-y-scroll md:max-h-56 md:pr-4 md:scrollbar-thin md:scrollbar-thumb-gray-400 md:scrollbar-track-gray-200 overflow-y-visible max-h-none">
        {/* Add a wrapper div with extra bottom space to force scroll on desktop only */}
        <div className="md:pb-10">
          {funnelData.map((metric, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-gray-50">
                  <metric.icon className={`w-3 h-3 ${metric.color}`} />
                </div>
                <span className="text-xs text-[#616060] font-normal">
                  {metric.label}
                </span>
              </div>
              <span className="text-sm font-medium text-[#282828]">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunnelMetricsCard;
