"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Eye,
  Edit,
  UserPlus,
  X,
  MapPin,
  Send,
  FileText,
  Zap,
  Link,
  Phone,
  XCircle,
  AlertTriangle,
  Shield,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/Toast";
import { LeadDetailsDrawer } from "@/components/LeadDetailsDrawer";

const ActionMenu = ({ leadId, onToast, leadData, userRole = "internal" }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showUWModal, setShowUWModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showLeadDetailsDrawer, setShowLeadDetailsDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTimestamp, setToastTimestamp] = useState("");

  const handleAction = (action, id) => {
    if (action === "view" || action === "track") {
      setShowLeadDetailsDrawer(true);
      setIsOpen(false);
    } else if (action === "sendToUW") {
      setShowUWModal(true);
      setIsOpen(false);
    } else {
      console.log(`${action} action for lead ${id}`);
      setIsOpen(false);
    }
  };

  const handleUWConfirm = () => {
    // Close modal
    setShowUWModal(false);

    // Show toast with timestamp
    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    setToastMessage("Lead sent successfully to underwriting team.");
    setToastTimestamp(timestamp);
    setShowToast(true);

    // Call parent handler if provided
    if (onToast) {
      onToast("Lead sent successfully to underwriting team.", timestamp);
    }

    console.log(`sendToUW action confirmed for lead ${leadId}`);
  };

  const handleUWCancel = () => {
    setShowUWModal(false);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-8 z-20 w-56 rounded-md border border-[#E0E0E0] bg-white py-1 shadow-lg max-h-80 overflow-y-auto">
            <button
              onClick={() => handleAction("track", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#282828] hover:bg-gray-50"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Track Lead
            </button>
            <button
              onClick={() => handleAction("sendPortalLink", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#282828] hover:bg-gray-50"
            >
              <Link className="mr-2 h-4 w-4" />
              Send Portal Link
            </button>
            <button
              onClick={() => handleAction("qec", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#282828] hover:bg-gray-50"
            >
              <Shield className="mr-2 h-4 w-4" />
              QEC
            </button>
            <button
              onClick={() => handleAction("clickToCall", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#282828] hover:bg-gray-50"
            >
              <Phone className="mr-2 h-4 w-4" />
              Click to Call
            </button>
            <button
              onClick={() => handleAction("edit", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#282828] hover:bg-gray-50"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Lead Details
            </button>
            <button
              onClick={() => handleAction("sendBankStatement", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#282828] hover:bg-gray-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Send Bank Statement
            </button>

            {/* Separator */}
            <div className="border-t border-gray-200 my-1"></div>

            <button
              onClick={() => handleAction("cancel", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Lead
            </button>
            <button
              onClick={() => handleAction("sendToUW", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#282828] hover:bg-gray-50"
            >
              <Send className="mr-2 h-4 w-4" />
              Send to UW
            </button>
            <button
              onClick={() => handleAction("sendToBRE", leadId)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#282828] hover:bg-gray-50"
            >
              <Zap className="mr-2 h-4 w-4" />
              Send to BRE
            </button>
          </div>
        </>
      )}

      {/* UW Confirmation Modal */}
      {showUWModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#282828]">
                  Confirm Send to UW
                </h3>
              </div>

              <p className="text-[#616060] mb-6">
                Are you sure you want to move{" "}
                <span className="font-medium text-[#282828]">{leadId}</span> to
                UW?
              </p>

              <div className="flex space-x-3 justify-end">
                <Button
                  onClick={handleUWCancel}
                  variant="outline"
                  className="border-[#E0E0E0] text-[#616060] hover:text-[#282828]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUWConfirm}
                  className="bg-[#079F9F] hover:bg-[#079F9F]/90 text-white"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        timestamp={toastTimestamp}
        isVisible={showToast}
        onClose={handleToastClose}
      />

      {/* Lead Details Drawer */}
      <LeadDetailsDrawer
        isOpen={showLeadDetailsDrawer}
        onClose={() => setShowLeadDetailsDrawer(false)}
        leadData={leadData}
        userRole={userRole}
      />
    </div>
  );
};

export { ActionMenu };
