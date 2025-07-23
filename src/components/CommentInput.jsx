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
            fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        />
        
        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={disabled || !inputValue.trim()}
          className="flex items-center justify-center w-12 h-10 bg-[#079F9F] hover:bg-[#079F9F]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-[7px] mr-[1px] mt-[1px] mb-[1px]"
          aria-label="Send comment"
        >
          <Send 
            className="w-8 h-8 text-white" 
            strokeWidth={2}
            fill="none"
          />
        </button>
      </div>
    </div>
  );
};

export { CommentInput };
