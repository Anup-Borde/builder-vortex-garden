"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Header = ({ onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const isActivePage = (path) => {
    return pathname === path;
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Leads", path: "/manage-leads" },
    { label: "Reports", path: "/reports" },
  ];

  return (
    <>
      <header className="hidden md:block sticky top-0 bg-white border-b border-[#E0E0E0] px-6 py-4 z-40 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path);
                  }}
                  className={`transition-colors cursor-pointer ${
                    isActivePage(item.path)
                      ? "text-[#079F9F] font-medium border-b-2 border-[#079F9F] pb-1"
                      : "text-[#616060] hover:text-[#282828]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          {/* Button Group on Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => console.log("Calculate EMI clicked")}
              className="flex items-center h-10 px-4 border border-[#079F9F] text-[#079F9F] bg-white rounded-md hover:bg-[#e6f7f7] transition-colors"
            >
              <span className="mr-2">
                <img src="/Calculator.svg" alt="EMI" width={20} height={20} />
              </span>
              EMI
            </button>
            <button
              onClick={() =>
                console.log("Quick Eligibility Calculator clicked")
              }
              className="flex items-center h-10 px-4 border border-[#079F9F] text-[#079F9F] bg-white rounded-md hover:bg-[#e6f7f7] transition-colors"
            >
              <span className="mr-2">
                <img src="/file-accept.svg" alt="QEC" width={20} height={20} />
              </span>
              QEC
            </button>
            <button
              onClick={() => console.log("Add Leads clicked")}
              className="flex items-center h-10 px-4 bg-[#079F9F] text-white rounded-md hover:bg-[#079F9F]/90 transition-colors"
            >
              <span className="mr-2">
                <img src="/plus.svg" alt="Save Order" width={20} height={20} />
              </span>
              Save Order
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export { Header };
