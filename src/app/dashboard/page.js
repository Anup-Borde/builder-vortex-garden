"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { PrimaryHeader } from "@/components/PrimaryHeader";
import MonthlyDisbursedChart from "@/components/MonthlyDisbursedChart";
import FunnelMetricsCard from "@/components/FunnelMetricsCard";
import CalendarComponent from "@/components/CalendarComponent";
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
  const [userContact] = useState("Darshna"); // You can get this from auth context
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarViewMode, setCalendarViewMode] = useState("monthly");
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarPosition, setCalendarPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    router.push("/signin");
  };

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
    setShowCalendar(true);

    // Map dropdown values to calendar view modes
    switch (value) {
      case "weekly":
        setCalendarViewMode("weekly");
        break;
      case "monthly":
        setCalendarViewMode("monthly");
        break;
      case "yearly":
        setCalendarViewMode("yearly");
        break;
      default:
        setCalendarViewMode("monthly");
    }
  };

  const handleCalendarViewChange = (viewMode) => {
    setCalendarViewMode(viewMode);
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - calendarPosition.x,
      y: e.clientY - calendarPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setCalendarPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const metricCards = [
    {
      title: "Total Leads Created",
      value: "1700",
      iconComponent: (
        <div className="relative">
          <div className="w-[105px] h-[105px] rounded-full bg-[#FFF6F6] absolute -top-6 -right-6"></div>
          <div className="relative z-10 w-10 h-10 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="20" cy="27" rx="11.6667" ry="5.83333" stroke="#FF4F4F" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="20" cy="13" r="6.66667" stroke="#FF4F4F" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M2.81836 0.642578C5.60517 1.04091 7.74805 3.43704 7.74805 6.33398C7.74783 9.5093 5.17336 12.0838 1.99805 12.084C1.50247 12.084 1.02129 12.0202 0.5625 11.9023C0.989705 11.4949 1.38154 11.0512 1.73145 10.5742C1.8195 10.5797 1.90862 10.584 1.99805 10.584C4.34493 10.5838 6.24783 8.68087 6.24805 6.33398C6.24805 4.47188 5.04976 2.88997 3.38281 2.31543C3.24321 1.73641 3.05383 1.17742 2.81836 0.642578Z" fill="#FF4F4F" transform="translate(24, 8)"/>
              <path d="M1.95313 0.503418C3.78037 1.40037 5.32721 2.49017 6.44172 3.63692C7.88177 5.11884 8.79466 6.91922 8.17441 8.56458C7.5537 10.2101 5.67885 10.9595 3.61856 11.1212C2.63966 11.1979 1.55292 11.1489 0.404774 10.9777C0.907251 10.5707 1.35414 10.1176 1.73658 9.61908C2.36453 9.66553 2.95654 9.66785 3.50133 9.62513C5.42725 9.47401 6.47634 8.81617 6.77094 8.03518C7.06512 7.25418 6.71158 6.06791 5.36563 4.68283C4.71657 4.01499 3.88035 3.35164 2.89427 2.73714C2.67614 1.98521 2.35845 1.23743 1.95313 0.503418Z" fill="#FF4F4F" transform="translate(26, 23) rotate(20.667)"/>
            </svg>
          </div>
        </div>
      ),
    },
    {
      title: "Approved",
      value: "1453",
      iconComponent: (
        <div className="relative">
          <div className="w-[105px] h-[105px] rounded-full bg-[#F7F9FF] absolute -top-6 -right-6"></div>
          <div className="relative z-10 w-10 h-10 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.33 15.7836C33.148 15.657 33.922 16.2184 33.972 17.0453C34.161 20.217 33.402 23.386 31.774 26.141C29.891 29.327 26.961 31.762 23.483 33.031C20.006 34.3 16.196 34.323 12.703 33.098C9.21 31.872 6.25 29.474 4.328 26.31C2.405 23.147 1.638 19.4152 2.159 15.7503C2.679 12.0854 4.455 8.7144 7.182 6.2115C9.909 3.7087 13.42 2.229 17.116 2.0244C20.311 1.8476 23.473 2.6332 26.201 4.2618C26.913 4.6865 27.055 5.6318 26.565 6.3001V6.3001C26.076 6.9685 25.141 7.1051 24.421 6.696C22.26 5.4689 19.783 4.8812 17.282 5.0196C14.279 5.1858 11.426 6.3881 9.21 8.4217C6.994 10.4553 5.552 13.1943 5.129 16.1721C4.706 19.1499 5.329 22.182 6.891 24.752C8.453 27.323 10.858 29.271 13.696 30.267C16.534 31.263 19.63 31.244 22.455 30.213C25.281 29.182 27.662 27.204 29.192 24.614C30.467 22.457 31.085 19.9879 30.991 17.5051C30.959 16.6774 31.511 15.9103 32.33 15.7836V15.7836Z" fill="#5774C1"/>
              <path d="M17.624 24.75C17.197 24.75 16.771 24.579 16.446 24.236L8.988 16.3701C8.337 15.685 8.337 14.5725 8.988 13.8862C9.638 13.2 10.692 13.2 11.342 13.8862L17.622 20.511L30.574 6.8482C31.225 6.1619 32.278 6.1619 32.929 6.8482C33.579 7.5332 33.579 8.6469 32.929 9.332L18.801 24.235C18.476 24.578 18.05 24.75 17.624 24.75Z" fill="#5774C1"/>
            </svg>
          </div>
        </div>
      ),
    },
    {
      title: "Total Disbursal Number",
      value: "1256",
      iconComponent: (
        <div className="relative">
          <div className="w-[105px] h-[105px] rounded-full bg-[#F2FFFF] absolute -top-6 -right-6"></div>
          <div className="relative z-10 w-10 h-10 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.341 4.8215C23.049 4.0258 23.565 2.976 24.413 2.9713L26.935 2.9572C27.278 2.9553 27.596 2.778 27.777 2.4874L28.37 1.5401C28.788 0.872 28.304 0.0055 27.516 0.0099L10.414 0.1052C10.072 0.1071 9.754 0.2844 9.572 0.575L8.98 1.5223C8.562 2.1904 9.045 3.0569 9.833 3.0525L11.469 3.0434C14.254 3.0278 16.869 3.1897 18.397 4.9254C18.87 5.4625 18.399 6.2048 17.684 6.2088L10.449 6.2491C10.106 6.251 9.788 6.4283 9.606 6.7189L9.014 7.6661C8.596 8.3343 9.079 9.2007 9.867 9.1964L19.452 9.143C19.523 9.1426 19.581 9.1996 19.581 9.2703V9.2703C19.593 11.4463 17.872 14.7839 12.156 14.8158L10.298 14.8261C9.746 14.8292 9.3 15.2794 9.304 15.8317L9.314 17.7545C9.315 17.9813 9.394 18.2009 9.536 18.3773L20.275 31.675C20.466 31.911 20.755 32.048 21.059 32.046L23.624 32.032C24.457 32.027 24.92 31.067 24.404 30.413L15.096 18.6159C14.596 17.9812 15.017 17.0247 15.809 16.8634C19.583 16.0952 22.806 13.7099 23.654 9.9861C23.766 9.4953 24.182 9.1167 24.686 9.1139L26.969 9.1012C27.312 9.0993 27.63 8.922 27.812 8.6314L28.404 7.6841C28.822 7.016 28.339 6.1495 27.551 6.1539L24.562 6.1706C24.052 6.1734 23.629 5.7875 23.493 5.2952C23.449 5.1357 23.398 4.9776 23.341 4.8215Z" fill="#078B8B"/>
            </svg>
          </div>
        </div>
      ),
    },
    {
      title: "Total Disbursal Amount",
      value: "25 Cr",
      iconComponent: (
        <div className="relative">
          <div className="w-[105px] h-[105px] rounded-full bg-[#FEF9EB] absolute -top-6 -right-6"></div>
          <div className="relative z-10 w-10 h-10 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.55 3.0669C32.38 2.7931 33.24 3.389 33.357 4.3197L34.986 17.2654C35.148 18.5538 33.841 19.4565 32.829 18.755L19.649 9.6174C18.638 8.9159 18.849 7.254 19.999 6.875L31.55 3.0669Z" fill="#F8A63F"/>
              <path d="M3.454 28.007L10.99 17.7232C11.311 17.2667 11.807 16.9558 12.366 16.8612C12.925 16.7666 13.499 16.8964 13.956 17.2211C14.419 17.5366 14.734 18.0193 14.829 18.5624C14.925 19.1054 14.795 19.6638 14.468 20.114L6.916 30.418C6.486 31.059 5.731 31.419 4.95 31.356C4.168 31.292 3.487 30.815 3.175 30.114C2.864 29.413 2.973 28.601 3.459 28L3.454 28.007Z" fill="#F8A63F"/>
              <path d="M18.726 22.387L26.01 11.9321C26.32 11.4683 26.808 11.146 27.365 11.0385C27.921 10.9311 28.498 11.0477 28.963 11.3617C29.434 11.6664 29.76 12.1418 29.869 12.6825C29.978 13.2231 29.861 13.7844 29.545 14.242L22.245 24.718C21.832 25.368 21.085 25.745 20.303 25.7C19.52 25.654 18.827 25.194 18.499 24.5C18.17 23.806 18.259 22.992 18.73 22.38L18.726 22.387Z" fill="#F8A63F"/>
              <path d="M21.916 21.866L14.598 17.5809C14.284 17.3832 13.851 17.3997 13.398 17.6267C12.945 17.8537 12.511 18.2718 12.194 18.7859C11.871 19.2952 11.688 19.8599 11.686 20.355C11.683 20.85 11.86 21.235 12.179 21.424L19.512 25.717C19.936 26.006 20.58 25.889 21.187 25.412C21.794 24.934 22.267 24.175 22.418 23.433C22.57 22.692 22.375 22.089 21.911 21.863L21.916 21.866Z" fill="#F8A63F"/>
            </svg>
          </div>
        </div>
      ),
    },
    {
      title: "ATS Trending",
      value: "35 k",
      iconComponent: (
        <div className="relative">
          <div className="w-[105px] h-[105px] rounded-full bg-[#FFF6F6] absolute -top-6 -right-6"></div>
          <div className="relative z-10 w-10 h-10 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.149 28.407C23.835 30.63 20.748 31.869 17.539 31.863C15.349 31.878 13.203 31.244 11.372 30.04C9.784 28.978 8.483 27.54 7.583 25.855C5.987 22.688 5.581 19.0532 6.442 15.6128C7.009 13.2655 8.098 11.0763 9.628 9.2078C9.842 8.964 10.125 8.791 10.439 8.7117C10.754 8.6324 11.085 8.6506 11.388 8.7639C11.69 8.8751 11.95 9.076 12.135 9.3396C12.319 9.6031 12.418 9.9167 12.419 10.2383C12.419 10.3017 12.546 15.7714 15.098 15.7714C15.326 15.7892 15.556 15.7508 15.766 15.6596C15.976 15.5684 16.16 15.4271 16.303 15.2482C16.589 14.8835 17.159 13.7103 16.398 10.6346C15.936 9.0702 15.813 7.4253 16.038 5.8096C16.262 4.1938 16.828 2.6445 17.698 1.2649C17.847 1.0475 18.012 0.8409 18.19 0.6466C18.391 0.4279 18.65 0.2703 18.937 0.1921C19.224 0.1138 19.527 0.1179 19.812 0.2039C20.096 0.29 20.351 0.4545 20.546 0.6786C20.742 0.9027 20.87 1.1773 20.917 1.471C21.328 4.5411 22.865 7.3491 25.229 9.3505C27.117 10.9798 28.549 13.0724 29.383 15.4226C30.113 17.6727 30.197 20.083 29.625 22.378C29.054 24.674 27.849 26.762 26.149 28.407Z" stroke="#FF3E79" strokeWidth="2.5"/>
            </svg>
          </div>
        </div>
      ),
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
      {/* Primary Header */}
      <PrimaryHeader onLogout={handleLogout} />

      {/* Secondary Header */}
      <Header />

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Title and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-[#282828]">
                Let’s get started
              </h1>
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
              <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-32 border-[#E0E0E0]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
              <Card key={index} className="bg-white border-[#E6E6E6] rounded-2xl shadow-sm overflow-hidden relative">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 z-10">
                      <p className="text-xl font-semibold text-[#999999] mb-2 leading-6">
                        {metric.title}
                      </p>
                      <span className="text-[32px] font-semibold text-[#434343] leading-[38.4px]">
                        {metric.value}
                      </span>
                    </div>
                    <div className="absolute right-0 top-0 h-full flex items-center">
                      {metric.iconComponent}
                    </div>
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

      {/* Calendar Modal */}
      {showCalendar && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setShowCalendar(false)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className="absolute cursor-move select-none"
            style={{
              left: calendarPosition.x || '50%',
              top: calendarPosition.y || '50%',
              transform: (!calendarPosition.x && !calendarPosition.y) ? 'translate(-50%, -50%)' : 'none',
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
          >
            <CalendarComponent
              key={`${calendarViewMode}-${showCalendar}`}
              selectedDates={selectedDates}
              onDateSelect={handleDateSelect}
              onViewChange={handleCalendarViewChange}
              initialViewMode={calendarViewMode}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
