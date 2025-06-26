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

const LeadDetailsDrawer = ({
  isOpen,
  onClose,
  leadData,
  userRole = "internal",
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    typeOfCall: "",
    categoryType: "",
    rCode: "",
    subRCode: "",
    comments: "",
  });

  // Mock data - replace with actual leadData props
  const defaultLeadData = {
    name: "Gokul Bijarson",
    mobile: "9999999999",
    customerId: "CUST001",
    orderId: "23899344",
    customerRefId: "5498548845",
    transactionId: "348934989345",
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
    { id: "details", label: "Details" },
    { id: "track", label: "Track" },
    { id: "documents", label: "Document Upload" },
    { id: "comments", label: "Comment History" },
  ];

  const bottomActions = [
    { label: "Upload Estimated Bill", action: "uploadBill" },
    { label: "Cancel Lead", action: "cancelLead" },
    { label: "Send to UW", action: "sendToUW" },
    { label: "Send Bank Statement", action: "sendBankStatement" },
    { label: "Send to BRE", action: "sendToBRE" },
    { label: "Send to Webhook", action: "sendToWebhook" },
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

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-4xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0] bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-[#282828]">
              Lead Details
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="border-[#E0E0E0] text-[#079F9F] hover:bg-[#079F9F]/10"
            >
              <FileText className="mr-2 h-4 w-4" />
              View CIBIL Report
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Lead Summary */}
        <div className="p-3 sm:p-6 bg-gray-50 border-b border-[#E0E0E0]">
          <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mb-3 sm:mb-6">
            {/* Name & Mobile Section */}
            <div className="text-left">
              <p className="text-xs text-[#616060] mb-1">Name</p>
              <p className="font-medium text-xs sm:text-base text-[#282828] mb-2 leading-tight">
                {displayData.name}
              </p>
              <p className="text-xs text-[#616060] mb-1">Mobile</p>
              <p className="font-medium text-xs sm:text-base text-[#282828] leading-tight">
                {displayData.mobile}
              </p>
            </div>
            {/* Customer ID & Order ID Section */}
            <div className="text-left">
              <p className="text-xs text-[#616060] mb-1">Customer ID</p>
              <p className="font-medium text-xs sm:text-base text-[#282828] mb-2 leading-tight break-all">
                {displayData.customerId}
              </p>
              <p className="text-xs text-[#616060] mb-1">Order ID</p>
              <p className="font-medium text-xs sm:text-base text-[#282828] leading-tight break-all">
                {displayData.orderId}
              </p>
            </div>
            {/* Customer Ref ID & Transaction ID Section */}
            <div className="text-left sm:col-span-2 lg:col-span-1">
              <p className="text-xs text-[#616060] mb-1">Ref ID</p>
              <p className="font-medium text-xs sm:text-base text-[#282828] mb-2 leading-tight break-all">
                {displayData.customerRefId}
              </p>
              <p className="text-xs text-[#616060] mb-1">Transaction ID</p>
              <p className="font-medium text-xs sm:text-base text-[#282828] leading-tight break-all">
                {displayData.transactionId}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
            <div>
              <Label
                htmlFor="typeOfCall"
                className="text-xs sm:text-sm text-[#616060] text-left block mb-1"
              >
                Type of Call
              </Label>
              <Select
                value={formData.typeOfCall}
                onValueChange={(value) => handleFormChange("typeOfCall", value)}
              >
                <SelectTrigger className="h-8 sm:h-10 border-[#E0E0E0] text-xs sm:text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                  <SelectItem value="callback">Callback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="categoryType"
                className="text-xs sm:text-sm text-[#616060] text-left block mb-1"
              >
                Category Type
              </Label>
              <Select
                value={formData.categoryType}
                onValueChange={(value) =>
                  handleFormChange("categoryType", value)
                }
              >
                <SelectTrigger className="h-8 sm:h-10 border-[#E0E0E0] text-xs sm:text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inquiry">Inquiry</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="rCode"
                className="text-xs sm:text-sm text-[#616060] text-left block mb-1"
              >
                R-Code
              </Label>
              <Select
                value={formData.rCode}
                onValueChange={(value) => handleFormChange("rCode", value)}
              >
                <SelectTrigger className="h-8 sm:h-10 border-[#E0E0E0] text-xs sm:text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="R001">R001</SelectItem>
                  <SelectItem value="R002">R002</SelectItem>
                  <SelectItem value="R003">R003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="subRCode"
                className="text-xs sm:text-sm text-[#616060] text-left block mb-1"
              >
                Sub R-Code
              </Label>
              <Select
                value={formData.subRCode}
                onValueChange={(value) => handleFormChange("subRCode", value)}
              >
                <SelectTrigger className="h-8 sm:h-10 border-[#E0E0E0] text-xs sm:text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SR001">SR001</SelectItem>
                  <SelectItem value="SR002">SR002</SelectItem>
                  <SelectItem value="SR003">SR003</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4">
            <Label
              htmlFor="comments"
              className="text-sm text-[#616060] text-left block"
            >
              Internal Comments
            </Label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleFormChange("comments", e.target.value)}
              className="w-full mt-1 p-3 border border-[#E0E0E0] rounded-md resize-none focus:ring-[#079F9F] focus:border-[#079F9F]"
              rows={3}
              placeholder="Add your comments here..."
            />
          </div>

          <div className="text-left">
            <Button
              onClick={handleSave}
              className="h-12 px-6 bg-[#079F9F] hover:bg-[#079F9F]/90 text-white"
            >
              Save
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#E0E0E0]">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-[#079F9F] text-[#079F9F]"
                    : "border-transparent text-[#616060] hover:text-[#282828]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1">
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* First Row: Customer Details & Other Details side by side on mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                <div className="text-left">
                  <h3 className="text-sm lg:text-lg font-semibold text-[#282828] mb-3 lg:mb-4">
                    Customer Details
                  </h3>
                  <div className="space-y-2 lg:space-y-3">
                    <div>
                      <p className="text-xs lg:text-sm text-[#616060]">EMI</p>
                      <p className="font-medium text-xs lg:text-base text-[#282828]">
                        {displayData.emi}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-[#616060]">
                        EMI Due Date
                      </p>
                      <p className="font-medium text-xs lg:text-base text-[#282828]">
                        {displayData.emiDueDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-[#616060]">
                        Number of EMIs
                      </p>
                      <p className="font-medium text-xs lg:text-base text-[#282828]">
                        {displayData.numberOfEmis}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-sm lg:text-lg font-semibold text-[#282828] mb-3 lg:mb-4">
                    Other Details
                  </h3>
                  <div className="space-y-2 lg:space-y-3">
                    <div>
                      <p className="text-xs lg:text-sm text-[#616060]">
                        DP Refund
                      </p>
                      <p className="font-medium text-xs lg:text-base text-[#282828]">
                        {displayData.dpRefund}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-[#616060]">
                        DP Status
                      </p>
                      <p className="font-medium text-xs lg:text-base text-[#282828]">
                        {displayData.dpStatus}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Disbursement Details - Third column on desktop only */}
                <div className="text-left hidden lg:block">
                  <h3 className="text-lg font-semibold text-[#282828] mb-4">
                    Disbursement Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-[#616060]">Settlement Date</p>
                      <p className="font-medium text-[#282828]">
                        {displayData.settlementDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row: Disbursement Details below on mobile/tablet */}
              <div className="lg:hidden">
                <div className="text-left">
                  <h3 className="text-sm lg:text-lg font-semibold text-[#282828] mb-3 lg:mb-4">
                    Disbursement Details
                  </h3>
                  <div className="space-y-2 lg:space-y-3">
                    <div>
                      <p className="text-xs lg:text-sm text-[#616060]">
                        Settlement Date
                      </p>
                      <p className="font-medium text-xs lg:text-base text-[#282828]">
                        {displayData.settlementDate}
                      </p>
                    </div>
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
              <h3 className="text-lg font-semibold text-[#282828] mb-6">
                Document Upload
              </h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-12 border-[#E0E0E0] text-[#282828] hover:bg-gray-50"
                    onClick={() => handleAction(`uploadBill${index}`)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Estimated Bill {index}
                  </Button>
                ))}
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
        <div className="sticky bottom-0 p-6 border-t border-[#E0E0E0] bg-white z-10 shadow-lg">
          <div className="flex flex-wrap gap-2">
            {bottomActions.map((action, index) => (
              <Button
                key={index}
                variant={action.action === "cancelLead" ? "outline" : "default"}
                className={`flex-shrink-0 h-10 px-3 text-xs ${
                  action.action === "cancelLead"
                    ? "border-red-300 text-red-600 hover:bg-red-50"
                    : "bg-[#079F9F] hover:bg-[#079F9F]/90 text-white"
                }`}
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
