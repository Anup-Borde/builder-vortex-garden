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
      label: "Lead to Disbursed (%)",
      value: "73.8%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Lead to Disbursed TAT (min)",
      value: "45",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      label: "Approved to Disbursed %",
      value: "86.4%",
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      label: "Approved to Disbursed TAT (min)",
      value: "18",
      icon: Target,
      color: "text-teal-600",
    },
  ];

  return (
    <div className="w-full h-64 flex flex-col justify-center">
      <div className="space-y-4">
        {funnelData.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gray-50`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <span className="text-sm text-[#616060] font-normal">
                {metric.label}
              </span>
            </div>
            <span className="text-lg font-medium text-[#282828]">
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelMetricsCard;
