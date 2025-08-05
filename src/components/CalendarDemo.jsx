"use client";

import { useState } from "react";
import { format } from "date-fns";
import CalendarComponent from "./CalendarComponent";

const CalendarDemo = ({ 
  title = "Calendar Utility", 
  showTitle = true,
  containerClassName = "",
  calendarClassName = ""
}) => {
  const [selectedDates, setSelectedDates] = useState(["2025-07-17", "2025-08-06"]);
  const [currentView, setCurrentView] = useState("monthly");

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    console.log("Selected dates:", dates);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    console.log("View changed to:", view);
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      {showTitle && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {title}
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Current view: <span className="font-medium capitalize">{currentView}</span>
          </p>
        </div>
      )}
      
      <CalendarComponent
        selectedDates={selectedDates}
        onDateSelect={handleDateSelect}
        onViewChange={handleViewChange}
        className={calendarClassName}
      />
      
      {selectedDates.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Selected Dates:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map((date) => (
              <span
                key={date}
                className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
              >
                {format(new Date(date), "MMM d, yyyy")}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDemo;
