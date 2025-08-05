"use client";

import CalendarDemo from "@/components/CalendarDemo";
import { Header } from "@/components/Header";
import { PrimaryHeader } from "@/components/PrimaryHeader";
import { useRouter } from "next/navigation";

export default function CalendarDemoPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Primary Header */}
      <PrimaryHeader onLogout={handleLogout} />

      {/* Secondary Header */}
      <Header />

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Advanced Calendar Component
            </h1>
            <p className="text-gray-600">
              A fully responsive calendar with multiple view modes: Weekly, Monthly (dual-month), and Yearly selection.
            </p>
          </div>

          {/* Calendar Component */}
          <CalendarDemo 
            title="Interactive Calendar"
            showTitle={true}
            containerClassName="mb-8"
          />

          {/* Features Description */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">View Modes</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Weekly:</strong> Shows current week only</li>
                  <li>• <strong>Monthly:</strong> Dual calendar view (current + next month)</li>
                  <li>• <strong>Yearly:</strong> Grid of years for selection</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Quick Filters</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Last Week:</strong> Navigate to previous week</li>
                  <li>• <strong>Last Month:</strong> Navigate to previous month</li>
                  <li>• <strong>Today:</strong> Jump to current date</li>
                  <li>• <strong>Yearly:</strong> Switch to year selection mode</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Builder.io Integration Info */}
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-200 mt-6">
            <h2 className="text-xl font-semibold text-teal-800 mb-3">Builder.io Integration</h2>
            <p className="text-teal-700 mb-3">
              This calendar component is fully compatible with Builder.io Fusion editor and includes:
            </p>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• Customizable props for title, styling, and behavior</li>
              <li>• Event handlers for date selection and view changes</li>
              <li>• Responsive design that works on all screen sizes</li>
              <li>• Tailwind CSS for consistent styling</li>
              <li>• Date-fns for reliable date manipulation</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
