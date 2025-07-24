"use client";

import React from "react";

const ViewDocumentsModal = ({ isOpen, onClose, documents = [] }) => {
  // Default documents data matching the Figma design
  const defaultDocuments = [
    {
      id: 1,
      name: "legalAgreement-4361.pdf",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
    {
      id: 2,
      name: "PAN",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
    {
      id: 3,
      name: "Certificate Of Incorporation",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
    {
      id: 4,
      name: "CANCEL CHEQUE",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
    {
      id: 5,
      name: "GST",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
    {
      id: 6,
      name: "pan",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
    {
      id: 7,
      name: "Certificate Of Incorporation",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
    {
      id: 8,
      name: "Cancel Check",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
    {
      id: 9,
      name: "gst",
      eligibleAmount: "2025-01-08 17:04:52.0",
    },
  ];

  const documentsToShow = documents.length > 0 ? documents : defaultDocuments;

  const handleViewDocument = (document) => {
    console.log("Viewing document:", document);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[810px] max-h-[705px] bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden">
        {/* Header */}
        <div className="h-[72px] bg-[#FFFBF1] border-b border-[#E6E6E6] flex items-center justify-between px-6">
          <h2
            className="text-[20px] font-semibold text-[#333333] leading-[33px]"
            style={{
              fontFamily:
                "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: "600",
            }}
          >
            View Document
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.6575 10.3438L10.3438 21.6575M21.6575 21.6575L10.3438 10.3438"
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="overflow-x-auto w-full">
            <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden h-[584px] min-w-[600px]">
              {/* Table Header */}
              <div className="h-[72px] bg-[#EBEBEB] flex items-center border-b border-[#E6E6E6] min-w-[600px]">
                <div className="w-[299px] px-6">
                  <h3
                    className="text-[18px] font-semibold text-[#434343] leading-[32px]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Name Of ID proof
                  </h3>
                </div>
                <div className="w-px bg-[#E6E6E6] h-full"></div>
                <div className="w-[193px] px-4">
                  <h3
                    className="text-[18px] font-semibold text-[#434343] leading-[32px]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Eligible Amount
                  </h3>
                </div>
                <div className="w-px bg-[#E6E6E6] h-full"></div>
                <div className="flex-1 px-4">
                  <h3
                    className="text-[20px] font-semibold text-[#434343] leading-[24px]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    View Document
                  </h3>
                </div>
              </div>

              {/* Table Body */}
              <div className="h-[512px] overflow-y-auto min-w-[600px]">
                {documentsToShow.map((document, index) => (
                  <div
                    key={document.id}
                    className={`h-[56px] flex items-center border-b border-[#E6E6E6] last:border-b-0 ${
                      index % 2 === 1 ? "bg-[#FBFBFB]" : "bg-white"
                    }`}
                  >
                    <div className="w-[299px] px-6">
                      <p
                        className="text-[18px] font-medium text-[#434343] leading-[22px]"
                        style={{
                          fontFamily:
                            "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "500",
                        }}
                      >
                        {document.name}
                      </p>
                    </div>
                    <div className="w-px bg-[#E6E6E6] h-full"></div>
                    <div className="w-[193px] px-4">
                      <p
                        className="text-[18px] font-normal text-[#999999] leading-[27px]"
                        style={{
                          fontFamily:
                            "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "400",
                        }}
                      >
                        {document.eligibleAmount}
                      </p>
                    </div>
                    <div className="w-px bg-[#E6E6E6] h-full"></div>
                    <div className="flex-1 px-4">
                      <button
                        onClick={() => handleViewDocument(document)}
                        className="text-[18px] font-semibold text-[#079F9F] hover:text-[#058080] transition-colors leading-[27px]"
                        style={{
                          fontFamily:
                            "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "600",
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentsModal;
