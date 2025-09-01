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

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-[#F2F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E6E6E6] h-[106px] flex items-center px-10">
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
                  onClick={() => setActiveTab("Dashboard")}
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
              <div className="bg-[#F2F7FA] border border-[#E6E6E6] rounded-lg p-4">
                <div className="flex items-center gap-3 text-[#434343]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18.9989 22.4446C20.7247 22.0009 22 20.4346 22 18.5703V6.57031C22 4.36117 20.2091 2.57031 18 2.57031H6C3.79086 2.57031 2 4.36117 2 6.57031V18.5703C2 20.4346 3.27532 22.0009 5.00111 22.4446" stroke="#333333" strokeWidth="1.5"/>
                  </svg>
                  <span className="font-semibold text-lg" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    Demographic
                  </span>
                </div>
              </div>

              {[
                { icon: "speed-test", label: "Bureau Summary" },
                { icon: "notepad", label: "Employment Details" },
                { icon: "bank", label: "Banking Details" },
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

            {/* Profile Details Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#434343]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                Profile details
              </h2>
              <div className="flex gap-4">
                <button className="text-[#079F9F] underline text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Engage
                </button>
                <button className="text-[#079F9F] underline text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  LO
                </button>
              </div>
            </div>

            {/* Profile Card */}
            <Card className="mb-8">
              <CardContent className="p-8">
                {/* Top Section - Customer Info */}
                <div className="flex items-center gap-16 mb-8">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/34b3146ae4c9f6d22a5a7cbef0f72f077afa1499?width=160" 
                    alt="Customer" 
                    className="w-20 h-20 rounded-lg border border-[#E6E6E6]"
                  />
                  
                  <div className="flex items-center gap-20">
                    <div>
                      <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Name
                      </div>
                      <div className="text-[#434343] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Yogesh Shirish Pawar
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Customer ID
                      </div>
                      <div className="text-[#434343] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        1234567890
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Source
                      </div>
                      <div className="text-[#434343] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        RULOANS/DSA_API
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Channel
                      </div>
                      <div className="text-[#434343] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                        Smartoffice
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Row */}
                <div className="flex items-center gap-20 mb-8">
                  <div className="ml-24">
                    <div className="text-[#999999] text-base mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Employment type
                    </div>
                    <div className="text-[#434343] text-xl font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Permanent
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

                {/* Section Headers */}
                <div className="bg-[#F2F7FA] p-4 rounded-lg mb-6 flex justify-between">
                  <span className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    Other Details
                  </span>
                  <span className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    Validations
                  </span>
                  <span className="text-[#434343] text-lg font-medium" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    Remarks
                  </span>
                </div>

                {/* Details Grid */}
                <div className="space-y-6">
                  {[
                    { label: "Name", value: "Yogesh Shirish Pawar", validations: ["NSDL", "Bureau", "Banking"], remarksInput: true },
                    { label: "DOB", value: "14/03/1989", validations: [{ status: "NSDL", variant: "error" }, "Bureau", "Banking"], remarksInput: true },
                    { label: "Mobile", value: "8991589173", validations: ["NSDL", "Bureau", { status: "Banking", variant: "error" }], remarksInput: true },
                    { label: "Email ID", value: "Yogesh@gmail.com", validations: ["NSDL", { status: "Bureau", variant: "notFound" }, "Banking"], remarksInput: true },
                    { label: "Pan Card", value: "EBX4547C", validations: [{ status: "NSDL", variant: "error" }, "Bureau", "Banking", "UID & PAN"], remarksInput: true },
                    { label: "Correspondence Address", value: "555, Gold crest, Vallabh Nagar, Kharadi, Pune", validations: ["NSDL", "Bureau", { status: "Banking", variant: "notFound" }], remarksInput: false },
                    { label: "Permanent Address", value: "555, Gold crest, Vallabh Nagar, Kharadi, Pune", validations: [{ status: "NSDL", variant: "notFound" }, "Bureau", "Banking"], remarksInput: false },
                    { label: "Office Address", value: "555, Gold crest, Vallabh Nagar, Kharadi, Pune", validations: ["NSDL", "Bureau", { status: "Banking", variant: "error" }], remarksInput: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1 grid grid-cols-3 gap-8">
                        <div className="flex gap-8">
                          <div className="w-32">
                            <span className="text-[#999999] text-base" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                              {item.label}
                            </span>
                          </div>
                          <div className="flex-1">
                            <span className="text-[#434343] text-base font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                              {item.value}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 flex-wrap">
                          {item.validations.map((validation, vIndex) => (
                            <StatusPill 
                              key={vIndex}
                              status={typeof validation === "string" ? validation : validation.status}
                              variant={typeof validation === "string" ? "found" : validation.variant}
                            />
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {item.remarksInput && (
                            <>
                              <Input 
                                placeholder="Add your remark here..." 
                                className="flex-1 border border-[#E6E6E6]"
                              />
                              <Button variant="ghost" size="sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M15.193 17.8223L19.5156 13.4997M19.5156 13.4997L15.193 9.1771M19.5156 13.4997L6.54788 13.4997" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Additional fields */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-8">
                      <div className="w-32">
                        <span className="text-[#999999] text-base" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          Age
                        </span>
                      </div>
                      <div>
                        <span className="text-[#434343] text-base font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          32 years 6 months
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-8">
                      <div className="w-32">
                        <span className="text-[#999999] text-base" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          File Type
                        </span>
                      </div>
                      <div>
                        <span className="text-[#434343] text-base font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                          PDF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Insights */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-[#434343] mb-6" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Customer Insights
                </h3>
                <div className="space-y-4">
                  <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    • All Validations Pass + High Score (BRE1/BRE2 &gt; 700) = "Low Credit Risk"
                  </div>
                  <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    • 1–2 Mismatches OR Mid Bureau Score = "Moderate Risk"
                  </div>
                  <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    • 3+ Mismatches OR Low Bureau Score (&lt;650) = "High Risk"
                  </div>
                  <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    • NSDL/Bureau Mismatches = Flag Specific Fields (Name/Address/Email/Etc.)
                  </div>
                  <div className="text-[#434343] text-lg font-semibold" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                    • 💰 Compare Income vs EMI Obligations = Highlight Affordability Issues
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-[#FBFBFB] border border-[#E6E6E6] rounded-lg p-8 z-10 shadow-lg">
              <div className="flex gap-4 flex-wrap">
                <Button variant="outline" className="border-[#079F9F] text-[#079F9F] bg-white">
                  Audit comments
                </Button>
                <Button variant="outline" className="border-[#079F9F] text-[#079F9F] bg-white">
                  Generate CAM
                </Button>
                <Button className="bg-[#5774B7] text-white hover:bg-[#4a5f9e]">
                  Recommend
                </Button>
                <Button className="bg-[#DF4444] text-white hover:bg-[#c93333]">
                  Reject
                </Button>
                <Button className="bg-[#F8A63F] text-white hover:bg-[#e6942d]">
                  Suspend
                </Button>
                <Button className="bg-[#1AAC03] text-white hover:bg-[#159902]">
                  Approved
                </Button>
                <Button className="bg-[#079F9F] text-white hover:bg-[#068585]">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
