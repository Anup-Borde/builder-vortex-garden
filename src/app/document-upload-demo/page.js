"use client";

import React from "react";
import DocumentUploadCard from "@/components/DocumentUploadCard";

export default function DocumentUploadDemo() {
  const handleCardClick = (cardName) => {
    console.log(`Clicked on ${cardName} card`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 6 Cards Grid Layout - 3 cards per row, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1 */}
          <DocumentUploadCard
            title="Agency Profile"
            description="If the doc is available upload"
            state="default"
            onClick={() => handleCardClick("Agency Profile")}
          />

          <DocumentUploadCard
            title="Agency Profile"
            description="If the doc is available upload"
            state="default"
            onClick={() => handleCardClick("Agency Profile 2")}
          />

          <DocumentUploadCard
            title="List of Agency Pin Codes and Staff"
            description="If the doc is available upload"
            state="uploaded"
            undoText="Undo in 10sec"
            onClick={() => handleCardClick("List of Agency Pin Codes and Staff")}
          />

          {/* Row 2 */}
          <DocumentUploadCard
            title="List of Agency Pin Codes and Staff"
            description="If the doc is available upload"
            state="uploaded"
            onClick={() => handleCardClick("List of Agency Pin Codes and Staff 2")}
          />

          <DocumentUploadCard
            title="Onboarding Approval"
            description="If the doc is available upload"
            state="default"
            onClick={() => handleCardClick("Onboarding Approval")}
          />

          <DocumentUploadCard
            title="Onboarding Approval"
            description="If the doc is available upload"
            state="default"
            onClick={() => handleCardClick("Onboarding Approval 2")}
          />
        </div>
      </div>
    </div>
  );
}
