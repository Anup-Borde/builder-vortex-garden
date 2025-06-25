"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionMenu } from "@/components/ActionMenu";

const ManageLeadsTable = ({ data, filters, userRole = "internal" }) => {
  // Mock data for demonstration
  const mockLeads = [
    {
      id: "CUST001",
      name: "Rajesh Kumar",
      orderId: "ORD2025001",
      mobile: "+91-9876543210",
      custRefNo: "REF001",
      chanceOfApproval: 85,
      orderAmount: "₹25,000",
      availableLimit: "₹50,000",
      maximumLimit: "₹1,00,000",
      date: "12-06-2025 14:30:45",
      status: "new-lead",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Approved",
        kyc: { poa: true },
        autoDebitSetup: true,
        disbursed: false,
      },
    },
    {
      id: "CUST002",
      name: "Priya Sharma",
      orderId: "ORD2025002",
      mobile: "+91-9876543211",
      custRefNo: "REF002",
      chanceOfApproval: 72,
      orderAmount: "₹15,000",
      availableLimit: "₹30,000",
      maximumLimit: "₹75,000",
      date: "12-06-2025 13:15:22",
      status: "doc-pending",
      trackingProgress: {
        documentation: { selfie: true, poi: false },
        approval: "Pending",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST003",
      name: "Amit Patel",
      orderId: "ORD2025003",
      mobile: "+91-9876543212",
      custRefNo: "REF003",
      chanceOfApproval: 91,
      orderAmount: "₹35,000",
      availableLimit: "₹70,000",
      maximumLimit: "₹1,50,000",
      date: "12-06-2025 12:45:10",
      status: "decision",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Approved",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST004",
      name: "Sunita Verma",
      orderId: "ORD2025004",
      mobile: "+91-9876543213",
      custRefNo: "REF004",
      chanceOfApproval: 45,
      orderAmount: "₹8,500",
      availableLimit: "₹20,000",
      maximumLimit: "₹40,000",
      date: "12-06-2025 11:20:35",
      status: "suspended",
      trackingProgress: {
        documentation: { selfie: false, poi: true },
        approval: "Suspended",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST005",
      name: "Vikram Singh",
      orderId: "ORD2025005",
      mobile: "+91-9876543214",
      custRefNo: "REF005",
      chanceOfApproval: 88,
      orderAmount: "₹42,000",
      availableLimit: "₹80,000",
      maximumLimit: "₹2,00,000",
      date: "12-06-2025 10:55:18",
      status: "disbursal-pending",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Approved",
        kyc: { poa: true },
        autoDebitSetup: true,
        disbursed: true,
      },
    },
    {
      id: "CUST006",
      name: "Kavya Reddy",
      orderId: "ORD2025006",
      mobile: "+91-9876543215",
      custRefNo: "REF006",
      chanceOfApproval: 67,
      orderAmount: "₹18,750",
      availableLimit: "₹35,000",
      maximumLimit: "₹85,000",
      date: "12-06-2025 09:30:55",
      status: "uw-will",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Decision Pending",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
  ];

  // Filter data based on status filter
  const filteredData =
    filters?.status && filters.status !== "all"
      ? mockLeads.filter((lead) => lead.status === filters.status)
      : mockLeads;

  const getChanceColor = (chance) => {
    if (chance >= 80) return "text-green-600 bg-green-50";
    if (chance >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-[#E0E0E0]">
              <TableHead className="font-semibold text-[#616060]">
                Customer ID
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Order ID
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Mobile Number
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Cust Ref No.
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Chance of Approval
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Order Amount
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Available Limit
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Maximum Limit
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Date
              </TableHead>
              <TableHead className="font-semibold text-[#616060] text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="border-b border-[#E0E0E0] hover:bg-gray-50"
                >
                  <TableCell className="font-medium text-[#282828]">
                    {lead.id}
                  </TableCell>
                  <TableCell className="text-[#282828]">
                    {lead.orderId}
                  </TableCell>
                  <TableCell className="text-[#282828]">
                    {lead.mobile}
                  </TableCell>
                  <TableCell className="text-[#282828]">
                    {lead.custRefNo}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getChanceColor(
                        lead.chanceOfApproval
                      )}`}
                    >
                      {lead.chanceOfApproval}%
                    </span>
                  </TableCell>
                  <TableCell className="text-[#282828] font-medium">
                    {lead.orderAmount}
                  </TableCell>
                  <TableCell className="text-[#282828]">
                    {lead.availableLimit}
                  </TableCell>
                  <TableCell className="text-[#282828]">
                    {lead.maximumLimit}
                  </TableCell>
                  <TableCell className="text-[#616060] text-sm">
                    {lead.date}
                  </TableCell>
                  <TableCell className="text-center">
                    <ActionMenu
                      leadId={lead.id}
                      leadData={lead}
                      userRole={userRole}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-8 text-[#616060]"
                >
                  No leads found matching the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredData.length > 0 && (
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-gray-50">
          <div className="flex items-center justify-between text-sm text-[#616060]">
            <span>
              Showing {filteredData.length} of {mockLeads.length} leads
            </span>
            <div className="flex items-center space-x-2">
              <span>Rows per page: 10</span>
              <div className="flex items-center space-x-1">
                <button className="p-1 rounded hover:bg-gray-200" disabled>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="px-2 py-1 text-xs bg-white border rounded">
                  1
                </span>
                <button className="p-1 rounded hover:bg-gray-200" disabled>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { ManageLeadsTable };
