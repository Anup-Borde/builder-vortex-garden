"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, TrendingUp } from "lucide-react";

const ManageLeadsHeader = ({ userRole = "internal" }) => {
  const handleQuickEligibility = () => {
    console.log("Quick Eligibility Calculator clicked");
  };

  const handleCalculateEMI = () => {
    console.log("Calculate EMI clicked");
  };

  const handleAddLeads = () => {
    console.log("Add Leads clicked");
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#282828]">Manage Leads</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleQuickEligibility}
            variant="outline"
            className="h-12 px-6 border-[#E0E0E0] hover:border-[#079F9F] focus:ring-[#079F9F] text-[#282828]"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Quick Eligibility Calculator
          </Button>

          <Button
            onClick={handleCalculateEMI}
            variant="outline"
            className="h-12 px-6 border-[#E0E0E0] hover:border-[#079F9F] focus:ring-[#079F9F] text-[#282828]"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Calculate EMI
          </Button>

          {userRole === "internal" && (
            <Button
              onClick={handleAddLeads}
              className="h-12 px-6 bg-[#079F9F] hover:bg-[#079F9F]/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Leads
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { ManageLeadsHeader };
