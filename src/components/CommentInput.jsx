"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

const CommentInput = ({ 
  placeholder = "Add your comment here...", 
  onSubmit,
  value,
  onChange,
  className = "",
  disabled = false 
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim() && onSubmit) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`relative inline-flex items-center w-full max-w-[296px] h-12 ${className}`}>
      {/* Main container with white background and border */}
      <div className="relative flex items-center w-full h-full bg-white border border-[#E6E6E6] rounded-lg overflow-hidden">
        {/* Input field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 h-full px-4 text-[#434343] text-base font-medium placeholder:text-[#434343] placeholder:font-normal bg-transparent border-none outline-none focus:ring-0"
          style={{
            fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        />
        
        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={disabled || !inputValue.trim()}
          className="flex items-center justify-center w-12 h-10 bg-[#079F9F] hover:bg-[#079F9F]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-[7px] mr-[1px] mt-[1px] mb-[1px]"
          aria-label="Send comment"
        >
          {/* Custom send icon matching Figma design */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
          >
            <path
              d="M8.33333 15.9987H13M9.6047 5.67914L24.5789 13.1617C26.9181 14.3306 26.9181 17.6668 24.5789 18.8357L9.60469 26.3183C6.94142 27.6491 4.07576 24.9124 5.28509 22.193L7.46691 17.2869C7.83163 16.4668 7.83163 15.5306 7.46691 14.7105L5.28509 9.80436C4.07576 7.08502 6.94143 4.34831 9.6047 5.67914Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export { CommentInput };
