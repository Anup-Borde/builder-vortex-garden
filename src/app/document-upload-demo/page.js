"use client";

import React from "react";
import DocumentUploadCard from "@/components/DocumentUploadCard";

export default function DocumentUploadDemo() {
  const handleCardClick = (cardName) => {
    console.log(`Clicked on ${cardName} card`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Document Upload Section
        </h1>
        
        <div className="space-y-8">
          {/* Single Card Demo */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Single Card (Agency Profile)
            </h2>
            <div className="max-w-md">
              <DocumentUploadCard
                title="Agency Profile"
                description="If the doc is available upload"
                onClick={() => handleCardClick("Agency Profile")}
              />
            </div>
          </div>

          {/* Grid Layout Demo - 3 cards per row */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Grid Layout (3 cards per row - Sample)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DocumentUploadCard
                title="Agency Profile"
                description="If the doc is available upload"
                onClick={() => handleCardClick("Agency Profile")}
              />
              <DocumentUploadCard
                title="Certificate of Authority"
                description="Upload your certificate document"
                onClick={() => handleCardClick("Certificate of Authority")}
              />
              <DocumentUploadCard
                title="Business License"
                description="Required business license document"
                onClick={() => handleCardClick("Business License")}
              />
              <DocumentUploadCard
                title="Tax Documents"
                description="Upload tax-related documents"
                onClick={() => handleCardClick("Tax Documents")}
              />
              <DocumentUploadCard
                title="Insurance Certificate"
                description="Upload insurance documentation"
                onClick={() => handleCardClick("Insurance Certificate")}
              />
              <DocumentUploadCard
                title="Bank Statements"
                description="Recent bank statement uploads"
                onClick={() => handleCardClick("Bank Statements")}
              />
            </div>
          </div>

          {/* Responsive Test */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Responsive Test (Different Widths)
            </h2>
            <div className="space-y-4">
              <div className="w-full max-w-sm">
                <p className="text-sm text-gray-600 mb-2">Small width (320px)</p>
                <DocumentUploadCard
                  title="Agency Profile"
                  description="If the doc is available upload"
                  onClick={() => handleCardClick("Agency Profile")}
                />
              </div>
              <div className="w-full max-w-md">
                <p className="text-sm text-gray-600 mb-2">Medium width (448px)</p>
                <DocumentUploadCard
                  title="Agency Profile"
                  description="If the doc is available upload"
                  onClick={() => handleCardClick("Agency Profile")}
                />
              </div>
              <div className="w-full max-w-lg">
                <p className="text-sm text-gray-600 mb-2">Large width (512px)</p>
                <DocumentUploadCard
                  title="Agency Profile"
                  description="If the doc is available upload"
                  onClick={() => handleCardClick("Agency Profile")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
