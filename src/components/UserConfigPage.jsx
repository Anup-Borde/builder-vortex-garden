"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserManagementTable } from "@/components/UserManagementTable";
import { UserModal } from "@/components/UserModal";
import { CSVUploadModal } from "@/components/CSVUploadModal";
import { DisabledUsersSection } from "@/components/DisabledUsersSection";
import { ToBeDisabledUsersSection } from "@/components/ToBeDisabledUsersSection";
import { Header } from "@/components/Header";
import { PrimaryHeader } from "@/components/PrimaryHeader";
import { Search, Plus, Upload, Filter } from "lucide-react";

const UserConfigPage = () => {
  const router = useRouter();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDisabledUsers, setShowDisabledUsers] = useState(false);
  const [activeView, setActiveView] = useState("active-users"); // active-users, disabled-users, to-be-disabled

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    router.push("/signin");
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddUserModalOpen(false);
    setIsEditModalOpen(false);
    setIsCSVModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = (userData) => {
    console.log("Saving user:", userData);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Primary Header */}
      <PrimaryHeader onLogout={handleLogout} />

      {/* Secondary Header */}
      <Header />

      <div className="p-3 sm:p-6">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#282828] mb-2">
            User Configuration
          </h1>
          <p className="text-sm sm:text-base text-[#616060]">
            Manage employee access and edit user details
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg border border-[#E0E0E0] p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col gap-4">
            {/* Top Row - Search and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#616060] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by Employee ID, User ID, Mobile, Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setIsCSVModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-[#079F9F] text-[#079F9F] bg-white rounded-md hover:bg-[#e6f7f7] transition-colors text-sm"
                >
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Bulk Upload CSV</span>
                  <span className="sm:hidden">Upload CSV</span>
                </button>

                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#079F9F] text-white rounded-md hover:bg-[#079F9F]/90 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add New User</span>
                  <span className="sm:hidden">Add User</span>
                </button>
              </div>
            </div>

            {/* View Toggle Tabs - Second Row */}
            <div className="flex justify-center pt-4 border-t border-[#E0E0E0]">
              <div className="flex items-center bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Switching to active-users");
                    setActiveView("active-users");
                  }}
                  className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    activeView === "active-users"
                      ? "bg-white text-[#282828] shadow-sm"
                      : "text-[#616060] hover:text-[#282828]"
                  }`}
                >
                  Active Users
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Switching to disabled-users");
                    setActiveView("disabled-users");
                  }}
                  className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    activeView === "disabled-users"
                      ? "bg-white text-[#282828] shadow-sm"
                      : "text-[#616060] hover:text-[#282828]"
                  }`}
                >
                  Disabled Users
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Switching to to-be-disabled");
                    setActiveView("to-be-disabled");
                  }}
                  className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    activeView === "to-be-disabled"
                      ? "bg-white text-[#282828] shadow-sm"
                      : "text-[#616060] hover:text-[#282828]"
                  }`}
                >
                  To be Disabled
                </button>
              </div>
            </div>

            {/* Conditional Filter for Active Users */}
            {activeView === "active-users" && (
              <div className="flex items-center gap-3 pt-2 border-t border-[#E0E0E0]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDisabledUsers}
                    onChange={(e) => setShowDisabledUsers(e.target.checked)}
                    className="w-4 h-4 text-[#079F9F] bg-gray-100 border-gray-300 rounded focus:ring-[#079F9F] focus:ring-2"
                  />
                  <span className="text-sm text-[#616060]">
                    Include Disabled in Active Table
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Debug indicator - remove after testing */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm">
            Current Active View: <strong>{activeView}</strong>
          </div>
        )}

        {/* Content Section - Show based on active view */}
        <div className="relative min-h-[400px]">
          {activeView === "active-users" ? (
            <div key="active-users" className="w-full">
              <UserManagementTable
                searchTerm={searchTerm}
                showDisabledUsers={showDisabledUsers}
                onEditUser={handleEditUser}
              />
            </div>
          ) : activeView === "disabled-users" ? (
            <div key="disabled-users" className="w-full">
              <DisabledUsersSection />
            </div>
          ) : activeView === "to-be-disabled" ? (
            <div key="to-be-disabled" className="w-full">
              <ToBeDisabledUsersSection />
            </div>
          ) : null}
        </div>
      </div>

      {/* Modals */}
      {isAddUserModalOpen && (
        <UserModal
          isOpen={isAddUserModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          mode="add"
        />
      )}

      {isEditModalOpen && editingUser && (
        <UserModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          mode="edit"
          userData={editingUser}
        />
      )}

      {isCSVModalOpen && (
        <CSVUploadModal isOpen={isCSVModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export { UserConfigPage };
