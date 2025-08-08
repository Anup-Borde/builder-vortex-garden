"use client";

import React, { useState, useRef } from "react";
import { X, Upload, Download, AlertCircle, CheckCircle } from "lucide-react";

const CSVUploadModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, processing, success, error
  const [errors, setErrors] = useState([]);
  const [validRecords, setValidRecords] = useState(0);
  const fileInputRef = useRef(null);

  // Sample CSV template data
  const csvTemplate = `Employee ID,User ID,Merchant ID,Mobile Number,Agent Name,Email ID,Branch/Group,Categories,Roles,KAM
EMP001,UJOHN001,MER001,+91-9876543210,John Doe,john.doe@company.com,Mumbai Central,"Retail,Personal","Agent,Lead Manager",Sarah Johnson
EMP002,UMARY002,MER002,+91-9876543211,Mary Smith,mary.smith@company.com,Delhi North,Corporate,Senior Agent,Mike Wilson`;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    // Validate file type
    if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
      setErrors(["Please select a CSV file"]);
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors(["File size must be less than 5MB"]);
      return;
    }

    setFile(selectedFile);
    setErrors([]);
    setUploadStatus("idle");
  };

  const validateCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const requiredHeaders = [
      "Employee ID", "User ID", "Merchant ID", "Mobile Number", 
      "Agent Name", "Email ID", "Branch/Group", "Categories", "Roles", "KAM"
    ];
    
    const validationErrors = [];
    let validCount = 0;

    // Check headers
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      validationErrors.push(`Missing required headers: ${missingHeaders.join(', ')}`);
      return { errors: validationErrors, validRecords: 0 };
    }

    // Validate data rows
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map(cell => cell.trim().replace(/"/g, ''));
      const rowNumber = i + 1;

      // Check if row has correct number of columns
      if (row.length !== headers.length) {
        validationErrors.push(`Row ${rowNumber}: Incorrect number of columns`);
        continue;
      }

      let rowValid = true;

      // Validate each field
      if (!row[0]) { // Employee ID
        validationErrors.push(`Row ${rowNumber}: Employee ID is required`);
        rowValid = false;
      }

      if (!row[1]) { // User ID
        validationErrors.push(`Row ${rowNumber}: User ID is required`);
        rowValid = false;
      }

      if (!row[3]) { // Mobile Number
        validationErrors.push(`Row ${rowNumber}: Mobile Number is required`);
        rowValid = false;
      } else if (!/^\+91-\d{10}$/.test(row[3])) {
        validationErrors.push(`Row ${rowNumber}: Invalid mobile number format`);
        rowValid = false;
      }

      if (!row[5]) { // Email
        validationErrors.push(`Row ${rowNumber}: Email is required`);
        rowValid = false;
      } else if (!/\S+@\S+\.\S+/.test(row[5])) {
        validationErrors.push(`Row ${rowNumber}: Invalid email format`);
        rowValid = false;
      }

      if (rowValid) {
        validCount++;
      }
    }

    return { errors: validationErrors, validRecords: validCount };
  };

  const processFile = async () => {
    if (!file) return;

    setUploadStatus("processing");
    
    try {
      const text = await file.text();
      const validation = validateCSV(text);
      
      setErrors(validation.errors);
      setValidRecords(validation.validRecords);
      
      if (validation.errors.length === 0) {
        setUploadStatus("success");
        // Here you would typically send the data to your backend
        console.log("CSV processed successfully");
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      setErrors(["Error processing file"]);
      setUploadStatus("error");
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus("idle");
    setErrors([]);
    setValidRecords(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <h2 className="text-xl font-semibold text-[#282828]">
            Bulk Upload Users via CSV
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Upload Instructions</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Download the CSV template and fill in your user data</li>
              <li>• Ensure all required fields are completed</li>
              <li>• Mobile numbers must be in format: +91-XXXXXXXXXX</li>
              <li>• Multiple categories/roles should be separated by commas</li>
              <li>• Maximum file size: 5MB</li>
            </ul>
          </div>

          {/* Download Template */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-[#282828]">CSV Template</h4>
              <p className="text-sm text-[#616060]">Download the template with sample data</p>
            </div>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-4 py-2 border border-[#079F9F] text-[#079F9F] bg-white rounded-md hover:bg-[#e6f7f7] transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Template
            </button>
          </div>

          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-[#079F9F] bg-[#e6f7f7]"
                : "border-gray-300 hover:border-[#079F9F]"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-600" />
              </div>
              
              {file ? (
                <div>
                  <p className="text-[#282828] font-medium">{file.name}</p>
                  <p className="text-sm text-[#616060]">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[#282828] font-medium">
                    Drop your CSV file here, or click to browse
                  </p>
                  <p className="text-sm text-[#616060]">
                    Supports CSV files up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Status */}
          {uploadStatus === "processing" && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-blue-800">Processing file...</span>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-800">
                Successfully processed {validRecords} user records
              </span>
            </div>
          )}

          {uploadStatus === "error" && errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">
                  Validation Errors ({errors.length})
                </span>
                {validRecords > 0 && (
                  <span className="text-red-700">
                    - {validRecords} valid records found
                  </span>
                )}
              </div>
              <div className="max-h-32 overflow-y-auto">
                <ul className="text-sm text-red-700 space-y-1">
                  {errors.slice(0, 10).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                  {errors.length > 10 && (
                    <li className="font-medium">
                      ... and {errors.length - 10} more errors
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E0E0E0]">
            <div className="flex items-center gap-3">
              {file && (
                <button
                  onClick={resetUpload}
                  className="px-4 py-2 text-[#616060] hover:text-[#282828] transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-[#E0E0E0] text-[#616060] bg-white rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              {file && uploadStatus !== "success" && (
                <button
                  onClick={processFile}
                  disabled={uploadStatus === "processing"}
                  className="px-4 py-2 bg-[#079F9F] text-white rounded-md hover:bg-[#079F9F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadStatus === "processing" ? "Processing..." : "Upload Users"}
                </button>
              )}
              
              {uploadStatus === "success" && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#079F9F] text-white rounded-md hover:bg-[#079F9F]/90 transition-colors"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CSVUploadModal };
