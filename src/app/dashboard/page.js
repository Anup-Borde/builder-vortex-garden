"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FibeLogo from "@/components/FibeLogo";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-[#F2F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E6E6E6] px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <FibeLogo width={60} height={40} />
            <h1 className="text-xl font-semibold text-[#434343]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
              UWLO Portal
            </h1>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#079F9F] text-[#079F9F] hover:bg-[#079F9F] hover:text-white"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#434343]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
              Welcome to UWLO Portal
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-[#666666]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
              Your underwriting portal is ready to be customized. This is a clean slate to build your UWLO features.
            </p>
            
            <div className="pt-4">
              <p className="text-sm text-[#999999] mb-4">Quick Actions:</p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  Create New Application
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  View Reports
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  Manage Settings
                </Button>
              </div>
              <p className="text-xs text-[#999999] mt-4">
                Features will be enabled as they are implemented
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
