"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const ProductDetailsTable = () => {
  const [selectedCases, setSelectedCases] = useState(10); // page size
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for the table
  const productData = [
    {
      tenure: "3 EMI",
      minTicket: "6000",
      maxTicket: "40000",
      subvention: "3.24",
      interestRate: "0",
      dpType: "Amount",
      dp: "0",
      pfType: "Amount",
      pf: "0",
      irpValue: "0",
      multipliers: "0",
      status: "Active",
    },
    {
      tenure: "6 EMI",
      minTicket: "6000",
      maxTicket: "40000",
      subvention: "5.5",
      interestRate: "0",
      dpType: "Amount",
      dp: "0",
      pfType: "Amount",
      pf: "0",
      irpValue: "0",
      multipliers: "0",
      status: "Failed",
    },
    {
      tenure: "9 EMI",
      minTicket: "6000",
      maxTicket: "40000",
      subvention: "7.6",
      interestRate: "0",
      dpType: "Amount",
      dp: "0",
      pfType: "Amount",
      pf: "0",
      irpValue: "0",
      multipliers: "0",
      status: "Failed",
    },
    {
      tenure: "12 EMI",
      minTicket: "6000",
      maxTicket: "40000",
      subvention: "9.75",
      interestRate: "0",
      dpType: "Amount",
      dp: "0",
      pfType: "Amount",
      pf: "0",
      irpValue: "0",
      multipliers: "0",
      status: "Active",
    },
    {
      tenure: "15 EMI",
      minTicket: "6000",
      maxTicket: "40000",
      subvention: "11.8",
      interestRate: "0",
      dpType: "Amount",
      dp: "0",
      pfType: "Amount",
      pf: "0",
      irpValue: "0",
      multipliers: "0",
      status: "Active",
    },
    {
      tenure: "15 EMI",
      minTicket: "40000",
      maxTicket: "40000",
      subvention: "11.8",
      interestRate: "0",
      dpType: "Amount",
      dp: "0",
      pfType: "Amount",
      pf: "0",
      irpValue: "0",
      multipliers: "0",
      status: "Active",
    },
    // Additional dummy rows for pagination demo
    ...Array.from({ length: 24 }, (_, i) => ({
      tenure: `${3 + (i % 5) * 3} EMI`,
      minTicket: `${6000 + (i % 4) * 1000}`,
      maxTicket: `${40000 - (i % 3) * 2000}`,
      subvention: `${(3.24 + (i % 6) * 1.5).toFixed(2)}`,
      interestRate: `${i % 2 === 0 ? "0" : "1.5"}`,
      dpType: i % 2 === 0 ? "Amount" : "Percent",
      dp: `${i % 3 === 0 ? "0" : "1000"}`,
      pfType: i % 2 === 0 ? "Amount" : "Percent",
      pf: `${i % 4 === 0 ? "0" : "500"}`,
      irpValue: `${i % 5 === 0 ? "0" : "200"}`,
      multipliers: `${i % 2 === 0 ? "0" : "1"}`,
      status: i % 3 === 0 ? "Active" : "Failed",
    })),
  ];

  const columns = [
    { key: "tenure", label: "Tenure" },
    { key: "minTicket", label: "Min Ticket" },
    { key: "maxTicket", label: "Max Ticket" },
    { key: "subvention", label: "Subvention" },
    { key: "interestRate", label: "Interest rate" },
    { key: "dpType", label: "DP Type" },
    { key: "dp", label: "DP" },
    { key: "pfType", label: "PF type" },
    { key: "pf", label: "PF" },
    { key: "irpValue", label: "IRP Value" },
    { key: "multipliers", label: "Multipliers" },
    { key: "status", label: "Status" },
  ];

  const getStatusColor = (status) => {
    return status === "Active"
      ? "text-[#3F9D6A] font-semibold"
      : "text-[#C05353] font-semibold";
  };

  // Pagination logic
  const totalRows = productData.length;
  const totalPages = Math.ceil(totalRows / selectedCases);
  const paginatedData = productData.slice(
    (currentPage - 1) * selectedCases,
    currentPage * selectedCases
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCasesChange = (cases) => {
    setSelectedCases(Number(cases));
    setCurrentPage(1); // Reset to first page on page size change
  };

  return (
    <div className="mb-8">
      <h2
        className="text-xl font-semibold text-[#333] mb-6"
        style={{
          fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
          fontSize: "20px",
          fontWeight: "600",
          lineHeight: "165%",
        }}
      >
        View Product Details
      </h2>

      {/* Table Container */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFFBF1] border-b border-[#E6E6E6]">
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    className="px-4 py-4 text-left text-[#434343] font-semibold text-base"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "154%",
                      borderRight:
                        index < columns.length - 1
                          ? "1px solid #E6E6E6"
                          : "none",
                    }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex + (currentPage - 1) * selectedCases}
                  className={`border-b border-[#E6E6E6] ${
                    rowIndex === 0 && currentPage === 1
                      ? "border-l-4 border-l-[#079F9F] bg-[#FBFBFB]"
                      : ""
                  } ${rowIndex % 2 === 1 ? "bg-[#FBFBFB]" : ""}`}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key}
                      className="px-4 py-4 text-[#434343] text-base"
                      style={{
                        fontFamily:
                          "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "16px",
                        fontWeight: column.key === "status" ? "600" : "400",
                        lineHeight: "150%",
                        borderRight:
                          colIndex < columns.length - 1
                            ? "1px solid #E6E6E6"
                            : "none",
                      }}
                    >
                      {column.key === "status" ? (
                        <span className={getStatusColor(row[column.key])}>
                          {row[column.key]}
                        </span>
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-[#F9F9F9] border-t border-[#E6E6E6] shadow-[0px_-1px_8.3px_0px_rgba(162,162,162,0.25)] p-3">
          <div className="flex items-center justify-between">
            {/* Left side - Show at time options */}
            <div className="flex items-center gap-6">
              <span
                className="text-[#404040] text-lg font-medium"
                style={{
                  fontFamily:
                    "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "120%",
                }}
              >
                Show at time
              </span>

              <div className="flex items-center gap-6">
                {[10, 15, 20].map((cases) => (
                  <label
                    key={cases}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="relative">
                      <div
                        className={`w-5 h-5 rounded border border-[#E6E6E6] ${
                          selectedCases === cases ? "bg-[#079F9F]" : "bg-white"
                        }`}
                        onClick={() => handleCasesChange(cases)}
                      >
                        {selectedCases === cases && (
                          <Check
                            className="w-3 h-3 text-white absolute top-0.5 left-0.5"
                            strokeWidth={2}
                          />
                        )}
                      </div>
                    </div>
                    <span
                      className="text-[#404040] text-base font-medium"
                      style={{
                        fontFamily:
                          "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "168%",
                      }}
                    >
                      {cases} Cases
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Right side - Pagination */}
            <div className="flex items-center gap-4">
              <button
                className={`p-2 ${
                  currentPage === 1
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:opacity-100"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-6 h-6 text-[#999]" />
              </button>

              <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <span
                      key={page}
                      className={
                        page === currentPage
                          ? "text-[#079F9F] text-lg cursor-pointer"
                          : "text-[#999] text-lg cursor-pointer hover:text-[#079F9F]"
                      }
                      style={{
                        fontFamily:
                          "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "150%",
                      }}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </span>
                  )
                )}
              </div>

              <button
                className={`p-2 ${
                  currentPage === totalPages
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:opacity-80"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-6 h-6 text-[#262626]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductDetailsTable };
