"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";

const Header = ({ onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      router.push("/signin");
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (path) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Leads", path: "/manage-leads" },
    { label: "Reports", path: "/reports" },
  ];

  return (
    <>
      <header className="sticky top-0 bg-white border-b border-[#E0E0E0] px-6 py-4 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
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

          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Button
              onClick={toggleMobileMenu}
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#616060]" />
              ) : (
                <Menu className="w-5 h-5 text-[#616060]" />
              )}
            </Button>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="hidden sm:flex items-center space-x-2 border-[#E0E0E0] text-[#616060] hover:text-[#282828]"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="p-6 border-b border-[#E0E0E0]">
              <div className="flex items-center justify-end">
                <Button
                  onClick={toggleMobileMenu}
                  variant="ghost"
                  size="sm"
                  className="p-1"
                >
                  <X className="w-5 h-5 text-[#616060]" />
                </Button>
              </div>
            </div>

            <nav className="p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path);
                  }}
                  className={`block py-3 px-4 rounded-lg transition-colors ${
                    isActivePage(item.path)
                      ? "bg-[#079F9F]/10 text-[#079F9F] font-medium border-l-4 border-[#079F9F]"
                      : "text-[#616060] hover:text-[#282828] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Logout Button */}
              <div className="pt-4 border-t border-[#E0E0E0]">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 border-[#E0E0E0] text-[#616060] hover:text-[#282828]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export { Header };
