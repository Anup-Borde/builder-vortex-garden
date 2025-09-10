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
    notFound: "bg-[#FFE0E0] text-[#DF4444] border-[#DF4444]"
  };

  return (
    <div className={cn(
      "inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium",
      variants[variant]
    )}>
      {status}
    </div>
  );
};

export default function Employment() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeAnalysisTab, setActiveAnalysisTab] = useState("Income Analysis");

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  const handleBankingClick = () => {
    router.push("/banking");
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

              {/* Active Employment Details */}
              <div className="bg-[#F2F7FA] border border-[#E6E6E6] rounded-lg p-4">
                <div className="flex items-center gap-3 text-[#434343]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 10.5703H16M8 14.5703H16M8 18.5703H12M8 4.57031C8 5.67488 8.89543 6.57031 10 6.57031H14C15.1046 6.57031 16 5.67488 16 4.57031M8 4.57031C8 3.46574 8.89543 2.57031 10 2.57031H14C15.1046 2.57031 16 3.46574 16 4.57031M8 4.57031H7C4.79086 4.57031 3 6.36117 3 8.57031V18.5703C3 20.7795 4.79086 22.5703 7 22.5703H17C19.2091 22.5703 21 20.7795 21 18.5703V8.57031C21 6.36117 19.2091 4.57031 17 4.57031H16" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="font-semibold text-lg" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    Employment Details
                  </span>
                </div>
              </div>

              {[
                { icon: "bank", label: "Banking Details", onClick: handleBankingClick },
                { icon: "tick-double", label: "Enablers", onClick: null },
                { icon: "smile", label: "Remarks", onClick: null }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center gap-3 py-2 w-full text-left transition-colors",
                    item.onClick ? "text-[#999999] hover:text-[#434343] cursor-pointer" : "text-[#999999] cursor-default"
                  )}
                  disabled={!item.onClick}
                >
                  <div className="w-6 h-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" fill="currentColor" opacity="0.3" rx="4"/>
                    </svg>
                  </div>
                  <span className="font-medium text-lg" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    {item.label}
                  </span>
                </button>
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

            {/* Employment Details Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#434343]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                Employment details
              </h2>
            </div>

            {/* Employment Details Card */}
            <Card className="mb-8">
              <CardContent className="p-8">
                {/* Analysis Tab Navigation */}
                <div className="flex items-center bg-[#F6F6FA] border border-[#E6E6E6] rounded-lg p-1 mb-6 w-fit">
                  <button
                    onClick={() => setActiveAnalysisTab("Income Analysis")}
                    className={cn(
                      "px-8 py-3 rounded-lg text-lg font-semibold transition-all",
                      activeAnalysisTab === "Income Analysis" 
                        ? "bg-white text-[#434343] shadow-md" 
                        : "text-[#999999]"
                    )}
                    style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                  >
                    Income Analysis
                  </button>
                  <button
                    onClick={() => setActiveAnalysisTab("Loan Summary")}
                    className={cn(
                      "px-8 py-3 rounded-lg text-lg font-semibold transition-all",
                      activeAnalysisTab === "Loan Summary" 
                        ? "bg-white text-[#434343] shadow-md" 
                        : "text-[#999999]"
                    )}
                    style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                  >
                    Loan Summary
                  </button>
                </div>

                {/* Company Information */}
                <div className="grid grid-cols-4 gap-8 mb-8">
                  <div>
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Company name
                    </div>
                    <div className="text-[#434343] text-xl font-semibold flex items-center gap-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Earlysalary services pri...
                      <div className="flex gap-1">
                        <StatusPill status="UAN" variant="found" />
                        <StatusPill status="Verified" variant="found" />
                        <StatusPill status="SAL" variant="found" />
                        <StatusPill status="NA" variant="found" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Employment type
                    </div>
                    <div className="text-[#434343] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Permanent
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Designation
                    </div>
                    <div className="text-[#434343] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Sr. Software engineer
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Total experience
                    </div>
                    <div className="text-[#434343] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      8 years 5 month
                    </div>
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-4 gap-8 mb-8">
                  <div>
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Work mail
                    </div>
                    <div className="text-[#434343] text-xl font-semibold flex items-center gap-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      email.work@dot.com
                      <StatusPill status="Verified" variant="found" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      First jobber flag
                    </div>
                    <div className="text-[#079F9F] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Yes
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      A score BRE 1
                    </div>
                    <div className="text-[#079F9F] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      700
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      A score BRE 2
                    </div>
                    <div className="text-[#F8A63F] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      680
                    </div>
                  </div>
                </div>

                {/* Income Analysis Table */}
                {activeAnalysisTab === "Income Analysis" && (
                  <div className="border border-[#E6E6E6] rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-[#F2F7FA] border-b border-[#E6E6E6] p-4">
                      <div className="grid grid-cols-6 gap-4">
                        <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Income
                        </div>
                        <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Month 1
                        </div>
                        <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Month 2
                        </div>
                        <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Month 3
                        </div>
                        <div className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          FOIR
                        </div>
                      </div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-[#E6E6E6]">
                      {/* Declared */}
                      <div className="p-4">
                        <div className="grid grid-cols-6 gap-4 items-center">
                          <div className="text-[#999999] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Declared
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹70,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹70,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹70,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            70%
                          </div>
                        </div>
                      </div>

                      {/* Estimated */}
                      <div className="p-4 bg-[#FBFBFB]">
                        <div className="grid grid-cols-6 gap-4 items-center">
                          <div className="text-[#999999] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Estimated
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹30,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹30,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            -
                          </div>
                          <div className="text-[#FF3E79] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            35%
                          </div>
                        </div>
                      </div>

                      {/* Identified */}
                      <div className="p-4">
                        <div className="grid grid-cols-6 gap-4 items-center">
                          <div className="text-[#999999] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Identified
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹70,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹70,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹70,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            70%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Footer */}
                    <div className="bg-[#FBFBFB] border-t border-[#E6E6E6] p-6">
                      <div className="flex items-center justify-end gap-20">
                        <div className="flex items-center gap-6">
                          <span className="text-[#999999] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Obligation Amount
                          </span>
                          <span className="text-[#079F9F] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹70,000
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-[#999999] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Total FOIR
                          </span>
                          <span className="text-[#079F9F] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            70%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loan Summary Table */}
                {activeAnalysisTab === "Loan Summary" && (
                  <div className="border border-[#E6E6E6] rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-[#F2F7FA] border-b border-[#E6E6E6] p-4">
                      <div className="grid grid-cols-8 gap-4">
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Loan Type
                        </div>
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Validation
                        </div>
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Ownership
                        </div>
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Tenure
                        </div>
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Sanction Amount
                        </div>
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Open Date
                        </div>
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Calculated EMI
                        </div>
                        <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Considered FOIR
                        </div>
                      </div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-[#E6E6E6]">
                      {/* Personal Loan */}
                      <div className="p-4">
                        <div className="grid grid-cols-8 gap-4 items-center">
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Personal Loan
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium bg-[#E7EEFF] text-[#5774B7] border-[#5774B7]">
                              Banking
                            </div>
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Individual
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            24
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹30000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            13/04/2023
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            2000
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="w-6 h-6 border-2 border-[#595959] rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Auto Loan */}
                      <div className="p-4 bg-[#FBFBFB]">
                        <div className="grid grid-cols-8 gap-4 items-center">
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Auto Loan
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium bg-[#EEE7FF] text-[#7157B7] border-[#7157B7]">
                              Bureau
                            </div>
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            N/A
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            18
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹5,00,000
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            30/09/2025
                          </div>
                          <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            10,000
                          </div>
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-[#079F9F] rounded border-2 border-[#079F9F]">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full p-1">
                                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Footer */}
                    <div className="bg-[#FBFBFB] border-t border-[#E6E6E6] p-6">
                      <div className="flex items-center justify-end gap-20">
                        <div className="flex items-center gap-6">
                          <span className="text-[#999999] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Obligation Amount
                          </span>
                          <span className="text-[#079F9F] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            ₹70,000
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-[#999999] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            Total FOIR
                          </span>
                          <span className="text-[#079F9F] text-2xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                            70%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

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
