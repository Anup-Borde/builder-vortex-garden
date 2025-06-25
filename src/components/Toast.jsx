"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

const Toast = ({ message, timestamp, onClose, isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-lg p-4 flex items-start space-x-3">
        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-[#282828]">{message}</p>
          {timestamp && (
            <p className="text-xs text-[#616060] mt-1">{timestamp}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-4 w-4 text-[#616060]" />
        </button>
      </div>
    </div>
  );
};

export { Toast };
