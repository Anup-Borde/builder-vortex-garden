"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import MonthlyDisbursedChart from "@/components/MonthlyDisbursedChart";
import FunnelMetricsCard from "@/components/FunnelMetricsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Users,
  CheckCircle,
  IndianRupee,
  BarChart3,
  Calculator,
  UserPlus,
  FileText,
  Play,
  HelpCircle,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [chartViewType, setChartViewType] = useState("value");
  const [userContact] = useState("user@example.com"); // You can get this from auth context

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    router.push("/signin");
  };

  const metricCards = [
    {
      title: "Total Leads Created",
      value: "1700",
      trend: "↑",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Approved",
      value: "1453",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Total Loans Disbursed",
      value: "1256",
      icon: IndianRupee,
      color: "text-purple-600",
    },
    {
      title: "Amount Disbursed",
      value: "25 Cr",
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      title: "ATS Trending",
      value: "35K",
      icon: BarChart3,
      color: "text-teal-600",
    },
  ];

  const quickLinks = [
    {
      title: "Calculator EMI",
      icon: Calculator,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Quick Eligibility Calculator",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Add Leads",
      icon: UserPlus,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Reports",
      icon: FileText,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Video link",
      icon: Play,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "How to use LTD? /FAQ",
      icon: HelpCircle,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Title and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-[#282828]">
                Dashboard
              </h1>
              <p className="text-[#616060]">Welcome back, {userContact}</p>
            </div>
            <div className="flex space-x-4">
              <Select
                value={selectedSegment}
                onValueChange={setSelectedSegment}
              >
                <SelectTrigger className="w-48 border-[#E0E0E0]">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="segment1">Segment 1</SelectItem>
                  <SelectItem value="segment2">Segment 2</SelectItem>
                  <SelectItem value="segment3">Segment 3</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedMerchant}
                onValueChange={setSelectedMerchant}
              >
                <SelectTrigger className="w-48 border-[#E0E0E0]">
                  <SelectValue placeholder="Merchant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="merchant1">Merchant 1</SelectItem>
                  <SelectItem value="merchant2">Merchant 2</SelectItem>
                  <SelectItem value="merchant3">Merchant 3</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32 border-[#E0E0E0]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {metricCards.map((metric, index) => (
              <Card key={index} className="bg-white border-[#E0E0E0] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#616060] mb-1">
                        {metric.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-semibold text-[#282828]">
                          {metric.value}
                        </span>
                        {metric.trend && (
                          <span className="text-green-600 font-medium">
                            {metric.trend}
                          </span>
                        )}
                      </div>
                    </div>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Quick Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <Card className="bg-white border-[#E0E0E0] shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-[#282828]">
                    Monthly Disbursed Amount
                  </CardTitle>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setChartViewType("value")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        chartViewType === "value"
                          ? "bg-white text-[#282828] shadow-sm"
                          : "text-[#616060] hover:text-[#282828]"
                      }`}
                    >
                      Value
                    </button>
                    <button
                      onClick={() => setChartViewType("volume")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        chartViewType === "volume"
                          ? "bg-white text-[#282828] shadow-sm"
                          : "text-[#616060] hover:text-[#282828]"
                      }`}
                    >
                      Volumes
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <MonthlyDisbursedChart viewType={chartViewType} />
              </CardContent>
            </Card>

            {/* Funnel Section */}
            <Card className="bg-white border-[#E0E0E0] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#282828]">
                  Funnel Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FunnelMetricsCard />
              </CardContent>
            </Card>

            {/* Quick Links Panel */}
            <Card className="bg-white border-[#E0E0E0] shadow-sm md:col-span-2 xl:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#282828]">
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickLinks.map((link, index) => (
                    <button
                      key={index}
                      className="p-3 rounded-lg border border-[#E0E0E0] hover:shadow-md transition-all duration-200 text-left group"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${link.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                      >
                        <link.icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-medium text-[#282828] text-xs leading-tight">
                        {link.title}
                      </h3>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
