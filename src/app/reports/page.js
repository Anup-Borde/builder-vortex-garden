"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { PrimaryHeader } from "@/components/PrimaryHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ReportsPage = () => {
  const [filters, setFilters] = useState({
    channel: "",
    segment: "",
    merchant: "",
    fromDate: "",
    toDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Mock data for demonstration
  const mockReports = [
    {
      id: 1,
      fromDate: "01/04/2024",
      toDate: "30/04/2024",
      channelName: "Niva Bupa",
      status: "Success",
      createDate: "01/05/2024",
      downloadLink: "/downloads/april-report.csv",
    },
    {
      id: 2,
      fromDate: "01/03/2024",
      toDate: "31/03/2024",
      channelName: "HDFC ERGO",
      status: "Success",
      createDate: "02/04/2024",
      downloadLink: "/downloads/march-report.csv",
    },
    {
      id: 3,
      fromDate: "01/02/2024",
      toDate: "29/02/2024",
      channelName: "ICICI Lombard",
      status: "Failed",
      createDate: "01/03/2024",
      downloadLink: "/downloads/feb-report.csv",
    },
    {
      id: 4,
      fromDate: "01/01/2024",
      toDate: "31/01/2024",
      channelName: "Bajaj Allianz",
      status: "Success",
      createDate: "01/02/2024",
      downloadLink: "/downloads/jan-report.csv",
    },
    {
      id: 5,
      fromDate: "01/12/2023",
      toDate: "31/12/2023",
      channelName: "Star Health",
      status: "Success",
      createDate: "01/01/2024",
      downloadLink: "/downloads/dec-report.csv",
    },
  ];

  const [filteredReports, setFilteredReports] = useState(mockReports);

  const channelOptions = [
    "Niva Bupa",
    "HDFC ERGO",
    "ICICI Lombard",
    "Bajaj Allianz",
    "Star Health",
  ];

  const segmentOptions = [
    "Health Insurance",
    "Motor Insurance",
    "Travel Insurance",
    "Home Insurance",
  ];

  const merchantOptions = [
    "Merchant A",
    "Merchant B",
    "Merchant C",
    "Merchant D",
  ];

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = mockReports;

      if (filters.channel) {
        filtered = filtered.filter((report) =>
          report.channelName
            .toLowerCase()
            .includes(filters.channel.toLowerCase()),
        );
      }

      setFilteredReports(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setFilters({
      channel: "",
      segment: "",
      merchant: "",
      fromDate: "",
      toDate: "",
    });
    setFilteredReports(mockReports);
    setCurrentPage(1);
  };

  const handleDownload = (downloadLink, channelName) => {
    // Simulate download
    console.log(`Downloading report for ${channelName}: ${downloadLink}`);
    // In real implementation, this would trigger file download
    alert(`Downloading report for ${channelName}`);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "success":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#282828] mb-2">Reports</h1>
            <p className="text-[#616060]">
              Filter and download reports based on your criteria
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-[#282828] mb-4">
              Filters
            </h2>

            {/* Mobile view: Two rows */}
            <div className="block md:hidden">
              {/* First row: Channel, Segment, Merchant */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {/* Channel Filter */}
                <div>
                  <Label
                    htmlFor="channel"
                    className="text-xs text-[#616060] mb-1 block"
                  >
                    Channel
                  </Label>
                  <Select
                    value={filters.channel}
                    onValueChange={(value) =>
                      handleFilterChange("channel", value)
                    }
                  >
                    <SelectTrigger className="h-10 border-[#E0E0E0] text-xs">
                      <SelectValue placeholder="Channel" />
                    </SelectTrigger>
                    <SelectContent>
                      {channelOptions.map((channel) => (
                        <SelectItem key={channel} value={channel}>
                          {channel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Segment Filter */}
                <div>
                  <Label
                    htmlFor="segment"
                    className="text-xs text-[#616060] mb-1 block"
                  >
                    Segment
                  </Label>
                  <Select
                    value={filters.segment}
                    onValueChange={(value) =>
                      handleFilterChange("segment", value)
                    }
                  >
                    <SelectTrigger className="h-10 border-[#E0E0E0] text-xs">
                      <SelectValue placeholder="Segment" />
                    </SelectTrigger>
                    <SelectContent>
                      {segmentOptions.map((segment) => (
                        <SelectItem key={segment} value={segment}>
                          {segment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Merchant Filter */}
                <div>
                  <Label
                    htmlFor="merchant"
                    className="text-xs text-[#616060] mb-1 block"
                  >
                    Merchant
                  </Label>
                  <Select
                    value={filters.merchant}
                    onValueChange={(value) =>
                      handleFilterChange("merchant", value)
                    }
                  >
                    <SelectTrigger className="h-10 border-[#E0E0E0] text-xs">
                      <SelectValue placeholder="Merchant" />
                    </SelectTrigger>
                    <SelectContent>
                      {merchantOptions.map((merchant) => (
                        <SelectItem key={merchant} value={merchant}>
                          {merchant}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second row: From Date, To Date */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {/* From Date */}
                <div>
                  <Label
                    htmlFor="fromDate"
                    className="text-xs text-[#616060] mb-1 block"
                  >
                    From Date
                  </Label>
                  <Input
                    id="fromDate"
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) =>
                      handleFilterChange("fromDate", e.target.value)
                    }
                    className="h-10 border-[#E0E0E0] text-xs"
                  />
                </div>

                {/* To Date */}
                <div>
                  <Label
                    htmlFor="toDate"
                    className="text-xs text-[#616060] mb-1 block"
                  >
                    To Date
                  </Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={filters.toDate}
                    onChange={(e) =>
                      handleFilterChange("toDate", e.target.value)
                    }
                    className="h-10 border-[#E0E0E0] text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Desktop view: Original layout */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                {/* Channel Filter */}
                <div>
                  <Label
                    htmlFor="channel-desktop"
                    className="text-sm text-[#616060] mb-1 block"
                  >
                    Select Channel
                  </Label>
                  <Select
                    value={filters.channel}
                    onValueChange={(value) =>
                      handleFilterChange("channel", value)
                    }
                  >
                    <SelectTrigger className="h-10 border-[#E0E0E0]">
                      <SelectValue placeholder="Select Channel" />
                    </SelectTrigger>
                    <SelectContent>
                      {channelOptions.map((channel) => (
                        <SelectItem key={channel} value={channel}>
                          {channel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Segment Filter */}
                <div>
                  <Label
                    htmlFor="segment-desktop"
                    className="text-sm text-[#616060] mb-1 block"
                  >
                    Select Segment
                  </Label>
                  <Select
                    value={filters.segment}
                    onValueChange={(value) =>
                      handleFilterChange("segment", value)
                    }
                  >
                    <SelectTrigger className="h-10 border-[#E0E0E0]">
                      <SelectValue placeholder="Select Segment" />
                    </SelectTrigger>
                    <SelectContent>
                      {segmentOptions.map((segment) => (
                        <SelectItem key={segment} value={segment}>
                          {segment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Merchant Filter */}
                <div>
                  <Label
                    htmlFor="merchant-desktop"
                    className="text-sm text-[#616060] mb-1 block"
                  >
                    Select Merchant
                  </Label>
                  <Select
                    value={filters.merchant}
                    onValueChange={(value) =>
                      handleFilterChange("merchant", value)
                    }
                  >
                    <SelectTrigger className="h-10 border-[#E0E0E0]">
                      <SelectValue placeholder="Select Merchant" />
                    </SelectTrigger>
                    <SelectContent>
                      {merchantOptions.map((merchant) => (
                        <SelectItem key={merchant} value={merchant}>
                          {merchant}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* From Date */}
                <div>
                  <Label
                    htmlFor="fromDate-desktop"
                    className="text-sm text-[#616060] mb-1 block"
                  >
                    From Date
                  </Label>
                  <Input
                    id="fromDate-desktop"
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) =>
                      handleFilterChange("fromDate", e.target.value)
                    }
                    className="h-10 border-[#E0E0E0]"
                  />
                </div>

                {/* To Date */}
                <div>
                  <Label
                    htmlFor="toDate-desktop"
                    className="text-sm text-[#616060] mb-1 block"
                  >
                    To Date
                  </Label>
                  <Input
                    id="toDate-desktop"
                    type="date"
                    value={filters.toDate}
                    onChange={(e) =>
                      handleFilterChange("toDate", e.target.value)
                    }
                    className="h-10 border-[#E0E0E0]"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-[#079F9F] hover:bg-[#079F9F]/90 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? "Searching..." : "Search"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-[#E0E0E0] text-[#616060] hover:bg-gray-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Results Table */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#282828] mb-4">
              Reports ({filteredReports.length} found)
            </h2>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-left font-medium text-[#616060]">
                      From Date
                    </TableHead>
                    <TableHead className="text-left font-medium text-[#616060]">
                      To Date
                    </TableHead>
                    <TableHead className="text-left font-medium text-[#616060]">
                      Channel Name
                    </TableHead>
                    <TableHead className="text-left font-medium text-[#616060]">
                      Status
                    </TableHead>
                    <TableHead className="text-left font-medium text-[#616060]">
                      Create Date
                    </TableHead>
                    <TableHead className="text-center font-medium text-[#616060]">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentReports.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-[#616060]"
                      >
                        No reports found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-gray-50">
                        <TableCell className="text-[#282828]">
                          {report.fromDate}
                        </TableCell>
                        <TableCell className="text-[#282828]">
                          {report.toDate}
                        </TableCell>
                        <TableCell className="text-[#282828] font-medium">
                          {report.channelName}
                        </TableCell>
                        <TableCell>
                          <span className={getStatusBadge(report.status)}>
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-[#282828]">
                          {report.createDate}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            onClick={() =>
                              handleDownload(
                                report.downloadLink,
                                report.channelName,
                              )
                            }
                            size="sm"
                            className="bg-[#079F9F] hover:bg-[#079F9F]/90 text-white"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-[#616060]">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredReports.length)} of{" "}
                {filteredReports.length} results
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="border-[#E0E0E0]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={
                        currentPage === page
                          ? "bg-[#079F9F] hover:bg-[#079F9F]/90 text-white"
                          : "border-[#E0E0E0]"
                      }
                    >
                      {page}
                    </Button>
                  ),
                )}

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="border-[#E0E0E0]"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
