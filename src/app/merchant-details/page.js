"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { PrimaryHeader } from "@/components/PrimaryHeader";
import { MerchantDetailsContent } from "@/components/MerchantDetailsContent";

export default function MerchantDetails() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Primary Header */}
      <PrimaryHeader onLogout={handleLogout} />

      {/* Secondary Header */}
      <Header />

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-8xl mx-auto">
          <MerchantDetailsContent />
        </div>
      </div>
    </div>
  );
}
