"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionMenu } from "@/components/ActionMenu";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const ManageLeadsTable = ({ data, filters, userRole = "internal" }) => {
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock data for demonstration (expanded for pagination)
  const mockLeads = [
    {
      id: "CUST001",
      name: "Rajesh Kumar",
      orderId: "ORD2025001",
      mobile: "+91-9876543210",
      custRefNo: "REF001",
      chanceOfApproval: 85,
      orderAmount: "₹25,000",
      priority: "Hot",
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
      priority: "Warm",
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
      priority: "Cold",
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
      priority: "Hot",
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
      priority: "Warm",
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
      priority: "Cold",
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
    // Additional mock data for pagination
    {
      id: "CUST007",
      name: "Deepak Sharma",
      orderId: "ORD2025007",
      mobile: "+91-9876543216",
      custRefNo: "REF007",
      chanceOfApproval: 78,
      orderAmount: "₹28,000",
      priority: "Hot",
      availableLimit: "₹60,000",
      maximumLimit: "₹1,20,000",
      date: "12-06-2025 08:45:12",
      status: "new-lead",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Approved",
        kyc: { poa: true },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST008",
      name: "Neha Gupta",
      orderId: "ORD2025008",
      mobile: "+91-9876543217",
      custRefNo: "REF008",
      chanceOfApproval: 65,
      orderAmount: "₹12,500",
      priority: "Warm",
      availableLimit: "₹25,000",
      maximumLimit: "₹60,000",
      date: "12-06-2025 07:20:30",
      status: "doc-pending",
      trackingProgress: {
        documentation: { selfie: false, poi: true },
        approval: "Pending",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST009",
      name: "Arjun Reddy",
      orderId: "ORD2025009",
      mobile: "+91-9876543218",
      custRefNo: "REF009",
      chanceOfApproval: 92,
      orderAmount: "₹48,000",
      priority: "Hot",
      availableLimit: "₹90,000",
      maximumLimit: "₹1,80,000",
      date: "12-06-2025 06:15:45",
      status: "decision",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Approved",
        kyc: { poa: true },
        autoDebitSetup: true,
        disbursed: false,
      },
    },
    {
      id: "CUST010",
      name: "Meera Joshi",
      orderId: "ORD2025010",
      mobile: "+91-9876543219",
      custRefNo: "REF010",
      chanceOfApproval: 55,
      orderAmount: "₹22,000",
      priority: "Cold",
      availableLimit: "₹40,000",
      maximumLimit: "₹95,000",
      date: "12-06-2025 05:30:20",
      status: "suspended",
      trackingProgress: {
        documentation: { selfie: true, poi: false },
        approval: "Suspended",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST011",
      name: "Rohit Malhotra",
      orderId: "ORD2025011",
      mobile: "+91-9876543220",
      custRefNo: "REF011",
      chanceOfApproval: 83,
      orderAmount: "₹38,500",
      priority: "Warm",
      availableLimit: "₹75,000",
      maximumLimit: "₹1,65,000",
      date: "12-06-2025 04:45:15",
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
      id: "CUST012",
      name: "Anita Desai",
      orderId: "ORD2025012",
      mobile: "+91-9876543221",
      custRefNo: "REF012",
      chanceOfApproval: 70,
      orderAmount: "₹16,800",
      priority: "Cold",
      availableLimit: "₹32,000",
      maximumLimit: "₹78,000",
      date: "12-06-2025 03:20:40",
      status: "uw-will",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Decision Pending",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST013",
      name: "Karan Kapoor",
      orderId: "ORD2025013",
      mobile: "+91-9876543222",
      custRefNo: "REF013",
      chanceOfApproval: 89,
      orderAmount: "₹31,200",
      priority: "Hot",
      availableLimit: "₹65,000",
      maximumLimit: "₹1,35,000",
      date: "12-06-2025 02:15:25",
      status: "new-lead",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Approved",
        kyc: { poa: true },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST014",
      name: "Pooja Agarwal",
      orderId: "ORD2025014",
      mobile: "+91-9876543223",
      custRefNo: "REF014",
      chanceOfApproval: 61,
      orderAmount: "₹19,750",
      priority: "Warm",
      availableLimit: "₹38,000",
      maximumLimit: "₹88,000",
      date: "12-06-2025 01:45:10",
      status: "doc-pending",
      trackingProgress: {
        documentation: { selfie: false, poi: true },
        approval: "Pending",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST015",
      name: "Sanjay Trivedi",
      orderId: "ORD2025015",
      mobile: "+91-9876543224",
      custRefNo: "REF015",
      chanceOfApproval: 76,
      orderAmount: "₹44,000",
      priority: "Hot",
      availableLimit: "₹85,000",
      maximumLimit: "₹1,70,000",
      date: "12-06-2025 00:30:35",
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
      id: "CUST016",
      name: "Rashmi Nair",
      orderId: "ORD2025016",
      mobile: "+91-9876543225",
      custRefNo: "REF016",
      chanceOfApproval: 52,
      orderAmount: "₹13,400",
      priority: "Cold",
      availableLimit: "₹28,000",
      maximumLimit: "₹65,000",
      date: "11-06-2025 23:15:50",
      status: "suspended",
      trackingProgress: {
        documentation: { selfie: true, poi: false },
        approval: "Suspended",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST017",
      name: "Manish Bansal",
      orderId: "ORD2025017",
      mobile: "+91-9876543226",
      custRefNo: "REF017",
      chanceOfApproval: 87,
      orderAmount: "₹36,800",
      priority: "Warm",
      availableLimit: "₹72,000",
      maximumLimit: "₹1,58,000",
      date: "11-06-2025 22:45:15",
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
      id: "CUST018",
      name: "Shweta Iyer",
      orderId: "ORD2025018",
      mobile: "+91-9876543227",
      custRefNo: "REF018",
      chanceOfApproval: 68,
      orderAmount: "₹21,600",
      priority: "Cold",
      availableLimit: "₹42,000",
      maximumLimit: "₹92,000",
      date: "11-06-2025 21:30:40",
      status: "uw-will",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Decision Pending",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST019",
      name: "Ajay Thakur",
      orderId: "ORD2025019",
      mobile: "+91-9876543228",
      custRefNo: "REF019",
      chanceOfApproval: 94,
      orderAmount: "₹52,000",
      priority: "Hot",
      availableLimit: "₹95,000",
      maximumLimit: "₹1,90,000",
      date: "11-06-2025 20:15:25",
      status: "new-lead",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Approved",
        kyc: { poa: true },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST020",
      name: "Divya Chopra",
      orderId: "ORD2025020",
      mobile: "+91-9876543229",
      custRefNo: "REF020",
      chanceOfApproval: 59,
      orderAmount: "₹17,200",
      priority: "Warm",
      availableLimit: "₹34,000",
      maximumLimit: "₹82,000",
      date: "11-06-2025 19:45:10",
      status: "doc-pending",
      trackingProgress: {
        documentation: { selfie: false, poi: true },
        approval: "Pending",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST021",
      name: "Ravi Saxena",
      orderId: "ORD2025021",
      mobile: "+91-9876543230",
      custRefNo: "REF021",
      chanceOfApproval: 81,
      orderAmount: "₹39,600",
      priority: "Hot",
      availableLimit: "₹78,000",
      maximumLimit: "₹1,62,000",
      date: "11-06-2025 18:30:35",
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
      id: "CUST022",
      name: "Priya Menon",
      orderId: "ORD2025022",
      mobile: "+91-9876543231",
      custRefNo: "REF022",
      chanceOfApproval: 47,
      orderAmount: "₹14,800",
      priority: "Cold",
      availableLimit: "₹30,000",
      maximumLimit: "₹68,000",
      date: "11-06-2025 17:15:50",
      status: "suspended",
      trackingProgress: {
        documentation: { selfie: true, poi: false },
        approval: "Suspended",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST023",
      name: "Vishal Rao",
      orderId: "ORD2025023",
      mobile: "+91-9876543232",
      custRefNo: "REF023",
      chanceOfApproval: 85,
      orderAmount: "₹33,400",
      priority: "Warm",
      availableLimit: "₹68,000",
      maximumLimit: "₹1,48,000",
      date: "11-06-2025 16:45:15",
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
      id: "CUST024",
      name: "Sneha Kulkarni",
      orderId: "ORD2025024",
      mobile: "+91-9876543233",
      custRefNo: "REF024",
      chanceOfApproval: 63,
      orderAmount: "₹26,200",
      priority: "Cold",
      availableLimit: "₹52,000",
      maximumLimit: "₹1,05,000",
      date: "11-06-2025 15:30:40",
      status: "uw-will",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Decision Pending",
        kyc: { poa: false },
        autoDebitSetup: false,
        disbursed: false,
      },
    },
    {
      id: "CUST025",
      name: "Gaurav Singhal",
      orderId: "ORD2025025",
      mobile: "+91-9876543234",
      custRefNo: "REF025",
      chanceOfApproval: 90,
      orderAmount: "₹46,800",
      priority: "Hot",
      availableLimit: "₹88,000",
      maximumLimit: "₹1,82,000",
      date: "11-06-2025 14:15:25",
      status: "new-lead",
      trackingProgress: {
        documentation: { selfie: true, poi: true },
        approval: "Approved",
        kyc: { poa: true },
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

  // Sort data by order amount
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === null) return 0;

    // Extract numeric value from order amount (remove ₹ and commas)
    const amountA = parseInt(a.orderAmount.replace(/[₹,]/g, ""));
    const amountB = parseInt(b.orderAmount.replace(/[₹,]/g, ""));

    if (sortOrder === "desc") {
      return amountB - amountA; // High to low
    } else {
      return amountA - amountB; // Low to high
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  const handleSort = () => {
    if (sortOrder === null) {
      setSortOrder("desc"); // Start with high to low
    } else if (sortOrder === "desc") {
      setSortOrder("asc"); // Switch to low to high
    } else {
      setSortOrder(null); // Reset to no sorting
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const getChanceColor = (chance) => {
    if (chance >= 80) return "text-green-600 bg-green-50";
    if (chance >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Hot":
        return "text-red-600 bg-red-50";
      case "Warm":
        return "text-orange-600 bg-orange-50";
      case "Cold":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFFBF1] border-b border-[#E0E0E0]">
              <TableHead className="font-semibold text-[#616060]">
                Cust ID
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Order ID
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Mobile no.
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Cust Ref No.
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Approval chance
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={handleSort}
                >
                  <span>Order Amount</span>
                  {sortOrder === null && <ArrowUpDown className="h-4 w-4" />}
                  {sortOrder === "desc" && <ArrowDown className="h-4 w-4" />}
                  {sortOrder === "asc" && <ArrowUp className="h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Lead Priority
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Available Limit
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Maximum Limit
              </TableHead>
              <TableHead className="font-semibold text-[#616060]">
                Date/Time
              </TableHead>
              <TableHead className="font-semibold text-[#616060] text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData.length > 0 ? (
              currentPageData.map((lead) => (
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
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                        lead.priority
                      )}`}
                    >
                      {lead.priority}
                    </span>
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
                  colSpan={11}
                  className="text-center py-8 text-[#616060]"
                >
                  No leads found matching the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {sortedData.length > 0 && (
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-gray-50">
          <div className="flex items-center justify-between text-sm text-[#616060]">
            <div className="flex items-center gap-4">
              <span>
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, sortedData.length)} of {sortedData.length}{" "}
                leads
              </span>
              <div className="flex items-center gap-2">
                <span>Show at time</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="itemsPerPage"
                      value="10"
                      checked={itemsPerPage === 10}
                      onChange={() => handleItemsPerPageChange(10)}
                      className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                    />
                    <span>10 Cases</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="itemsPerPage"
                      value="15"
                      checked={itemsPerPage === 15}
                      onChange={() => handleItemsPerPageChange(15)}
                      className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                    />
                    <span>15 Cases</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="itemsPerPage"
                      value="20"
                      checked={itemsPerPage === 20}
                      onChange={() => handleItemsPerPageChange(20)}
                      className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                    />
                    <span>20 Cases</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <button
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 text-xs rounded ${
                        currentPage === page
                          ? "bg-teal-600 text-white"
                          : "bg-white border hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
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
