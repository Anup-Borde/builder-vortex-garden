"use client";

import React, { useState, useDeferredValue, useCallback } from "react";
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
  // Search type state for tabs
  const [activeSearchType, setActiveSearchType] = useState("custId");

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

  // Search type tabs configuration
  const searchTabs = [
    { id: "custId", label: "Cust ID", placeholder: "Enter Customer ID" },
    { id: "mobile", label: "Mobile No", placeholder: "Enter Mobile Number" },
    { id: "orderId", label: "Order ID", placeholder: "Enter Order ID" },
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

  // Handle search type tab change
  const handleSearchTypeChange = useCallback((searchType) => {
    setActiveSearchType(searchType);
    setFilters((prev) => ({
      ...prev,
      searchType,
      query: "", // Clear query when switching types
    }));
  }, []);

  // Handle input changes
  const handleInputChange = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
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

    setActiveSearchType("custId");
    setFilters(resetFilters);
    onReset(resetFilters);
  }, [onReset]);

  // Get current placeholder based on active search type
  const getCurrentPlaceholder = () => {
    const activeTab = searchTabs.find((tab) => tab.id === activeSearchType);
    return activeTab?.placeholder || "Enter search term";
  };

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 mb-6">
      <div className="space-y-6">
        {/* Search Section with Tabs */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <Input
                placeholder={getCurrentPlaceholder()}
                value={filters.query}
                onChange={(e) => handleInputChange("query", e.target.value)}
                className="h-12 border-[#E0E0E0] focus:ring-[#079F9F] placeholder:text-[#616060] text-base"
              />
            </div>

            {/* Search Button (Mobile) */}
            <div className="lg:hidden">
              <Button
                onClick={handleSearch}
                className="w-full h-12 bg-[#079F9F] hover:bg-[#079F9F]/90 text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Search Type Tabs */}
          <div className="flex flex-wrap gap-2">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleSearchTypeChange(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSearchType === tab.id
                    ? "bg-[#079F9F] text-white"
                    : "bg-gray-100 text-[#616060] hover:bg-gray-200 hover:text-[#282828]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile Layout - Channel, Segment, Merchant in one row */}
        <div className="block md:hidden">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Select
              value={filters.channel}
              onValueChange={(value) => handleInputChange("channel", value)}
            >
              <SelectTrigger className="h-10 border-[#E0E0E0] focus:ring-[#079F9F] text-xs">
                <SelectValue placeholder="Channel" />
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
              <SelectTrigger className="h-10 border-[#E0E0E0] focus:ring-[#079F9F] text-xs">
                <SelectValue placeholder="Segment" />
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
              <SelectTrigger className="h-10 border-[#E0E0E0] focus:ring-[#079F9F] text-xs">
                <SelectValue placeholder="Merchant" />
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

          {/* Mobile Date Range Filters */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <label className="block text-xs font-medium text-[#616060] mb-1">
                From Date
              </label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleInputChange("dateFrom", e.target.value)}
                className="h-10 border-[#E0E0E0] focus:ring-[#079F9F] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#616060] mb-1">
                To Date
              </label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleInputChange("dateTo", e.target.value)}
                className="h-10 border-[#E0E0E0] focus:ring-[#079F9F] text-xs"
              />
            </div>
          </div>

          {/* Mobile Reset Button */}
          <div className="w-full">
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-10 border-[#E0E0E0] hover:border-[#079F9F] focus:ring-[#079F9F] text-[#282828]"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>{" "}
        {/* Desktop Layout - All filters in one line */}
        <div className="hidden md:block">
          {/* All Filters in One Row */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Select
              value={filters.channel}
              onValueChange={(value) => handleInputChange("channel", value)}
            >
              <SelectTrigger className="h-10 border-[#E0E0E0] focus:ring-[#079F9F]">
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
              <SelectTrigger className="h-10 border-[#E0E0E0] focus:ring-[#079F9F]">
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
              <SelectTrigger className="h-10 border-[#E0E0E0] focus:ring-[#079F9F]">
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

            <div className="relative">
              <label className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#616060] pointer-events-none">
                From Date
              </label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleInputChange("dateFrom", e.target.value)}
                className="h-10 border-[#E0E0E0] focus:ring-[#079F9F] pl-20"
              />
            </div>

            <div className="relative">
              <label className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#616060] pointer-events-none">
                To Date
              </label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleInputChange("dateTo", e.target.value)}
                className="h-10 border-[#E0E0E0] focus:ring-[#079F9F] pl-16"
              />
            </div>
          </div>

          {/* Desktop Reset Button */}
          <div className="w-full">
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-10 border-[#E0E0E0] hover:border-[#079F9F] focus:ring-[#079F9F] text-[#282828]"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ManageLeadsFilters };
