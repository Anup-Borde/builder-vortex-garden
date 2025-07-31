"use client";

import React from "react";
import { CheckCircle, Clock, Circle } from "lucide-react";

const LeadTrackingStepper = ({ value = {} }) => {
  // Set the exact values as specified in the requirements
  const progress = {
    customerCreation: true, // Completed
    approval: "Approved", // Show Approved ticked
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
      subItems: [
        {
          key: "clickSelfie",
          label: "Click Selfie",
          checked: progress.customerCreation,
        },
        {
          key: "poi",
          label: "Click POI",
          checked: progress.customerCreation,
        },
      ],
    },
    {
      key: "approval",
      title: "Approval",
      subItems: [
        {
          key: "Approved",
          label: "Approved",
          checked: progress.approval === "Approved",
        },
        {
          key: "bsRequired",
          label: "BS Required",
          checked: progress.approval === "BS Required",
        },
        {
          key: "suspended",
          label: "Suspended",
          checked: false,
        },
        {
          key: "rejected",
          label: "Rejected",
          checked: false,
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
      subItems: [
        {
          key: "initiated",
          label: "Initiated",
          checked: progress.autoDebitSetup.initiated,
        },
        {
          key: "completed",
          label: "Completed",
          checked: progress.autoDebitSetup.completed,
        },
      ],
    },
    {
      key: "disbursed",
      title: "Disbursed",
      subItems: [
        {
          key: "initiated",
          label: "Initiated",
          checked: progress.disbursed.initiated,
        },
        {
          key: "completed",
          label: "Completed",
          checked: progress.disbursed.completed,
        },
      ],
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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {steps.map((step, stepIndex) => (
        <div
          key={step.key}
          className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden flex flex-col items-start min-w-0"
        >
          <div
            className="bg-[#FFFBF1] border-b border-[#E6E6E6] w-full px-3 py-2"
            style={{ marginBottom: 0 }}
          >
            <h3 className="text-base font-semibold text-[#434343] text-left leading-tight">
              {step.title}
            </h3>
          </div>
          <div className="flex flex-col gap-4 w-full p-3">
            {step.subItems && step.subItems.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                {step.subItems.map((subItem, subIndex) => (
                  <div key={subItem.key} className="flex items-center w-full">
                    <div className="relative flex flex-col items-center mr-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          subItem.checked
                            ? "bg-[#079F9F] border-[#079F9F]"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {subItem.checked && (
                          <div className="w-3.5 h-3.5 rounded-full bg-white" />
                        )}
                      </div>
                      {subIndex < step.subItems.length - 1 && (
                        <div className="w-0.5 h-7 bg-[#079F9F] absolute top-6 left-1/2 -translate-x-1/2" />
                      )}
                    </div>
                    <span className="text-base font-medium text-[#434343]">
                      {subItem.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { LeadTrackingStepper };
