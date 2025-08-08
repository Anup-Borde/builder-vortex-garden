"use client";

import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";

const UserModal = ({ isOpen, onClose, onSave, mode = "add", userData = null }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    userId: "",
    merchantId: "",
    mobile: "",
    agentName: "",
    email: "",
    branchGroup: "",
    categories: [],
    roles: [],
    kam: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Predefined options
  const branchOptions = [
    "Mumbai Central",
    "Delhi North",
    "Bangalore South",
    "Chennai East",
    "Kolkata West",
    "Pune Central",
    "Hyderabad North",
    "Ahmedabad West",
  ];

  const categoryOptions = ["Retail", "Personal", "Corporate", "SME"];
  const roleOptions = ["Agent", "Senior Agent", "Lead Manager", "Team Lead", "Mentor", "Trainer"];
  const kamOptions = [
    "Sarah Johnson",
    "Mike Wilson",
    "Lisa Davis",
    "Tom Anderson",
    "Jane Smith",
    "Robert Johnson",
    "Emma Wilson",
    "Chris Brown",
  ];

  useEffect(() => {
    if (mode === "edit" && userData) {
      setFormData({
        employeeId: userData.employeeId || "",
        userId: userData.userId || "",
        merchantId: userData.merchantId || "",
        mobile: userData.mobile || "",
        agentName: userData.agentName || "",
        email: userData.email || "",
        branchGroup: userData.branchGroup || "",
        categories: userData.categories || [],
        roles: userData.roles || [],
        kam: userData.kam || "",
        password: userData.password || "",
      });
    } else {
      // Reset form for add mode
      setFormData({
        employeeId: "",
        userId: "",
        merchantId: "",
        mobile: "",
        agentName: "",
        email: "",
        branchGroup: "",
        categories: [],
        roles: [],
        kam: "",
        password: "",
      });
    }
    setErrors({});
  }, [mode, userData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!formData.userId.trim()) newErrors.userId = "User ID is required";
    if (!formData.merchantId.trim()) newErrors.merchantId = "Merchant ID is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.agentName.trim()) newErrors.agentName = "Agent name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.branchGroup) newErrors.branchGroup = "Branch/Group is required";
    if (formData.categories.length === 0) newErrors.categories = "At least one category is required";
    if (formData.roles.length === 0) newErrors.roles = "At least one role is required";
    if (!formData.kam) newErrors.kam = "KAM is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation
    if (formData.mobile && !/^\+91-\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number (+91-XXXXXXXXXX)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <h2 className="text-xl font-semibold text-[#282828]">
            {mode === "add" ? "Add Employee Access" : "Edit Employee Access"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Employee ID *
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                errors.employeeId ? "border-red-500" : "border-[#E0E0E0]"
              }`}
              placeholder="Enter employee ID"
            />
            {errors.employeeId && (
              <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
            )}
          </div>

          {/* User ID */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              User ID *
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                errors.userId ? "border-red-500" : "border-[#E0E0E0]"
              }`}
              placeholder="Enter user ID"
            />
            {errors.userId && (
              <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
            )}
          </div>

          {/* Merchant ID */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Merchant ID *
            </label>
            <input
              type="text"
              name="merchantId"
              value={formData.merchantId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                errors.merchantId ? "border-red-500" : "border-[#E0E0E0]"
              }`}
              placeholder="Enter merchant ID"
            />
            {errors.merchantId && (
              <p className="text-red-500 text-sm mt-1">{errors.merchantId}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Mobile Number *
              {mode === "edit" && (
                <span className="text-[#616060] font-normal"> (Prefilled and Disabled)</span>
              )}
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              disabled={mode === "edit"}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""
              } ${errors.mobile ? "border-red-500" : "border-[#E0E0E0]"}`}
              placeholder="+91-XXXXXXXXXX"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Agent Name */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Agent Name *
            </label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                errors.agentName ? "border-red-500" : "border-[#E0E0E0]"
              }`}
              placeholder="Enter agent name"
            />
            {errors.agentName && (
              <p className="text-red-500 text-sm mt-1">{errors.agentName}</p>
            )}
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Email ID *
              {mode === "edit" && (
                <span className="text-[#616060] font-normal"> (Prefilled and Disabled)</span>
              )}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={mode === "edit"}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""
              } ${errors.email ? "border-red-500" : "border-[#E0E0E0]"}`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Branch/Group */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Branch/Group *
            </label>
            <select
              name="branchGroup"
              value={formData.branchGroup}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                errors.branchGroup ? "border-red-500" : "border-[#E0E0E0]"
              }`}
            >
              <option value="">Select branch/group</option>
              {branchOptions.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            {errors.branchGroup && (
              <p className="text-red-500 text-sm mt-1">{errors.branchGroup}</p>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Categories *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map(category => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleMultiSelectChange("categories", category)}
                    className="w-4 h-4 text-[#079F9F] bg-gray-100 border-gray-300 rounded focus:ring-[#079F9F] focus:ring-2"
                  />
                  <span className="text-sm text-[#282828]">{category}</span>
                </label>
              ))}
            </div>
            {errors.categories && (
              <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
            )}
          </div>

          {/* Roles */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Roles *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map(role => (
                <label key={role} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.roles.includes(role)}
                    onChange={() => handleMultiSelectChange("roles", role)}
                    className="w-4 h-4 text-[#079F9F] bg-gray-100 border-gray-300 rounded focus:ring-[#079F9F] focus:ring-2"
                  />
                  <span className="text-sm text-[#282828]">{role}</span>
                </label>
              ))}
            </div>
            {errors.roles && (
              <p className="text-red-500 text-sm mt-1">{errors.roles}</p>
            )}
          </div>

          {/* KAM */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              KAM (Key Account Manager) *
            </label>
            <select
              name="kam"
              value={formData.kam}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                errors.kam ? "border-red-500" : "border-[#E0E0E0]"
              }`}
            >
              <option value="">Select KAM</option>
              {kamOptions.map(kam => (
                <option key={kam} value={kam}>{kam}</option>
              ))}
            </select>
            {errors.kam && (
              <p className="text-red-500 text-sm mt-1">{errors.kam}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#282828] mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#079F9F] focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-[#E0E0E0]"
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#616060] hover:text-[#282828]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E0E0E0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#E0E0E0] text-[#616060] bg-white rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#079F9F] text-white rounded-md hover:bg-[#079F9F]/90 transition-colors"
            >
              {mode === "add" ? "Add User" : "Update Access"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { UserModal };
