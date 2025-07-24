"use client";

import React from "react";
import { Check } from "lucide-react";

const MerchantDetailsForm = () => {
  const formFields = [
    {
      label: "Legal Name",
      value: "Juspay Technologies Pvt. Ltd.",
    },
    {
      label: "Brand Name", 
      value: "JUSPAY",
    },
    {
      label: "Company Registered URL",
      value: "htybvb,......",
    },
    {
      label: "Company Registered URL",
      value: "Ecommerce",
    },
    {
      label: "Choose a Risk Level",
      value: "1",
    },
    {
      label: "Choose a Category",
      value: "Private Limited",
    },
    {
      label: "Address line 1",
      value: "444, 3rd and 4th Floor, Stallion Business Center, 18th Main Road, 6th Block, Koramangala",
    },
    {
      label: "Address line 2",
      value: "Sneha sharma",
    },
    {
      label: "City",
      value: "Bengaluru",
    },
    {
      label: "State/Province/Region",
      value: "Karnataka",
    },
    {
      label: "Your location",
      value: "NOT REQUIRED",
    },
    {
      label: "Zip / Postal code",
      value: "560095",
    },
    {
      label: "Choose a Merchant type",
      value: "Direct Merchant",
    },
    {
      label: "Category Name (Alias Name)",
      value: "Juspay Technologies Pvt. Ltd.",
    },
    {
      label: "Brand Comm Name",
      value: "JUSPAY",
    },
    {
      label: "Merchant Relation",
      value: "Parent",
    },
    {
      label: "UTM Source",
      value: "JUSPAY",
    },
    {
      label: "PF-Colleted By",
      value: "None",
    },
    {
      label: "DP-Collated By",
      value: "None",
    },
    {
      label: "Pan-India",
      value: "Yes",
    },
  ];

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
        View Merchant Details
      </h2>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 mb-8">
        {formFields.map((field, index) => (
          <div key={index} className="flex flex-col gap-2.5">
            <label 
              className="text-[#737070] text-base font-normal"
              style={{
                fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "154%",
              }}
            >
              {field.label}
            </label>
            <div 
              className="bg-white border border-[#E0E0E0] rounded-lg px-4 py-4 min-h-[64px] flex items-center"
            >
              <span 
                className="text-[#434343] text-lg font-medium leading-7"
                style={{
                  fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "154%",
                }}
              >
                {field.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-6 h-6 bg-[#079F9F] border-2 border-[#079F9F] rounded">
            <Check className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <span 
            className="text-[#737070] text-base"
            style={{
              fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "153%",
            }}
          >
            Agent Led
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-6 h-6 bg-[#079F9F] border-2 border-[#079F9F] rounded">
            <Check className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <span 
            className="text-[#737070] text-base"
            style={{
              fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "153%",
            }}
          >
            Co-Lending
          </span>
        </div>
      </div>
    </div>
  );
};

export { MerchantDetailsForm };
