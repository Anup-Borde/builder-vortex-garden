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
      <header className="hidden md:block sticky top-20 bg-white border-b border-[#E0E0E0] px-6 py-4 z-40 shadow-sm">
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
        </div>
      </header>
    </>
  );
};

export { Header };
