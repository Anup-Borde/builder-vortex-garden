"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatusDropdown = ({ value, onChange }) => {
  const statusOptions = [
    { value: "all", label: "Show All (100)", count: 100 },
    { value: "new-lead", label: "New Lead", count: 25 },
    { value: "doc-pending", label: "Doc Pending", count: 18 },
    { value: "decision", label: "Decision", count: 22 },
    { value: "suspended", label: "Suspended", count: 5 },
    { value: "disbursal-pending", label: "Disbursal Pending", count: 15 },
    { value: "uw-will", label: "UW Will", count: 15 },
  ];

  return (
    <div className="w-full sm:w-48">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 border-[#E0E0E0] focus:ring-[#079F9F]">
          <SelectValue placeholder="Show All (100)" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label} {option.value !== "all" && `(${option.count})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { StatusDropdown };
