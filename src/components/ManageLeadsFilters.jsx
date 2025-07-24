"use client";

import React, { useState, useDeferredValue, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

const ManageLeadsFilters = ({ onSearch, onReset }) => {
  // Filter state
  const [filters, setFilters] = useState({
    searchType: "custId",
    query: "",
    channel: "",
    segment: "",
    merchant: "",
    dateFrom: "",
    dateTo: "",
  });

  // Performance optimization with deferred value
  const deferredQuery = useDeferredValue(filters.query);

  // Search type options configuration
  const searchTypeOptions = [
    { value: "custId", label: "Cust ID", placeholder: "Type here" },
    { value: "mobile", label: "Mobile No", placeholder: "Type here" },
    { value: "orderId", label: "Order ID", placeholder: "Type here" },
    { value: "loanId", label: "Loan ID", placeholder: "Type here" },
  ];

  // Dropdown options
  const channelOptions = [
    { value: "website", label: "Website" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "offline", label: "Offline" },
    { value: "partner", label: "Partner" },
  ];

  const segmentOptions = [
    { value: "salaried", label: "Salaried" },
    { value: "business", label: "Business" },
    { value: "student", label: "Student" },
    { value: "other", label: "Other" },
  ];

  const merchantOptions = [
    { value: "kotak", label: "Kotak" },
    { value: "hdfc", label: "HDFC" },
    { value: "icici", label: "ICICI" },
    { value: "axis", label: "Axis" },
    { value: "sbi", label: "SBI" },
  ];

  // Handle input changes
  const handleInputChange = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Handle search type change
  const handleSearchTypeChange = useCallback((searchType) => {
    setFilters((prev) => ({
      ...prev,
      searchType,
      query: "", // Clear query when switching types
    }));
  }, []);

  // Handle search
  const handleSearch = useCallback(() => {
    const searchFilters = {
      searchType: filters.searchType,
      query: deferredQuery,
      channel: filters.channel,
      segment: filters.segment,
      merchant: filters.merchant,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    };

    console.log("Search Filters:", searchFilters);
    onSearch(searchFilters);
  }, [filters, deferredQuery, onSearch]);

  // Handle reset
  const handleReset = useCallback(() => {
    const resetFilters = {
      searchType: "custId",
      query: "",
      channel: "",
      segment: "",
      merchant: "",
      dateFrom: "",
      dateTo: "",
    };

    setFilters(resetFilters);
    onReset(resetFilters);
  }, [onReset]);

  // Get current placeholder and label based on search type
  const getCurrentSearchConfig = () => {
    const config = searchTypeOptions.find(
      (option) => option.value === filters.searchType
    );
    return config || searchTypeOptions[0];
  };

  const currentConfig = getCurrentSearchConfig();

  const router = useRouter();
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 mb-6 w-full mx-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="space-y-4">
          {/* First Row: Combined Search Input + Date Range + Merchant Details Button (inline) */}
          <div className="flex items-center gap-4">
            {/* Combined Search Type Dropdown + Input */}
            <div className="flex-1 max-w-[372px]">
              <div className="relative border-[1.5px] border-[#079F9F] rounded-lg bg-white h-12 flex">
                {/* Search Type Dropdown */}
                <div className="flex items-center px-3 min-w-[110px] border-r border-[#079F9F]">
                  <Select
                    value={filters.searchType}
                    onValueChange={handleSearchTypeChange}
                  >
                    <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 shadow-none w-full">
                      <div className="flex items-center justify-between w-full text-[#434343] text-sm font-medium whitespace-nowrap">
                        <span>{currentConfig.label}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {searchTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Input */}
                <Input
                  placeholder={currentConfig.placeholder}
                  value={filters.query}
                  onChange={(e) => handleInputChange("query", e.target.value)}
                  className="border-0 focus:ring-0 shadow-none placeholder:text-[#999] text-sm h-full rounded-l-none pl-4"
                />
              </div>
            </div>

            {/* Date Range Section + Merchant Details Button inline */}
            <div className="flex-1 max-w-[529px] flex items-center gap-4">
              {/* Date Range Section */}
              <div className="relative border border-[#E6E6E6] rounded-lg bg-white h-12 flex items-center px-4 flex-1">
                <span className="text-[#999] text-base mr-2">To</span>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleInputChange("dateTo", e.target.value)}
                  className="border-0 focus:ring-0 shadow-none text-[#434343] text-base h-auto p-0 w-auto"
                  placeholder="DD/MM/YYYY"
                />

                <div className="mx-4 flex items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7793 1L16.7793 5L0.779297 5"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.7793 17L0.779297 13L16.7793 13"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <span className="text-[#999] text-base mr-2">From:</span>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    handleInputChange("dateFrom", e.target.value)
                  }
                  className="border-0 focus:ring-0 shadow-none text-[#434343] text-base h-auto p-0 w-auto"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>
            <div className="flex gap-4 ml-auto">
              {/* View Merchant details */}
              <Button
                variant="outline"
                className="h-12 border-[#079F9F] text-[#079F9F] px-6 rounded-lg font-semibold text-base whitespace-nowrap"
                onClick={() => {
                  router.push("/merchant-details");
                }}
              >
                View Merchant details
              </Button>
            </div>
          </div>

          {/* Second Row: Channel, Segment, Merchant Dropdowns + Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Channel Dropdown */}
            <div className="w-[300px]">
              <Select
                value={filters.channel}
                onValueChange={(value) => handleInputChange("channel", value)}
              >
                <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-base">
                  <SelectValue placeholder="Select Channel" />
                </SelectTrigger>
                <SelectContent>
                  {channelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Segment Dropdown */}
            <div className="w-[300px]">
              <Select
                value={filters.segment}
                onValueChange={(value) => handleInputChange("segment", value)}
              >
                <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-base">
                  <SelectValue placeholder="Select Segment" />
                </SelectTrigger>
                <SelectContent>
                  {segmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Merchant Dropdown */}
            <div className="w-[300px]">
              <Select
                value={filters.merchant}
                onValueChange={(value) => handleInputChange("merchant", value)}
              >
                <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-base">
                  <SelectValue placeholder="Select Merchant" />
                </SelectTrigger>
                <SelectContent>
                  {merchantOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 ml-auto">
              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="h-12 bg-[#079F9F] hover:bg-[#079F9F]/90 text-white px-6 rounded-lg flex items-center gap-2"
              >
                <Search className="h-6 w-6" />
                <span className="font-semibold text-base">Search</span>
              </Button>

              {/* Reset Button */}
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 border-[#079F9F] hover:border-[#079F9F] focus:ring-[#079F9F] text-[#079F9F] px-6 rounded-lg flex items-center gap-2"
              >
                <RotateCcw className="h-8 w-8" />
                <span className="font-semibold text-base">Reset</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          {/* Mobile Search - Full width */}
          <div className="w-full">
            <div className="relative border-[1.5px] border-[#079F9F] rounded-lg bg-white h-12 flex">
              <div className="flex items-center px-3 min-w-[110px] border-r border-[#079F9F]">
                <Select
                  value={filters.searchType}
                  onValueChange={handleSearchTypeChange}
                >
                  <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 shadow-none w-full">
                    <div className="flex items-center justify-between w-full text-[#434343] text-sm font-medium whitespace-nowrap">
                      <span>{currentConfig.label}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {searchTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder={currentConfig.placeholder}
                value={filters.query}
                onChange={(e) => handleInputChange("query", e.target.value)}
                className="border-0 focus:ring-0 shadow-none placeholder:text-[#999] text-sm h-full rounded-l-none pl-4"
              />
            </div>
          </div>

          {/* Mobile Date Range - Two separate rows */}
          <div className="w-full space-y-3">
            {/* To Date */}
            <div className="relative border border-[#E6E6E6] rounded-lg bg-white h-10 flex items-center px-4">
              <span className="text-[#999] text-sm mr-3 whitespace-nowrap">
                To
              </span>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleInputChange("dateTo", e.target.value)}
                className="border-0 focus:ring-0 shadow-none text-[#434343] text-sm h-auto p-0 flex-1"
                placeholder="dd/mm/yyyy"
              />
            </div>

            {/* From Date */}
            <div className="relative border border-[#E6E6E6] rounded-lg bg-white h-10 flex items-center px-4">
              <span className="text-[#999] text-sm mr-3 whitespace-nowrap">
                From:
              </span>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleInputChange("dateFrom", e.target.value)}
                className="border-0 focus:ring-0 shadow-none text-[#434343] text-sm h-auto p-0 flex-1"
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          {/* Mobile Dropdowns - Single column layout */}
          <div className="space-y-3">
            <Select
              value={filters.channel}
              onValueChange={(value) => handleInputChange("channel", value)}
            >
              <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-sm">
                <SelectValue placeholder="Select Channel" />
              </SelectTrigger>
              <SelectContent>
                {channelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.segment}
              onValueChange={(value) => handleInputChange("segment", value)}
            >
              <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-sm">
                <SelectValue placeholder="Select Segment" />
              </SelectTrigger>
              <SelectContent>
                {segmentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.merchant}
              onValueChange={(value) => handleInputChange("merchant", value)}
            >
              <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-sm">
                <SelectValue placeholder="Select Merchant" />
              </SelectTrigger>
              <SelectContent>
                {merchantOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Action Buttons - Full width */}
          <div className="flex gap-3">
            <Button
              onClick={handleSearch}
              className="flex-1 h-12 bg-[#079F9F] hover:bg-[#079F9F]/90 text-white rounded-lg flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              <span className="font-semibold text-base">Search</span>
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 h-12 border-[#079F9F] hover:border-[#079F9F] focus:ring-[#079F9F] text-[#079F9F] rounded-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span className="font-semibold text-base">Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ManageLeadsFilters };
