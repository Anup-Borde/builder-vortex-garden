"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';

const ViewDocumentsModal = ({ isOpen, onClose, documents = [] }) => {
  // Default documents data if none provided
  const defaultDocuments = [
    {
      id: 1,
      name: 'legalAgreement-4361.pdf',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
    {
      id: 2,
      name: 'PAN',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
    {
      id: 3,
      name: 'Certificate Of Incorporation',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
    {
      id: 4,
      name: 'CANCEL CHEQUE',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
    {
      id: 5,
      name: 'GST',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
    {
      id: 6,
      name: 'pan',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
    {
      id: 7,
      name: 'Certificate Of Incorporation',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
    {
      id: 8,
      name: 'Cancel Check',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
    {
      id: 9,
      name: 'gst',
      eligibleAmount: '2025-01-08 17:04:52.0',
    },
  ];

  const documentsToShow = documents.length > 0 ? documents : defaultDocuments;

  const handleViewDocument = (document) => {
    // Handle document viewing logic here
    console.log('Viewing document:', document);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-[810px] max-h-[90vh] mx-4 bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#FFFBF1] border-b border-[#E6E6E6]">
          <h2 
            className="text-xl font-bold text-[#333333]"
            style={{
              fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            View Document
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
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
          <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#EBEBEB] px-6 py-5 grid grid-cols-12 gap-4">
              <div className="col-span-5">
                <h3 
                  className="text-lg font-bold text-[#434343]"
                  style={{
                    fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Name Of ID proof
                </h3>
              </div>
              <div className="col-span-4">
                <h3 
                  className="text-lg font-bold text-[#434343]"
                  style={{
                    fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Eligible Amount
                </h3>
              </div>
              <div className="col-span-3">
                <h3 
                  className="text-xl font-bold text-[#434343]"
                  style={{
                    fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  View Document
                </h3>
              </div>
            </div>

            {/* Table Body */}
            <div className="max-h-[400px] overflow-y-auto">
              {documentsToShow.map((document, index) => (
                <div 
                  key={document.id}
                  className={`px-6 py-4 grid grid-cols-12 gap-4 items-center border-b border-[#E6E6E6] last:border-b-0 ${
                    index % 2 === 1 ? 'bg-[#FBFBFB]' : 'bg-white'
                  }`}
                >
                  <div className="col-span-5">
                    <p 
                      className="text-lg font-medium text-[#434343]"
                      style={{
                        fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      {document.name}
                    </p>
                  </div>
                  <div className="col-span-4">
                    <p 
                      className="text-lg text-[#999999]"
                      style={{
                        fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      {document.eligibleAmount}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <button
                      onClick={() => handleViewDocument(document)}
                      className="text-lg font-bold text-[#079F9F] hover:text-[#058080] transition-colors"
                      style={{
                        fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
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
  );
};

export default ViewDocumentsModal;
