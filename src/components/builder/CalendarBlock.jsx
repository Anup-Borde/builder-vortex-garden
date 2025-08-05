"use client";

import CalendarComponent from "../CalendarComponent";
import { useState, useEffect } from "react";

/**
 * Builder.io compatible Calendar Block component
 * 
 * This component can be registered with Builder.io for visual editing
 */
const CalendarBlock = ({
  title = "Calendar",
  showTitle = true,
  defaultView = "monthly",
  preselectedDates = ["2025-07-17", "2025-08-06"],
  allowMultipleSelection = true,
  containerClassName = "",
  calendarClassName = "",
  onDateChange = () => {},
  onViewChange = () => {},
  // Builder.io specific props
  builderBlock = {},
  builderState = {},
  ...props
}) => {
  const [selectedDates, setSelectedDates] = useState(preselectedDates);
  const [currentView, setCurrentView] = useState(defaultView);

  useEffect(() => {
    if (preselectedDates !== selectedDates) {
      setSelectedDates(preselectedDates);
    }
  }, [preselectedDates]);

  const handleDateSelect = (dates) => {
    const newDates = allowMultipleSelection ? dates : dates.slice(-1);
    setSelectedDates(newDates);
    onDateChange(newDates);
    
    // For Builder.io state management
    if (builderState && builderState.setSelectedDates) {
      builderState.setSelectedDates(newDates);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    onViewChange(view);
    
    // For Builder.io state management
    if (builderState && builderState.setCurrentView) {
      builderState.setCurrentView(view);
    }
  };

  return (
    <div className={`calendar-block w-full ${containerClassName}`} {...props}>
      {showTitle && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>
        </div>
      )}
      
      <CalendarComponent
        selectedDates={selectedDates}
        onDateSelect={handleDateSelect}
        onViewChange={handleViewChange}
        className={calendarClassName}
      />
      
      {/* Optional: Selected dates display */}
      {selectedDates.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Selected Dates:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map((date) => (
              <span 
                key={date} 
                className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
              >
                {new Date(date).toLocaleDateString()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Builder.io component registration configuration
CalendarBlock.builderConfig = {
  name: "Calendar Component",
  description: "Advanced calendar with weekly, monthly, and yearly views",
  image: "https://cdn.builder.io/api/v1/image/assets%2Fc5146f66add545dcbac2c6a386fb167d%2Fe314f057657f48a68db71f993a16d481?format=webp&width=200",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Calendar",
      helperText: "Calendar title to display"
    },
    {
      name: "showTitle",
      type: "boolean",
      defaultValue: true,
      helperText: "Show or hide the calendar title"
    },
    {
      name: "defaultView",
      type: "string",
      enum: ["weekly", "monthly", "yearly"],
      defaultValue: "monthly",
      helperText: "Default view mode for the calendar"
    },
    {
      name: "preselectedDates",
      type: "list",
      subFields: [
        {
          name: "date",
          type: "string",
          defaultValue: "2025-07-17"
        }
      ],
      defaultValue: ["2025-07-17", "2025-08-06"],
      helperText: "Pre-selected dates in YYYY-MM-DD format"
    },
    {
      name: "allowMultipleSelection",
      type: "boolean",
      defaultValue: true,
      helperText: "Allow selecting multiple dates"
    },
    {
      name: "containerClassName",
      type: "string",
      defaultValue: "",
      helperText: "Additional CSS classes for container"
    },
    {
      name: "calendarClassName",
      type: "string",
      defaultValue: "",
      helperText: "Additional CSS classes for calendar"
    }
  ],
  actions: [
    {
      name: "onDateChange",
      argNames: ["selectedDates"]
    },
    {
      name: "onViewChange", 
      argNames: ["viewMode"]
    }
  ]
};

export default CalendarBlock;
