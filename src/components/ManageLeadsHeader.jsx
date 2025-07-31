"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, TrendingUp } from "lucide-react";

const ManageLeadsHeader = ({ userRole = "internal" }) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#282828]">Manage Leads</h1>
      </div>
    </div>
  );
};

export { ManageLeadsHeader };
