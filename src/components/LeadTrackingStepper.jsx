"use client";

import React from "react";
import { CheckCircle, Clock, Circle } from "lucide-react";

const LeadTrackingStepper = ({ value = {} }) => {
  // Set the exact values as specified in the requirements
  const progress = {
    documentation: { selfie: true, poi: true }, // Both checked - step completed
    approval: "Approved", // Approved checked - step completed
    kyc: { poa: false }, // POA unchecked - step in progress/current
    autoDebitSetup: false, // Inactive
    disbursed: false, // Inactive
  };

  // Helper function to determine step status - fixed to match requirements
  const getStepStatus = (stepKey) => {
    switch (stepKey) {
      case "documentation":
        return "completed"; // Always completed as specified

      case "approval":
        return "completed"; // Always completed as specified

      case "kyc":
        return "in-progress"; // Current step

      case "autoDebitSetup":
        return "not-started"; // Inactive

      case "disbursed":
        return "not-started"; // Inactive

      default:
        return "not-started";
    }
  };

  // Helper function to get the status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-full w-full text-green-500" />;
      case "in-progress":
        return <Clock className="h-full w-full text-orange-500" />;
      default:
        return <Circle className="h-full w-full text-gray-400" />;
    }
  };

  // Helper function to determine if step should be marked as current
  const isCurrentStep = (stepKey, stepIndex) => {
    // KYC is the current step as specified
    return stepKey === "kyc";
  };

  const steps = [
    {
      key: "documentation",
      title: "Documentation",
      subItems: [
        {
          key: "selfie",
          label: "Click Selfie",
          checked: progress.documentation.selfie,
        },
        { key: "poi", label: "POI", checked: progress.documentation.poi },
      ],
    },
    {
      key: "approval",
      title: "Approval",
      subItems: [
        {
          key: "approved",
          label: "Approved",
          checked: progress.approval === "Approved",
        },
        {
          key: "pending",
          label: "Decision Pending",
          checked: false, // Always unchecked as specified
        },
        {
          key: "suspended",
          label: "Suspended",
          checked: false, // Always unchecked as specified
        },
        {
          key: "rejected",
          label: "Rejected",
          checked: false, // Always unchecked as specified
        },
      ],
    },
    {
      key: "kyc",
      title: "KYC",
      subItems: [{ key: "poa", label: "POA", checked: progress.kyc.poa }],
    },
    {
      key: "autoDebitSetup",
      title: "Auto Debit Setup",
      subItems: [],
    },
    {
      key: "disbursed",
      title: "Disbursed",
      subItems: [],
    },
  ];

  return (
    <div className="w-full">
      {/* Stepper Row */}
      <div className="flex justify-between items-start relative">
        {/* Connecting Line */}
        <div className="absolute top-2 sm:top-3 left-0 right-0 h-0.5 bg-gray-200 z-0" />

        {steps.map((step, index) => {
          const status = getStepStatus(step.key);
          const isCurrent = isCurrentStep(step.key, index);

          return (
            <div
              key={step.key}
              className="flex flex-col items-start flex-1 z-10 px-1 sm:px-2"
            >
              {/* Icon */}
              <div className="bg-white p-0.5 sm:p-1 rounded-full z-10">
                <div className="h-4 w-4 sm:h-6 sm:w-6">
                  {getStatusIcon(status)}
                </div>
              </div>

              {/* Title */}
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-center text-[#282828] leading-tight">
                {step.title === "Auto Debit Setup" ? (
                  <span className="block">
                    <span className="block">Auto Debit</span>
                    <span className="block">Setup</span>
                  </span>
                ) : (
                  step.title
                )}
              </div>

              {/* Sub-items inline per step */}
              {step.subItems && step.subItems.length > 0 && (
                <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
                  {step.subItems.map((subItem) => (
                    <div
                      key={subItem.key}
                      className="flex items-center space-x-1 sm:space-x-2"
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center ${
                          subItem.checked
                            ? "bg-[#079F9F] border-[#079F9F]"
                            : "border-gray-300"
                        }`}
                      >
                        {subItem.checked && (
                          <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-[#282828] leading-tight">
                        {subItem.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { LeadTrackingStepper };
