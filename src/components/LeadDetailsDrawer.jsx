"use client";

import React, { useState } from "react";
import { X, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadTrackingStepper } from "@/components/LeadTrackingStepper";
import { CommentInput } from "@/components/CommentInput";
import DocumentUploadCard from "@/components/DocumentUploadCard";
import ViewDocumentsModal from "@/components/ViewDocumentsModal";

const LeadDetailsDrawer = ({
  isOpen,
  onClose,
  leadData,
  userRole = "internal",
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isViewDocumentsModalOpen, setIsViewDocumentsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    typeOfCall: "",
    categoryType: "",
    rCode: "",
    subRCode: "",
    comments: "",
  });

  // Mock data - replace with actual leadData props
  const defaultLeadData = {
    name: "Sudesh shettty",
    mobile: "+91-9876543210",
    customerId: "CUST001",
    orderId: "ORD2025001",
    customerRefId: "REF001",
    transactionId: "N/A",
    emi: "₹9,999.00",
    emiDueDate: "15th of every month",
    dpRefund: "₹2,000.00",
    numberOfEmis: "12",
    dpStatus: "Received",
    settlementDate: "2025-12-15",
    // Legacy trackingStages for backward compatibility
    trackingStages: [
      {
        name: "Documentation",
        status: "completed",
        items: ["Click Selfie", "POI"],
      },
      {
        name: "Approval",
        status: "current",
        items: ["Approved", "Decision Pending", "Rejected"],
      },
      { name: "KYC", status: "pending", items: ["POA"] },
      { name: "Auto Debit Setup", status: "pending", items: [] },
      { name: "Disbursed", status: "pending", items: [] },
    ],
    // New tracking progress format for LeadTrackingStepper
    trackingProgress: {
      documentation: { selfie: true, poi: true },
      approval: "Approved",
      kyc: { poa: false },
      autoDebitSetup: false,
      disbursed: false,
    },
    commentHistory: [
      {
        logDate: "2025-12-12 14:30",
        type: "Internal",
        rCode: "R001",
        subRCode: "SR001",
        comments: "Initial review completed",
      },
      {
        logDate: "2025-12-11 16:45",
        type: "Customer",
        rCode: "R002",
        subRCode: "SR002",
        comments: "Customer called for status update",
      },
    ],
  };

  const currentLeadData = leadData || defaultLeadData;

  // Map leadData properties to match the expected structure
  const mappedLeadData = leadData
    ? {
        name: leadData.name || "N/A",
        mobile: leadData.mobile || "N/A",
        customerId: leadData.id || leadData.customerId || "N/A",
        orderId: leadData.orderId || "N/A",
        customerRefId: leadData.custRefNo || leadData.customerRefId || "N/A",
        transactionId: leadData.transactionId || "N/A",
        emi: leadData.emi || defaultLeadData.emi,
        emiDueDate: leadData.emiDueDate || defaultLeadData.emiDueDate,
        dpRefund: leadData.dpRefund || defaultLeadData.dpRefund,
        numberOfEmis: leadData.numberOfEmis || defaultLeadData.numberOfEmis,
        dpStatus: leadData.dpStatus || defaultLeadData.dpStatus,
        settlementDate:
          leadData.settlementDate || defaultLeadData.settlementDate,
        trackingStages:
          leadData.trackingStages || defaultLeadData.trackingStages,
        trackingProgress:
          leadData.trackingProgress || defaultLeadData.trackingProgress,
        commentHistory:
          leadData.commentHistory || defaultLeadData.commentHistory,
      }
    : defaultLeadData;

  const displayData = mappedLeadData;

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving form data:", formData);
    // Add save logic here
  };

  const handleAction = (action) => {
    console.log(`${action} action triggered`);
    // Add action handlers here
  };

  const tabs = [
    { id: "details", label: "Loan Detail" },
    { id: "track", label: "Track" },
    { id: "documents", label: "Document Upload" },
    { id: "comments", label: "Comment details" },
  ];

  const bottomActions = [
    { label: "Upload Estimated Bill", action: "uploadBill" },
    { label: "Cancel Lead", action: "cancelLead" },
    { label: "Send to UW", action: "sendToUW" },
    { label: "Send Bank Settlement", action: "sendBankStatement" },
    { label: "Sent to BRE", action: "sendToBRE" },
    { label: "Send to webhook", action: "sendToWebhook" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(136, 136, 136, 0.7)" }}
        onClick={onClose}
      />

      {/* Drawer - now full screen */}
      <div className="fixed inset-0 h-full w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Customer Details Section - now at top */}
        <div className="p-6 bg-gray-50 border-b border-[#E0E0E0] relative">
          {/* Fixed Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 fixed top-6 right-6 z-50"
            style={{ zIndex: 100 }}
          >
            <X className="h-5 w-5" />
          </Button>
          {/* Customer Details Card */}
          <div className="bg-white border border-[#E6E6E6] rounded-2xl relative p-4 sm:p-6">
            {/* Title */}
            <div className="pt-5 pb-4">
              <h3
                className="text-xl font-semibold text-[#333] text-left"
                style={{
                  fontFamily:
                    "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Customer details
              </h3>
            </div>

            {/* Content Area */}
            <div className="pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 md:gap-y-0 w-full">
              {/* Left side - Customer Fields */}
              <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-12 lg:gap-16 items-start justify-start text-left w-full">
                {/* Name */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <span
                    className="text-base text-[#999] font-medium"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Name
                  </span>
                  <span
                    className="text-lg font-semibold text-[#434343]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    {displayData.name}
                  </span>
                </div>

                {/* Customer ID */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <span
                    className="text-base text-[#999] font-medium"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Customer ID
                  </span>
                  <span
                    className="text-lg font-semibold text-[#434343]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    {displayData.customerId}
                  </span>
                </div>

                {/* Customer Ref ID */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <span
                    className="text-base text-[#999] font-medium"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Customer Ref ID
                  </span>
                  <span
                    className="text-lg font-semibold text-[#434343]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    {displayData.customerRefId}
                  </span>
                </div>

                {/* Mobile no */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <span
                    className="text-base text-[#999] font-medium"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Mobile no
                  </span>
                  <span
                    className="text-lg font-semibold text-[#434343]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    {displayData.mobile.startsWith("+91")
                      ? displayData.mobile
                      : `+91-${displayData.mobile}`}
                  </span>
                </div>

                {/* Order ID */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <span
                    className="text-base text-[#999] font-medium"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Order ID
                  </span>
                  <span
                    className="text-lg font-semibold text-[#434343]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    {displayData.orderId}
                  </span>
                </div>

                {/* Transaction ID */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <span
                    className="text-base text-[#999] font-medium"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Transaction ID
                  </span>
                  <span
                    className="text-lg font-semibold text-[#434343]"
                    style={{
                      fontFamily:
                        "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    {displayData.transactionId}
                  </span>
                </div>
              </div>

              {/* Right side - Button */}
              <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-8 w-full md:w-auto">
                <Button
                  variant="outline"
                  className="border-[#079F9F] text-[#079F9F] hover:bg-[#079F9F]/10 px-6 py-3 rounded-lg font-semibold text-left w-full md:w-auto"
                  style={{
                    fontFamily:
                      "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  View CIBIL Report
                </Button>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 mt-4 w-full">
            <div className="min-w-[120px] flex-1">
              <Select
                value={formData.typeOfCall}
                onValueChange={(value) => handleFormChange("typeOfCall", value)}
              >
                <SelectTrigger className="h-12 border-[#E0E0E0] text-sm">
                  <SelectValue placeholder="Type of Call" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                  <SelectItem value="callback">Callback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[120px] flex-1">
              <Select
                value={formData.categoryType}
                onValueChange={(value) =>
                  handleFormChange("categoryType", value)
                }
              >
                <SelectTrigger className="h-12 border-[#E0E0E0] text-sm">
                  <SelectValue placeholder="Category Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inquiry">Inquiry</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[100px] flex-1">
              <Select
                value={formData.rCode}
                onValueChange={(value) => handleFormChange("rCode", value)}
              >
                <SelectTrigger className="h-12 border-[#E0E0E0] text-sm">
                  <SelectValue placeholder="R-Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="R001">R001</SelectItem>
                  <SelectItem value="R002">R002</SelectItem>
                  <SelectItem value="R003">R003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[110px] flex-1">
              <Select
                value={formData.subRCode}
                onValueChange={(value) => handleFormChange("subRCode", value)}
              >
                <SelectTrigger className="h-12 border-[#E0E0E0] text-sm">
                  <SelectValue placeholder="Sub R-Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SR001">SR001</SelectItem>
                  <SelectItem value="SR002">SR002</SelectItem>
                  <SelectItem value="SR003">SR003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-[2] min-w-[296px]">
              <CommentInput
                value={formData.comments}
                onChange={(value) => handleFormChange("comments", value)}
                onSubmit={(comment) => {
                  console.log("Comment submitted:", comment);
                  handleSave();
                }}
                placeholder="Add your comment here..."
                className="w-full max-w-none"
              />
            </div>
          </div>

          {/* Second Row - Comments and Save Button */}
          {/* ...removed second row, now handled above... */}
        </div>

        {/* Tab Navigation */}
        <div className="p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 h-12 px-4 flex items-center justify-center rounded-full border transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#079F9F] bg-[#E6F5F5] text-[#079F9F] font-semibold"
                    : "border-[#E6E6E6] bg-white text-[#999] hover:text-[#282828] hover:border-[#D0D0D0]"
                }`}
                style={{
                  fontFamily:
                    "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: activeTab === tab.id ? "14px" : "16px",
                  fontWeight: activeTab === tab.id ? "600" : "500",
                  lineHeight: activeTab === tab.id ? "156%" : "168%",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Details Card */}
              <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
                <div className="bg-[#FFFBF1] border-b border-[#E6E6E6] px-7 py-4">
                  <h3 className="text-lg font-semibold text-black text-left">
                    Customer Details
                  </h3>
                </div>
                <div className="px-7 py-6 space-y-2">
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Name
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.name}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      EMI Due Date :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.emiDueDate}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Name
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.name}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                    <span className="text-base font-semibold text-[#079F9F] cursor-pointer hover:underline">
                      Verify link
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Details Card */}
              <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
                <div className="bg-[#FFFBF1] border-b border-[#E6E6E6] px-7 py-4">
                  <h3 className="text-lg font-semibold text-black text-left">
                    Order Details
                  </h3>
                </div>
                <div className="px-7 py-6 space-y-2">
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Name
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.name}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      EMI Due Date :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.emiDueDate}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Name
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.name}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                </div>
              </div>

              {/* Disbursement Details Card */}
              <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
                <div className="bg-[#FFFBF1] border-b border-[#E6E6E6] px-7 py-4">
                  <h3 className="text-lg font-semibold text-black text-left">
                    Disbursement Details
                  </h3>
                </div>
                <div className="px-7 py-6 space-y-2">
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Name
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.name}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      EMI Due Date :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.emiDueDate}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Name
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.name}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                  <div className="flex items-center py-1 text-left gap-2">
                    <span className="text-sm text-[#999] font-medium">
                      Number of EMI :
                    </span>
                    <span className="text-base font-semibold text-[#434343]">
                      {displayData.numberOfEmis}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "track" && (
            <div className="text-left">
              <h3 className="text-lg font-semibold text-[#282828] mb-6">
                Lead Tracking Timeline
              </h3>
              <LeadTrackingStepper value={displayData.trackingProgress} />
            </div>
          )}

          {activeTab === "documents" && (
            <div className="text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DocumentUploadCard
                  title="Agency Profile"
                  description="If the doc is available upload"
                  state="default"
                  onClick={() => handleAction("uploadAgencyProfile1")}
                />
                <DocumentUploadCard
                  title="Agency Profile"
                  description="If the doc is available upload"
                  state="default"
                  onClick={() => handleAction("uploadAgencyProfile2")}
                />
                <DocumentUploadCard
                  title="List of Agency Pin Codes and Staff"
                  description="If the doc is available upload"
                  state="uploaded"
                  undoText="Undo in 10sec"
                  onClick={() => handleAction("uploadPinCodesAndStaff1")}
                />
                <DocumentUploadCard
                  title="List of Agency Pin Codes and Staff"
                  description="If the doc is available upload"
                  state="uploaded"
                  onClick={() => handleAction("uploadPinCodesAndStaff2")}
                />
                <DocumentUploadCard
                  title="Onboarding Approval"
                  description="If the doc is available upload"
                  state="default"
                  onClick={() => handleAction("uploadOnboardingApproval1")}
                />
                <DocumentUploadCard
                  title="Onboarding Approval"
                  description="If the doc is available upload"
                  state="default"
                  onClick={() => handleAction("uploadOnboardingApproval2")}
                />
              </div>
            </div>
          )}

          {activeTab === "comments" && userRole !== "external" && (
            <div className="text-left">
              <h3 className="text-lg font-semibold text-[#282828] mb-6">
                Comment History
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-[#E0E0E0] rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-[#616060]">
                        Log Date
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-[#616060]">
                        Type
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-[#616060]">
                        R Code
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-[#616060]">
                        Sub R Code
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-[#616060]">
                        Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.commentHistory.map((comment, index) => (
                      <tr key={index} className="border-t border-[#E0E0E0]">
                        <td className="p-4 text-sm text-[#282828] text-left">
                          {comment.logDate}
                        </td>
                        <td className="p-4 text-sm text-[#282828] text-left">
                          {comment.type}
                        </td>
                        <td className="p-4 text-sm text-[#282828] text-left">
                          {comment.rCode}
                        </td>
                        <td className="p-4 text-sm text-[#282828] text-left">
                          {comment.subRCode}
                        </td>
                        <td className="p-4 text-sm text-[#282828] text-left">
                          {comment.comments}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "comments" && userRole === "external" && (
            <div className="text-left py-8">
              <p className="text-[#616060]">
                Comment history is not available for external users.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 p-6 border-t border-[#E6E6E6] bg-white z-10 shadow-[0px_-3px_10.4px_0px_rgba(0,0,0,0.12)] rounded-t-2xl">
          <div className="flex flex-wrap justify-end gap-3 sm:gap-4 overflow-x-auto">
            {bottomActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex-shrink-0 h-10 px-2 sm:px-3 text-xs sm:text-sm font-bold border-[1.5px] border-[#079F9F] text-[#079F9F] bg-transparent hover:bg-[#079F9F]/5 focus:bg-[#079F9F]/5 active:bg-[#079F9F]/10 rounded-lg transition-all duration-200 whitespace-nowrap min-w-fit"
                style={{
                  fontFamily:
                    "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "154%",
                }}
                onClick={() => handleAction(action.action)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { LeadDetailsDrawer };
