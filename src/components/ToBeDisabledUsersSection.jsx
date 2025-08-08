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
import { UserMinus, Eye, Clock } from "lucide-react";

const ToBeDisabledUsersSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // To be disabled users data from the provided JSON
  const toBeDisabledUsers = [
    {
      merchantId: 6394,
      empId: "ESPL717",
      agentName: "Wasim Shaikh",
      mobile: 8888553376,
      emailId: "wasim.shaikh@fibe.in",
      merchantUserId: 22609,
      categories: [],
      roles: ["ES_ADMIN"]
    },
    {
      merchantId: 6394,
      empId: "",
      agentName: "atul gaikwad",
      mobile: 9503196945,
      emailId: "atul.gaikwad@fibe.in",
      merchantUserId: 21485,
      categories: [],
      roles: ["SUPERADMIN"]
    },
    {
      merchantId: 6394,
      empId: "ESPL721",
      agentName: "Rajesh Patel",
      mobile: 9876543213,
      emailId: "rajesh.patel@fibe.in",
      merchantUserId: 22610,
      categories: ["SME"],
      roles: ["AGENT", "MENTOR"]
    },
    {
      merchantId: 13453,
      empId: "ESPL722",
      agentName: "Sunita Verma",
      mobile: 9876543214,
      emailId: "sunita.verma@company.com",
      merchantUserId: 21486,
      categories: ["Retail", "Personal"],
      roles: ["TEAM_LEAD"]
    },
    {
      merchantId: 6394,
      empId: "ESPL723",
      agentName: "Kiran Shah",
      mobile: 9876543215,
      emailId: "kiran.shah@fibe.in",
      merchantUserId: 22611,
      categories: ["Corporate"],
      roles: ["SENIOR_AGENT", "SUPERVISOR"]
    }
  ];

  // Pagination
  const totalPages = Math.ceil(toBeDisabledUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = toBeDisabledUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleDisableUser = (userId) => {
    console.log("Disabling user immediately:", userId);
    // Implementation for immediate disable
  };

  const handleViewDetails = (userId) => {
    console.log("Viewing user details:", userId);
    // Implementation for viewing user details
  };

  const handleCancelDisable = (userId) => {
    console.log("Cancelling disable for user:", userId);
    // Implementation for cancelling disable action
  };

  const formatMobile = (mobile) => {
    return `+91-${mobile}`;
  };

  const formatEmployeeId = (empId) => {
    return empId || "N/A";
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#282828] mb-2">
          To Be Disabled Users
        </h2>
        <p className="text-[#616060]">
          Users who are scheduled to be disabled and pending action
        </p>
      </div>

      {/* To Be Disabled Users Table */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FFFBF1] border-b border-[#E0E0E0]">
                <TableHead className="font-semibold text-[#616060]">Employee ID</TableHead>
                <TableHead className="font-semibold text-[#616060]">Merchant User ID</TableHead>
                <TableHead className="font-semibold text-[#616060]">Merchant ID</TableHead>
                <TableHead className="font-semibold text-[#616060]">Mobile Number</TableHead>
                <TableHead className="font-semibold text-[#616060]">Agent Name</TableHead>
                <TableHead className="font-semibold text-[#616060]">Email ID</TableHead>
                <TableHead className="font-semibold text-[#616060]">Categories</TableHead>
                <TableHead className="font-semibold text-[#616060]">Roles</TableHead>
                <TableHead className="font-semibold text-[#616060]">Status</TableHead>
                <TableHead className="font-semibold text-[#616060] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageData.length > 0 ? (
                currentPageData.map((user, index) => (
                  <TableRow
                    key={user.merchantUserId}
                    className="border-b border-[#E0E0E0] hover:bg-gray-50 bg-orange-50"
                  >
                    <TableCell className="font-medium text-[#282828]">
                      {formatEmployeeId(user.empId)}
                    </TableCell>
                    <TableCell className="text-[#282828]">{user.merchantUserId}</TableCell>
                    <TableCell className="text-[#282828]">{user.merchantId}</TableCell>
                    <TableCell className="text-[#282828]">{formatMobile(user.mobile)}</TableCell>
                    <TableCell className="text-[#282828]">{user.agentName}</TableCell>
                    <TableCell className="text-[#282828]">{user.emailId}</TableCell>
                    <TableCell className="text-[#282828]">
                      <div className="flex flex-wrap gap-1">
                        {user.categories.length > 0 ? (
                          user.categories.map((category, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {category}
                            </span>
                          ))
                        ) : (
                          <span className="text-[#999] text-sm">No categories</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#282828]">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {role.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending Disable
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(user.merchantUserId)}
                          className="p-2 text-[#079F9F] hover:bg-[#e6f7f7] rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDisableUser(user.merchantUserId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Disable Now"
                        >
                          <UserMinus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCancelDisable(user.merchantUserId)}
                          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                          title="Cancel Disable"
                        >
                          Cancel
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-[#616060]"
                  >
                    No users scheduled for disable.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {toBeDisabledUsers.length > 0 && (
          <div className="px-6 py-4 border-t border-[#E0E0E0] bg-orange-50">
            <div className="flex items-center justify-between text-sm text-[#616060]">
              <div className="flex items-center gap-4">
                <span>
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, toBeDisabledUsers.length)} of {toBeDisabledUsers.length}{" "}
                  users to be disabled
                </span>
                <div className="flex items-center gap-2">
                  <span>Show at time</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="toBeDisabledItemsPerPage"
                        value="10"
                        checked={itemsPerPage === 10}
                        onChange={() => handleItemsPerPageChange(10)}
                        className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                      />
                      <span>10 Users</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="toBeDisabledItemsPerPage"
                        value="15"
                        checked={itemsPerPage === 15}
                        onChange={() => handleItemsPerPageChange(15)}
                        className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                      />
                      <span>15 Users</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="toBeDisabledItemsPerPage"
                        value="20"
                        checked={itemsPerPage === 20}
                        onChange={() => handleItemsPerPageChange(20)}
                        className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2"
                      />
                      <span>20 Users</span>
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
    </div>
  );
};

export { ToBeDisabledUsersSection };
