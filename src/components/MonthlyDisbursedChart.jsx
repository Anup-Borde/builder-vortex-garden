"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyDisbursedChart = ({ viewType }) => {
  const monthlyDisbursedData = [
    { month: "Jan", amount: 23, volume: 156 },
    { month: "Feb", amount: 97, volume: 645 },
    { month: "Mar", amount: 80, volume: 532 },
    { month: "Apr", amount: 127, volume: 845 },
    { month: "May", amount: 165, volume: 1098 },
    { month: "Jun", amount: 214, volume: 1425 },
    { month: "Jul", amount: 151, volume: 1005 },
    { month: "Aug", amount: 140, volume: 932 },
    { month: "Sep", amount: 138, volume: 918 },
    { month: "Oct", amount: 139, volume: 925 },
    { month: "Nov", amount: 140, volume: 932 },
    { month: "Dec", amount: 140, volume: 932 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const unit = viewType === "volume" ? "" : " Cr";
      return (
        <div className="bg-white px-3 py-2 border border-[#E0E0E0] rounded-lg shadow-sm">
          <p className="text-sm font-medium text-[#282828]">
            {`${label} – ${value}${unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyDisbursedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E0E0E0"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#616060" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#616060" }}
            axisLine={false}
            tickLine={false}
            domain={[0, "dataMax + 50"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={viewType === "volume" ? "volume" : "amount"}
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyDisbursedChart;
