"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, MoreVertical, UserMinus, UserCheck } from "lucide-react";

const UserManagementTable = ({ searchTerm, showDisabledUsers, onEditUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showDisableConfirmation, setShowDisableConfirmation] = useState(false);
  const [userToDisable, setUserToDisable] = useState(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showDisableConfirmation) {
        cancelDisableUser();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDisableConfirmation]);

  // Mock user data - expanded dataset based on the provided API structure
  const mockUsers = [
    {
      id: "USR001",
      employeeId: "12345",
      userId: "ALBIN001",
      merchantId: "10831",
      mobile: "9061271803",
      agentName: "Albin Shibu",
      email: "albinshibu@fibe.in",
      branchGroup: "Mumbai Central",
      categories: ["Retail", "Personal"],
      roles: ["MERCHANT_ADMIN"],
      status: "active",
      kam: "Sarah Johnson",
      password: "••••••••",
    },
    {
      id: "USR002",
      employeeId: "EMP002",
      userId: "KUSH002",
      merchantId: "1200",
      mobile: "9876543211",
      agentName: "Kush Kush",
      email: "kush@fibe.in",
      branchGroup: "Delhi North",
      categories: ["Corporate"],
      roles: ["ADMIN"],
      status: "active",
      kam: "Mike Wilson",
      password: "••••••••",
    },
    {
      id: "USR003",
      employeeId: "1190",
      userId: "SHUBH003",
      merchantId: "1010",
      mobile: "9140686575",
      agentName: "Shubhangi S",
      email: "shubhangi-s@cybersrcc.com",
      branchGroup: "Bangalore South",
      categories: ["Retail", "SME"],
      roles: ["MERCHANT_CHECKER"],
      status: "disabled",
      kam: "Lisa Davis",
      password: "••••••••",
    },
    {
      id: "USR004",
      employeeId: "EMP004",
      userId: "UEMILY004",
      merchantId: "MER004",
      mobile: "+91-9876543213",
      agentName: "Emily Johnson",
      email: "emily.johnson@company.com",
      branchGroup: "Chennai East",
      categories: ["Personal", "Corporate"],
      roles: ["Team Lead", "Agent"],
      status: "active",
      kam: "Tom Anderson",
      password: "••••••••",
    },
    {
      id: "USR005",
      employeeId: "EMP005",
      userId: "UROBERT005",
      merchantId: "MER005",
      mobile: "+91-9876543214",
      agentName: "Robert Wilson",
      email: "robert.wilson@company.com",
      branchGroup: "Kolkata West",
      categories: ["SME"],
      roles: ["Senior Agent", "Mentor"],
      status: "active",
      kam: "Jane Smith",
      password: "••••••••",
    },
    {
      id: "USR006",
      employeeId: "EMP006",
      userId: "UAISHA006",
      merchantId: "MER006",
      mobile: "+91-9876543215",
      agentName: "Aisha Patel",
      email: "aisha.patel@company.com",
      branchGroup: "Pune Central",
      categories: ["Retail"],
      roles: ["Agent"],
      status: "disabled",
      kam: "Robert Johnson",
      password: "••••���•••",
    },
    {
      id: "USR007",
      employeeId: "EMP007",
      userId: "URAHUL007",
      merchantId: "MER007",
      mobile: "+91-9876543216",
      agentName: "Rahul Sharma",
      email: "rahul.sharma@company.com",
      branchGroup: "Hyderabad North",
      categories: ["Corporate", "SME"],
      roles: ["Lead Manager"],
      status: "active",
      kam: "Emma Wilson",
      password: "••••••••",
    },
    {
      id: "USR008",
      employeeId: "EMP008",
      userId: "UPRIYA008",
      merchantId: "MER008",
      mobile: "+91-9876543217",
      agentName: "Priya Reddy",
      email: "priya.reddy@company.com",
      branchGroup: "Ahmedabad West",
      categories: ["Personal", "Retail"],
      roles: ["Agent", "Trainer"],
      status: "active",
      kam: "Chris Brown",
      password: "••••••••",
    },
    {
      id: "USR009",
      employeeId: "ESPL444",
      userId: "MAKER009",
      merchantId: "1010",
      mobile: "8217701069",
      agentName: "Maker Admin",
      email: "emailESADMIN@earlysalary.com",
      branchGroup: "Gurgaon Central",
      categories: ["Corporate", "SME", "Retail"],
      roles: ["ES_ADMIN", "MERCHANT_MAKER"],
      status: "active",
      kam: "David Lee",
      password: "••••••••",
    },
    {
      id: "USR010",
      employeeId: "EMP123",
      userId: "OMKAR010",
      merchantId: "1010",
      mobile: "6388584233",
      agentName: "Omkar Singh",
      email: "omkar@cybersrcc.com",
      branchGroup: "Noida East",
      categories: ["Personal"],
      roles: ["SETTLEMENT_OD_SUPPORT"],
      status: "active",
      kam: "Sarah Johnson",
      password: "••••••••",
    },
    {
      id: "USR011",
      employeeId: "SW232",
      userId: "VINAY011",
      merchantId: "1010",
      mobile: "8555128411",
      agentName: "Vinay Marathe",
      email: "vinay.marathe@earlysalary.com",
      branchGroup: "Mumbai West",
      categories: ["Corporate"],
      roles: ["MERCHANT_ADMIN"],
      status: "active",
      kam: "Mike Wilson",
      password: "••••••••",
    },
    {
      id: "USR012",
      employeeId: "ESP1111",
      userId: "AGENT012",
      merchantId: "7434",
      mobile: "9755562853",
      agentName: "FOS Agent",
      email: "email@gmail.com",
      branchGroup: "Delhi South",
      categories: ["SME"],
      roles: ["FOS_AGENT"],
      status: "disabled",
      kam: "Lisa Davis",
      password: "••••••••",
    },
    {
      id: "USR013",
      employeeId: "SW387",
      userId: "SUMIT013",
      merchantId: "3436",
      mobile: "7906695445",
      agentName: "Sumit Gupta",
      email: "sg02.aug@fibe.com",
      branchGroup: "Bangalore North",
      categories: ["Retail", "Personal"],
      roles: ["ADMIN"],
      status: "active",
      kam: "Tom Anderson",
      password: "••••••••",
    },
    {
      id: "USR014",
      employeeId: "EMP654",
      userId: "PRADEEP014",
      merchantId: "1010",
      mobile: "9876543212",
      agentName: "Pradeep J",
      email: "pradeeppp@es.com",
      branchGroup: "Chennai West",
      categories: ["Corporate", "SME"],
      roles: ["SALES_EXECUTIVE"],
      status: "active",
      kam: "Jane Smith",
      password: "••••••••",
    },
    {
      id: "USR015",
      employeeId: "DANISH015",
      userId: "DANISH015",
      merchantId: "1010",
      mobile: "6303674304",
      agentName: "Danish Gada",
      email: "danish.gada@earlysalary.com",
      branchGroup: "Kolkata East",
      categories: ["Personal", "Retail"],
      roles: ["SETTLEMENT_OD_SUPPORT"],
      status: "active",
      kam: "Robert Johnson",
      password: "••••••••",
    },
  ];

  const [users, setUsers] = useState(mockUsers);

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Filter by status
    if (!showDisabledUsers) {
      filtered = filtered.filter((user) => user.status === "active");
    }

    // Search functionality
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.employeeId.toLowerCase().includes(searchLower) ||
          user.userId.toLowerCase().includes(searchLower) ||
          user.merchantId.toLowerCase().includes(searchLower) ||
          user.mobile.toLowerCase().includes(searchLower) ||
          user.agentName.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.branchGroup.toLowerCase().includes(searchLower) ||
          user.categories.some((cat) =>
            cat.toLowerCase().includes(searchLower)
          ) ||
          user.roles.some((role) => role.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [searchTerm, showDisabledUsers, users]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleDisableUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setUserToDisable(user);
    setShowDisableConfirmation(true);
  };

  const confirmDisableUser = () => {
    if (userToDisable) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userToDisable.id ? { ...user, status: "disabled" } : user
        )
      );
      console.log("User disabled:", userToDisable.id);
    }
    setShowDisableConfirmation(false);
    setUserToDisable(null);
  };

  const cancelDisableUser = () => {
    setShowDisableConfirmation(false);
    setUserToDisable(null);
  };

  const handleEnableUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: "active" } : user
      )
    );
    console.log("User enabled:", userId);
  };

  const getStatusBadge = (status) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Disabled
        </span>
      );
    }
  };

  return (
    <>
      {/* Responsive Table View */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FFFBF1] border-b border-[#E0E0E0]">
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm">
                  Employee ID
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm">
                  User ID
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm">
                  Merchant ID
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm min-w-[100px]">
                  Mobile Number
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm min-w-[120px]">
                  Agent Name
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm min-w-[150px] hidden md:table-cell">
                  Email ID
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm min-w-[100px] hidden lg:table-cell">
                  Branch/Group
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm min-w-[80px] hidden lg:table-cell">
                  Categories
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm min-w-[80px] hidden lg:table-cell">
                  Roles
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-[#616060] text-xs sm:text-sm text-center min-w-[80px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageData.length > 0 ? (
                currentPageData.map((user) => (
                  <TableRow
                    key={user.id}
                    className={`border-b border-[#E0E0E0] hover:bg-gray-50 ${
                      user.status === "disabled" ? "bg-gray-50 opacity-75" : ""
                    }`}
                  >
                    <TableCell className="font-medium text-[#282828] text-xs sm:text-sm">
                      {user.employeeId}
                    </TableCell>
                    <TableCell className="text-[#282828] text-xs sm:text-sm">
                      {user.userId}
                    </TableCell>
                    <TableCell className="text-[#282828] text-xs sm:text-sm">
                      {user.merchantId}
                    </TableCell>
                    <TableCell className="text-[#282828] text-xs sm:text-sm">
                      {user.mobile}
                    </TableCell>
                    <TableCell className="text-[#282828] text-xs sm:text-sm">
                      {user.agentName}
                    </TableCell>
                    <TableCell className="text-[#282828] text-xs sm:text-sm hidden md:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-[#282828] text-xs sm:text-sm hidden lg:table-cell">
                      {user.branchGroup}
                    </TableCell>
                    <TableCell className="text-[#282828] text-xs sm:text-sm hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {user.categories.map((category, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#282828] text-xs sm:text-sm hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => onEditUser(user)}
                          className="p-1.5 sm:p-2 text-[#079F9F] hover:bg-[#e6f7f7] rounded-md transition-colors"
                          title="Edit User"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        {user.status === "active" ? (
                          <button
                            onClick={() => handleDisableUser(user.id)}
                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Disable User"
                          >
                            <UserMinus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEnableUser(user.id)}
                            className="p-1.5 sm:p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                            title="Enable User"
                          >
                            <UserCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    className="text-center py-8 text-[#616060]"
                  >
                    No users found matching the search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length > 0 && (
          <div className="px-3 sm:px-6 py-4 border-t border-[#E0E0E0] bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs sm:text-sm text-[#616060]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-center sm:text-left">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
                </span>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span>Show:</span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="itemsPerPage"
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
                        name="itemsPerPage"
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
                        name="itemsPerPage"
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

              {/* Page Navigation */}
              <div className="flex items-center justify-center sm:justify-end">
                <div className="flex items-center space-x-1">
                  <button
                    className="p-1 sm:p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
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
                        className={`px-2 py-1 text-xs rounded ${
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
                    className="p-1 sm:p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
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

      {/* Disable User Confirmation Modal */}
      {showDisableConfirmation && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              cancelDisableUser();
            }
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <UserMinus className="h-6 w-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Disable User
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to disable user{" "}
              <span className="font-semibold text-gray-900">
                {userToDisable?.agentName}
              </span>
              ? This action will prevent them from accessing the system.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDisableUser}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDisableUser}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Disable User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { UserManagementTable };
