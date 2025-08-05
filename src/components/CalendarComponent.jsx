"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameMonth,
  isSameDay,
  parseISO,
  isToday,
  subWeeks,
  subMonths,
  startOfYear,
  endOfYear,
  getYear,
  setYear
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarComponent = ({
  selectedDates = [],
  onDateSelect = () => {},
  onViewChange = () => {},
  className = ""
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("monthly"); // weekly, monthly, yearly
  const [selectedYears, setSelectedYears] = useState([2016, 2022]);

  useEffect(() => {
    onViewChange(viewMode);
  }, [viewMode, onViewChange]);

  const handleDateClick = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const isSelected = selectedDates.includes(dateString);
    
    if (isSelected) {
      onDateSelect(selectedDates.filter(d => d !== dateString));
    } else {
      onDateSelect([...selectedDates, dateString]);
    }
  };

  const handleYearClick = (year) => {
    const isSelected = selectedYears.includes(year);
    if (isSelected) {
      setSelectedYears(selectedYears.filter(y => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  const handleFilterClick = (filter) => {
    const today = new Date();
    
    switch (filter) {
      case "lastWeek":
        setCurrentDate(subWeeks(today, 1));
        setViewMode("weekly");
        break;
      case "lastMonth":
        setCurrentDate(subMonths(today, 1));
        setViewMode("monthly");
        break;
      case "today":
        setCurrentDate(today);
        setViewMode("weekly");
        break;
      case "yearly":
        setViewMode("yearly");
        break;
      default:
        break;
    }
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      setCurrentDate(addMonths(currentDate, -1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const renderWeeklyView = () => {
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);
    const days = [];
    
    let currentDay = startDate;
    while (currentDay <= endDate) {
      days.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }

    return (
      <div className="grid grid-cols-7 gap-2 mb-6">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayString = format(day, "yyyy-MM-dd");
          const isSelected = selectedDates.includes(dayString);
          const isTodayDate = isToday(day);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`
                p-2 text-sm font-medium rounded transition-colors
                ${isSelected 
                  ? "bg-teal-600 text-white" 
                  : isTodayDate 
                    ? "bg-teal-100 text-teal-800" 
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    );
  };

  const renderMonthlyView = () => {
    const currentMonth = startOfMonth(currentDate);
    const nextMonth = addMonths(currentMonth, 1);

    const renderMonth = (monthDate, isNext = false) => {
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);

      const days = [];
      let currentDay = startDate;

      while (currentDay <= endDate) {
        days.push(currentDay);
        currentDay = addDays(currentDay, 1);
      }

      return (
        <div className="flex-1">
          <div className="text-center mb-3">
            <h3 className="text-base font-semibold text-gray-800">
              {format(monthDate, "MMM yyyy")}
            </h3>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2 px-1">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const dayString = format(day, "yyyy-MM-dd");
              const isSelected = selectedDates.includes(dayString);
              const isCurrentMonth = isSameMonth(day, monthDate);
              const isTodayDate = isToday(day);

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`
                    relative w-7 h-7 text-sm font-medium rounded transition-colors flex items-center justify-center mx-auto
                    ${!isCurrentMonth
                      ? "text-gray-300"
                      : isSelected
                        ? "bg-[#079F9F] text-white font-semibold"
                        : isTodayDate
                          ? "bg-teal-100 text-teal-800 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div className="flex gap-12 mb-4">
        {renderMonth(currentMonth)}
        {renderMonth(nextMonth, true)}
      </div>
    );
  };

  const renderYearlyView = () => {
    const currentYear = getYear(new Date());
    const yearRange = [];
    
    // Generate years from 2016 to current year + 5
    for (let year = 2016; year <= currentYear + 5; year++) {
      yearRange.push(year);
    }

    return (
      <div className="mb-6">
        {/* Year Selection Header */}
        <div className="flex items-center justify-between mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="text-gray-500">Select Year</div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
          </div>
          <div className="text-gray-500">Select Year</div>
        </div>

        {/* Years Grid */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          {yearRange.slice(0, 12).map((year) => {
            const isSelected = selectedYears.includes(year);
            const isAvailable = year <= currentYear + 1; // Available years
            
            return (
              <button
                key={year}
                onClick={() => isAvailable && handleYearClick(year)}
                disabled={!isAvailable}
                className={`
                  p-3 text-sm font-medium rounded transition-colors
                  ${isSelected 
                    ? "bg-teal-600 text-white" 
                    : isAvailable 
                      ? "text-gray-800 hover:bg-gray-100" 
                      : "text-gray-300 cursor-not-allowed"
                  }
                `}
              >
                {year}
              </button>
            );
          })}
        </div>

        {/* Additional years row */}
        <div className="grid grid-cols-6 gap-4">
          {yearRange.slice(12).map((year) => {
            const isSelected = selectedYears.includes(year);
            const isAvailable = year <= currentYear + 1;
            
            return (
              <button
                key={year}
                onClick={() => isAvailable && handleYearClick(year)}
                disabled={!isAvailable}
                className={`
                  p-3 text-sm font-medium rounded transition-colors
                  ${isSelected 
                    ? "bg-teal-600 text-white" 
                    : isAvailable 
                      ? "text-gray-800 hover:bg-gray-100" 
                      : "text-gray-300 cursor-not-allowed"
                  }
                `}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-2xl shadow-[0_13px_20px_0_rgba(0,0,0,0.20)] w-full max-w-[598px] min-h-[352px] mx-auto ${className}`}>
      {/* Header with Navigation - Only show for monthly view */}
      {viewMode === "monthly" && (
        <div className="flex items-center justify-between p-6 pb-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <div className="text-center">
            <h2 className="text-base font-semibold text-gray-800">
              {format(currentDate, "MMM yyyy")} - {format(addMonths(currentDate, 1), "MMM yyyy")}
            </h2>
          </div>

          <button
            onClick={() => navigateMonth("next")}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Calendar Content */}
      <div className="calendar-content px-6 pb-2">
        {viewMode === "weekly" && renderWeeklyView()}
        {viewMode === "monthly" && renderMonthlyView()}
        {viewMode === "yearly" && renderYearlyView()}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 p-6 pt-2 bg-white">
        <button
          onClick={() => handleFilterClick("lastWeek")}
          className={`
            px-4 py-2 text-base font-semibold rounded-lg border transition-colors min-w-[111px] h-10
            ${(viewMode === "weekly" || viewMode === "lastWeek")
              ? "border-[#079F9F] text-[#079F9F] bg-white"
              : "border-gray-400 text-gray-400 bg-white hover:border-[#079F9F] hover:text-[#079F9F]"
            }
          `}
        >
          Last Week
        </button>

        <button
          onClick={() => handleFilterClick("lastMonth")}
          className={`
            px-4 py-2 text-base font-semibold rounded-lg border transition-colors min-w-[111px] h-10
            ${(viewMode === "monthly" || viewMode === "lastMonth")
              ? "border-[#079F9F] text-[#079F9F] bg-white"
              : "border-gray-400 text-gray-400 bg-white hover:border-[#079F9F] hover:text-[#079F9F]"
            }
          `}
        >
          Last Month
        </button>

        <button
          onClick={() => handleFilterClick("today")}
          className={`
            px-4 py-2 text-base font-semibold rounded-lg border transition-colors min-w-[111px] h-10
            ${viewMode === "today"
              ? "border-[#079F9F] text-[#079F9F] bg-white"
              : "border-gray-400 text-gray-400 bg-white hover:border-[#079F9F] hover:text-[#079F9F]"
            }
          `}
        >
          Today
        </button>

        <button
          onClick={() => handleFilterClick("yearly")}
          className={`
            px-4 py-2 text-base font-semibold rounded-lg border transition-colors min-w-[111px] h-10
            ${viewMode === "yearly"
              ? "border-[#079F9F] text-[#079F9F] bg-white"
              : "border-gray-400 text-gray-400 bg-white hover:border-[#079F9F] hover:text-[#079F9F]"
            }
          `}
        >
          Yearly
        </button>
      </div>
    </div>
  );
};

export default CalendarComponent;
