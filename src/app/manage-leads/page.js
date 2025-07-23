"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { PrimaryHeader } from "@/components/PrimaryHeader";
import { ManageLeadsHeader } from "@/components/ManageLeadsHeader";
import { ManageLeadsFilters } from "@/components/ManageLeadsFilters";
import { ManageLeadsTable } from "@/components/ManageLeadsTable";
import { StatusDropdown } from "@/components/StatusDropdown";

export default function ManageLeads({ userRole = "internal" }) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    channel: "",
    segment: "",
    merchant: "",
    dateFrom: "",
    dateTo: "",
    status: "all",
  });

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    router.push("/signin");
  };

  const handleSearch = (searchFilters) => {
    setFilters((prev) => ({ ...prev, ...searchFilters }));
    console.log("Search with filters:", searchFilters);
  };

  const handleReset = (resetFilters) => {
    setFilters((prev) => ({ ...prev, ...resetFilters }));
    console.log("Reset filters");
  };

  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
    console.log("Status filter changed:", status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Primary Header */}
      <PrimaryHeader onLogout={handleLogout} />

      {/* Secondary Header */}
      <Header />

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-8xl mx-auto">
          {/* Filters Section */}
          <ManageLeadsFilters onSearch={handleSearch} onReset={handleReset} />

          {/* Status Filter and Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <StatusDropdown
                value={filters.status}
                onChange={handleStatusChange}
              />
            </div>

            <ManageLeadsTable data={[]} filters={filters} userRole={userRole} />
          </div>
        </div>
      </div>
    </div>
  );
}
