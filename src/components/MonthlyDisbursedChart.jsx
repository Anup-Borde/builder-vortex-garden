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

const MonthlyDisbursedChart = () => {
  const monthlyDisbursedData = [
    { month: "Jan", amount: 23 },
    { month: "Feb", amount: 97 },
    { month: "Mar", amount: 80 },
    { month: "Apr", amount: 127 },
    { month: "May", amount: 165 },
    { month: "Jun", amount: 214 },
    { month: "Jul", amount: 151 },
    { month: "Aug", amount: 140 },
    { month: "Sep", amount: 138 },
    { month: "Oct", amount: 139 },
    { month: "Nov", amount: 140 },
    { month: "Dec", amount: 140 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 border border-[#E0E0E0] rounded-lg shadow-sm">
          <p className="text-sm font-medium text-[#282828]">
            {`${label} – ${payload[0].value} Cr`}
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
            dataKey="amount"
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
