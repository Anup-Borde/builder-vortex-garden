"use client";

import React from "react";

const ContactDetailsSection = () => {
  const contactSection1Fields = [
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
  ];

  const contactSection2Fields = [
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
      label: "Company Registered URL",
      value: "Ecommerce",
    },
    {
      label: "Company Registered URL",
      value: "Ecommerce",
    },
    {
      label: "Company Registered URL",
      value: "Ecommerce",
    },
    {
      label: "Company Registered URL",
      value: "Ecommerce",
    },
  ];

  const ContactSection = ({ title, description, fields }) => (
    <div className="mb-8">
      <div className="mb-6">
        <h3 
          className="text-xl font-semibold text-[#333] mb-2"
          style={{
            fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "165%",
          }}
        >
          {title}
        </h3>
        <p 
          className="text-[#999] text-lg font-medium"
          style={{
            fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "120%",
          }}
        >
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
        {fields.map((field, index) => (
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
    </div>
  );

  return (
    <div>
      {/* First Contact Section */}
      <ContactSection
        title="Contact details"
        description="Insert the basic details of contact person"
        fields={contactSection1Fields}
      />

      {/* Second Contact Section */}
      <ContactSection
        title="Contact details"
        description="Insert the basic details of contact person"
        fields={contactSection2Fields}
      />
    </div>
  );
};

export { ContactDetailsSection };
