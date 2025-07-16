"use client";

import React from "react";
import { CheckCircle, Clock, Circle } from "lucide-react";

const LeadTrackingStepper = ({ value = {} }) => {
  // Set the exact values as specified in the requirements
  const progress = {
    customerCreation: true, // Completed
    approval: "Surrogate Approval", // Surrogate Approval checked - step completed
    kycBankVerification: {
      selfie: false,
      poa: false,
      poi: false,
      vkyc: false,
      pennyDrop: false,
    }, // All unchecked - step in progress/current
    autoDebitSetup: false, // Inactive
    disbursed: false, // Inactive
    settlementCompleted: { partial: false, full: false }, // Inactive
  };

  // Helper function to determine step status - fixed to match requirements
  const getStepStatus = (stepKey) => {
    switch (stepKey) {
      case "customerCreation":
        return "completed"; // Always completed as specified

      case "approval":
        return "completed"; // Always completed as specified

      case "kycBankVerification":
        return "in-progress"; // Current step

      case "autoDebitSetup":
        return "not-started"; // Inactive

      case "disbursed":
        return "not-started"; // Inactive

      case "settlementCompleted":
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
    // KYC & Bank Verification is the current step as specified
    return stepKey === "kycBankVerification";
  };

  const steps = [
    {
      key: "customerCreation",
      title: "Customer Creation",
      subItems: [],
    },
    {
      key: "approval",
      title: "Approval",
      subItems: [
        {
          key: "surrogateApproval",
          label: "Surrogate Approval",
          checked: progress.approval === "Surrogate Approval",
        },
        {
          key: "incomeVerification",
          label: "Income Verification",
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
      key: "kycBankVerification",
      title: "KYC & Bank Verification",
      subItems: [
        {
          key: "selfie",
          label: "Selfie",
          checked: progress.kycBankVerification.selfie,
        },
        { key: "poa", label: "POA", checked: progress.kycBankVerification.poa },
        { key: "poi", label: "POI", checked: progress.kycBankVerification.poi },
        {
          key: "vkyc",
          label: "VKYC",
          checked: progress.kycBankVerification.vkyc,
        },
        {
          key: "pennyDrop",
          label: "Penny Drop",
          checked: progress.kycBankVerification.pennyDrop,
        },
      ],
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
    {
      key: "settlementCompleted",
      title: "Settlement completed",
      subItems: [
        {
          key: "partial",
          label: "Partial",
          checked: progress.settlementCompleted.partial,
        },
        {
          key: "full",
          label: "Full",
          checked: progress.settlementCompleted.full,
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Desktop View - Horizontal Layout */}
      <div className="hidden md:block">
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
                  ) : step.title === "Settlement completed" ? (
                    <span className="block">
                      <span className="block">Settlement</span>
                      <span className="block">completed</span>
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

      {/* Mobile View - Vertical Layout */}
      <div className="md:hidden">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.key);
            const isCurrent = isCurrentStep(step.key, index);

            return (
              <div key={step.key} className="flex items-start space-x-3">
                {/* Vertical Line and Icon */}
                <div className="flex flex-col items-center">
                  {/* Icon */}
                  <div className="bg-white p-1 rounded-full z-10">
                    <div className="h-5 w-5">{getStatusIcon(status)}</div>
                  </div>

                  {/* Vertical connecting line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  {/* Title */}
                  <div className="text-sm font-medium text-[#282828] mb-2">
                    {step.title}
                  </div>

                  {/* Sub-items */}
                  {step.subItems && step.subItems.length > 0 && (
                    <div className="space-y-2">
                      {step.subItems.map((subItem) => (
                        <div
                          key={subItem.key}
                          className="flex items-center space-x-2"
                        >
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              subItem.checked
                                ? "bg-[#079F9F] border-[#079F9F]"
                                : "border-gray-300"
                            }`}
                          >
                            {subItem.checked && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm text-[#282828]">
                            {subItem.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { LeadTrackingStepper };
