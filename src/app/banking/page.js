"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import FibeLogo from "@/components/FibeLogo";
import { cn } from "@/lib/utils";

// Validation status pill component
const StatusPill = ({ status, variant = "found" }) => {
  const variants = {
    found: "bg-[#E0FFE6] text-[#52B064] border-[#52B064]",
    error: "bg-[#FFF5E0] text-[#D9A023] border-[#D9A023]",
    notFound: "bg-[#FFE0E0] text-[#DF4444] border-[#DF4444]",
    verified: "bg-[#E0FFE6] text-[#52B064] border-[#52B064]",
    na: "bg-[#E6E6E6] text-[#999999] border-[#999999]"
  };

  return (
    <div className={cn(
      "inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium",
      variants[variant]
    )}>
      {status}
    </div>
  );
};

export default function Banking() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  const handleEmploymentClick = () => {
    router.push("/employment");
  };

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-[#F2F7FA]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E6E6E6] h-[106px] flex items-center px-10 z-20">
        <div className="flex items-center justify-between w-full max-w-[1338px] mx-auto">
          {/* Left side - Logo and Welcome */}
          <div className="flex items-center gap-8">
            <FibeLogo width={102} height={88} />
            
            <div className="flex items-center gap-8">
              <h1 className="text-[26px] font-semibold text-[#434343]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                Welcome, Divya✌🏼
              </h1>
              
              {/* Tab Navigation */}
              <div className="flex items-center bg-[#F6F6FA] border border-[#E6E6E6] rounded-full p-1">
                <button
                  onClick={handleDashboardClick}
                  className={cn(
                    "px-10 py-3 rounded-full text-lg font-semibold transition-all",
                    activeTab === "Dashboard" 
                      ? "bg-white text-[#434343] shadow-md" 
                      : "text-[#999999]"
                  )}
                  style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("Queue")}
                  className={cn(
                    "px-6 py-3 rounded-full text-lg font-semibold transition-all",
                    activeTab === "Queue" 
                      ? "bg-white text-[#434343] shadow-md" 
                      : "text-[#999999]"
                  )}
                  style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Queue
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="flex items-center bg-white border border-[#E6E6E6] rounded-full p-3">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M24.6641 24.666L29.3307 29.3327M27.9974 15.3327C27.9974 8.33708 22.3263 2.66602 15.3307 2.66602C8.33512 2.66602 2.66406 8.33708 2.66406 15.3327C2.66406 22.3283 8.33512 27.9993 15.3307 27.9993C22.3263 27.9993 27.9974 22.3283 27.9974 15.3327Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Notifications */}
            <div className="flex items-center bg-white border border-[#E6E6E6] rounded-full p-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M24.322 11.9663L23.5768 12.0508L23.5768 12.0508L24.322 11.9663ZM24.9182 17.2197L25.6635 17.1351L25.6635 17.1351L24.9182 17.2197ZM7.08697 17.2197L6.34176 17.1351L6.34176 17.1351L7.08697 17.2197ZM7.68322 11.9663L8.42844 12.0508L7.68322 11.9663ZM5.93299 19.8288L5.36188 19.3427L5.36188 19.3427L5.93299 19.8288ZM26.0722 19.8288L25.5011 20.315L25.5011 20.315L26.0722 19.8288Z" fill="#333333"/>
              </svg>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center bg-white border border-[#E6E6E6] rounded-full p-1 pr-4">
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/961568f701afedcd9374ca562822c1e2cba13ce1?width=143" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3 ml-3">
                <div className="w-3 h-3 bg-[#3DA70C] rounded-full"></div>
                <span className="text-[#434343] font-medium text-base" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Active
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10L12 14L17 10" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[262px] bg-white border-r border-[#E6E6E6] min-h-[calc(100vh-106px)] p-10">
          <div className="space-y-8">
            {/* Navigation Items */}
            <div className="space-y-6">
              <button 
                onClick={handleDashboardClick}
                className="flex items-center gap-3 text-[#999999] py-2 hover:text-[#434343] transition-colors w-full text-left"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.9989 22.4446C20.7247 22.0009 22 20.4346 22 18.5703V6.57031C22 4.36117 20.2091 2.57031 18 2.57031H6C3.79086 2.57031 2 4.36117 2 6.57031V18.5703C2 20.4346 3.27532 22.0009 5.00111 22.4446" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span className="font-medium text-lg" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Demographic
                </span>
              </button>

              <div className="flex items-center gap-3 text-[#999999] py-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16.8028 10.9778C17.0278 11.3255 17.4922 11.425 17.8399 11.2C18.1877 10.9749 18.2871 10.5106 18.0621 10.1629L17.4324 10.5703L16.8028 10.9778Z" fill="#999999"/>
                </svg>
                <span className="font-medium text-lg" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Bureau Summary
                </span>
              </div>

              <button 
                onClick={handleEmploymentClick}
                className="flex items-center gap-3 text-[#999999] py-2 hover:text-[#434343] transition-colors w-full text-left"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 10.5703H16M8 14.5703H16M8 18.5703H12M8 4.57031C8 5.67488 8.89543 6.57031 10 6.57031H14C15.1046 6.57031 16 5.67488 16 4.57031M8 4.57031C8 3.46574 8.89543 2.57031 10 2.57031H14C15.1046 2.57031 16 3.46574 16 4.57031M8 4.57031H7C4.79086 4.57031 3 6.36117 3 8.57031V18.5703C3 20.7795 4.79086 22.5703 7 22.5703H17C19.2091 22.5703 21 20.7795 21 18.5703V8.57031C21 6.36117 19.2091 4.57031 17 4.57031H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="font-medium text-lg" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Employment Details
                </span>
              </button>

              {/* Active Banking Details */}
              <div className="bg-[#F2F7FA] border border-[#E6E6E6] rounded-lg p-4">
                <div className="flex items-center gap-3 text-[#434343]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M2.03293 9.57031L19.9671 9.57031C20.9872 9.57031 21.3878 8.21889 20.539 7.6409L12.1438 1.92406C11.4512 1.4524 10.5488 1.4524 9.85618 1.92406L1.46102 7.6409C0.612236 8.21889 1.01282 9.57031 2.03293 9.57031Z" stroke="#333333" strokeWidth="1.5"/>
                  </svg>
                  <span className="font-semibold text-lg" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    Banking Details
                  </span>
                </div>
              </div>

              {[
                { icon: "tick-double", label: "Enablers" },
                { icon: "smile", label: "Remarks" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-[#999999] py-2">
                  <div className="w-6 h-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" fill="#999999" opacity="0.3" rx="4"/>
                    </svg>
                  </div>
                  <span className="font-medium text-lg" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <div className="max-w-[1258px]">
            {/* Auto Decision Banner */}
            <div className="bg-[rgba(224,255,230,0.5)] border border-[#52B064] rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-[#48AA55] text-base font-bold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Auto Decision : <span className="font-bold">24 EMI - POC 1 All products</span>
                </div>
                <div className="flex items-center gap-4">
                  <Input 
                    placeholder="Add your comment here..." 
                    className="w-[400px] bg-white border border-[#E6E6E6]"
                  />
                  <Button variant="ghost" size="sm">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M18.6667 21.834L24 16.5007M24 16.5007L18.6667 11.1673M24 16.5007L8 16.5007" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            {/* Bank Statement Details */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#434343]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                Bank statement details
              </h2>
            </div>

            {/* Bank Statement Table */}
            <Card className="mb-8">
              <CardContent className="p-0">
                {/* Table Header */}
                <div className="bg-[#F6F6FA] border-b border-[#E6E6E6] p-4 rounded-t-lg">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Sr. No
                    </div>
                    <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Observations
                    </div>
                    <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Month 1
                    </div>
                    <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Month2
                    </div>
                    <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Month3
                    </div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-[#E6E6E6]">
                  {[
                    { sr: "1", observation: "Monthly Credit Amount >5 Times Of Salary", month1: "Yes", month2: "No", month3: "Yes" },
                    { sr: "2", observation: "Bank Balance Lower Than 1k Or 5% Of Salary After 5 Days Of Credit", month1: "Yes", month2: "No", month3: "Yes" },
                    { sr: "3", observation: ">3DR Or CR For Stock Trading/ Betting", month1: "Yes", month2: "No", month3: "Yes" },
                    { sr: "4", observation: "Loan Credits Count", month1: "Yes", month2: "No", month3: "Yes" },
                    { sr: "5", observation: ">3CR/ DR In Month To Same Person", month1: "Yes", month2: "No", month3: "Yes" },
                    { sr: "6", observation: "Return/OD Charges/Penal Charges Count", month1: "Yes", month2: "No", month3: "Yes" },
                    { sr: "7", observation: "Cash Deposits>50% Of Ttal Credit Amount", month1: "Yes", month2: "No", month3: "Yes" },
                    { sr: "8", observation: "Cash Withdrawl>50% Of Ttal Credit Amount", month1: "Yes", month2: "No", month3: "Yes" },
                    { sr: "9", observation: "Closing Balance<500 Count In A Month", month1: "Yes", month2: "No", month3: "Yes" }
                  ].map((row, index) => (
                    <div key={index} className={cn("p-4", index % 2 === 1 && "bg-[#FBFBFB]")}>
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="text-[#999999] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          {row.sr}
                        </div>
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          {row.observation}
                        </div>
                        <div className="text-[#079F9F] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          {row.month1}
                        </div>
                        <div className="text-[#FF3E79] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          {row.month2}
                        </div>
                        <div className="text-[#079F9F] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          {row.month3}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Income Analysis */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#434343] mb-6" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    Income Analysis
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#FAFEFF] border border-[#E6E6E6] rounded-lg p-6">
                      <div className="text-[#999999] text-sm mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Average Monthly Salary
                      </div>
                      <div className="text-[#434343] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        ₹90,000
                      </div>
                    </div>
                    <div className="bg-[#FAFEFF] border border-[#E6E6E6] rounded-lg p-6">
                      <div className="text-[#999999] text-sm mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Additional Income 
                      </div>
                      <div className="text-[#434343] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        ₹20,000
                      </div>
                    </div>
                    <div className="bg-[#FAFEFF] border border-[#E6E6E6] rounded-lg p-6">
                      <div className="text-[#999999] text-sm mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Rental Income(3 months) 
                      </div>
                      <div className="text-[#434343] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        NIL
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#FAFEFF] border border-[#E6E6E6] rounded-lg p-6">
                      <div className="text-[#999999] text-sm mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Other Income
                      </div>
                      <div className="text-[#434343] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        ₹15,000
                      </div>
                    </div>
                    <div className="bg-[#FAFEFF] border border-[#E6E6E6] rounded-lg p-6">
                      <div className="text-[#999999] text-sm mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Salary Credit Date
                      </div>
                      <div className="text-[#434343] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        30th
                      </div>
                    </div>
                    <div className="bg-[#FAFEFF] border border-[#E6E6E6] rounded-lg p-6">
                      <div className="text-[#999999] text-sm mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Salary Delays ( in days )
                      </div>
                      <div className="text-[#434343] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        2-3
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents and AI Insights */}
              <div className="space-y-6">
                {/* AI Based Insights */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6.89443 2.55279C6.72504 2.214 6.37877 2 6 2C5.62123 2 5.27496 2.214 5.10557 2.55279L4.70186 3.36022C4.37746 4.00902 4.30469 4.1281 4.21639 4.21639C4.1281 4.30469 4.00902 4.37746 3.36022 4.70186L2.55279 5.10557C2.214 5.27496 2 5.62123 2 6C2 6.37877 2.214 6.72504 2.55279 6.89443L3.36022 7.29814C4.00902 7.62254 4.1281 7.69531 4.21639 7.78361C4.30469 7.8719 4.37746 7.99098 4.70186 8.63978L5.10557 9.44721C5.27496 9.786 5.62123 10 6 10C6.37877 10 6.72504 9.786 6.89443 9.44721L7.29814 8.63978C7.62254 7.99098 7.69531 7.8719 7.78361 7.78361C7.8719 7.69531 7.99098 7.62254 8.63978 7.29814L9.44721 6.89443C9.786 6.72504 10 6.37877 10 6C10 5.62123 9.786 5.27496 9.44721 5.10557L8.63978 4.70186C7.99098 4.37746 7.8719 4.30469 7.78361 4.21639C7.69531 4.1281 7.62254 4.00902 7.29814 3.36022L6.89443 2.55279Z" fill="url(#paint0_linear)"/>
                      </svg>
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#FF3E79] to-[#F8A63F] bg-clip-text text-transparent" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        AI Based Insights
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        "Cash Deposits>50% of ttal credit amount",
                        "Cash Deposits>50% of ttal credit amount",
                        "Cash Deposits>50% of ttal credit amount",
                        "Cash Deposits>50% of ttal credit amount",
                        "Cash Deposits>50% of ttal credit amount",
                        "Cash Deposits>50% of ttal credit amount"
                      ].map((insight, index) => (
                        <div key={index} className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          {insight}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-[#434343] mb-6" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Documents
                    </h3>
                    
                    {/* Bank Statements */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-[#FAFEFF] border border-[#E6E6E6] rounded-lg mb-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="space-y-2">
                          <div className="text-[#079F9F] text-base font-semibold underline" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Bank Account Statement
                          </div>
                          <div className="text-[#999999] text-sm" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            05:54:19
                          </div>
                          <div className="text-[#999999] text-sm" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            2025-05-06
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Suspension Logs */}
                    <div className="bg-[#FAFEFF] border border-[#E6E6E6] rounded-lg p-6 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#999999] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Suspension Logs Count
                        </span>
                        <span className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          01
                        </span>
                      </div>
                    </div>

                    {/* Fraud Flags */}
                    <div className="border border-[#E6E6E6] rounded-lg overflow-hidden">
                      <div className="bg-[#F2F7FA] border-b border-[#E6E6E6] p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Fraud Flag
                          </span>
                          <span className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Verification
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[#000000] text-base" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Internal Fraud Flag
                          </span>
                          <StatusPill status="Verified" variant="verified" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#000000] text-base" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Perfois Fraud Flag
                          </span>
                          <StatusPill status="Verified" variant="verified" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#000000] text-base" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Internal Backend Fraud Flag
                          </span>
                          <StatusPill status="N/A" variant="na" />
                        </div>
                      </div>
                    </div>

                    {/* Bank Statement Details Button */}
                    <Button className="w-full bg-[#079F9F] hover:bg-[#068888] text-white mt-4">
                      Bank Statement Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 flex-wrap">
                  <Button variant="outline" className="border-[#079F9F] text-[#079F9F] bg-white">
                    Audit comments
                  </Button>
                  <Button variant="outline" className="border-[#079F9F] text-[#079F9F] bg-white">
                    Generate CAM
                  </Button>
                  <Button className="bg-[#5774B7] text-white hover:bg-[#4A63A5]">
                    Recommend
                  </Button>
                  <Button className="bg-[#DF4444] text-white hover:bg-[#C93C3C]">
                    Reject
                  </Button>
                  <Button className="bg-[#F8A63F] text-white hover:bg-[#E69230]">
                    Suspend
                  </Button>
                  <Button className="bg-[#1AAC03] text-white hover:bg-[#179902]">
                    Approved
                  </Button>
                  <Button className="bg-[#079F9F] text-white hover:bg-[#068888]">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
