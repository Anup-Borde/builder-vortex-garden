"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  FileStack,
  RefreshCw,
  Scale,
  Calendar,
  FileText,
  HelpCircle,
  ClipboardList,
  LogOut,
} from "lucide-react";

const NavigationDrawer = ({ isOpen, onClose, onLogout }) => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
    onClose();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      router.push("/signin");
    }
    onClose();
  };

  // Main navigation items
  const navigationItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: TrendingUp,
      label: "Post Disbursal Queue",
      path: "/post-disbursal",
    },
    {
      icon: Users,
      label: "Unregister Leads",
      path: "/unregister-leads",
    },
    {
      icon: FileStack,
      label: "Bulk Cancellation",
      path: "/bulk-cancellation",
    },
    {
      icon: RefreshCw,
      label: "Ops refund Queue",
      path: "/ops-refund",
    },
    {
      icon: Scale,
      label: "Settlement Queue",
      path: "/settlement",
    },
    {
      icon: Calendar,
      label: "Emailer Date Range",
      path: "/emailer-date-range",
    },
    {
      icon: FileText,
      label: "Delinquency Report",
      path: "/delinquency-report",
    },
    {
      icon: ClipboardList,
      label: "User Config",
      path: "/user-config",
    },
    {
      icon: HelpCircle,
      label: "Need help",
      path: "/help",
    },
    {
      icon: ClipboardList,
      label: "Reports",
      path: "/reports",
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible backdrop for click handling */}
      <div className="fixed inset-0 z-[55]" onClick={onClose} />

      {/* Drawer with higher z-index */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[60] transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fc5146f66add545dcbac2c6a386fb167d%2F41cdaa4c7f614fff8c81053d86ae3112?format=webp&width=800"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Pritee Kulthe
              </h2>
              <p className="text-sm text-gray-500">Lorium implus</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {/* Main navigation items */}
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group"
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            {/* Logout Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
              >
                <LogOut className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-600" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export { NavigationDrawer };
