"use client";

import React, { useState } from "react";
import { ProductDetailsTable } from "@/components/ProductDetailsTable";
import { MerchantDetailsForm } from "@/components/MerchantDetailsForm";
import { ContactDetailsSection } from "@/components/ContactDetailsSection";
import { Button } from "@/components/ui/button";
import ViewDocumentsModal from "@/components/ViewDocumentsModal";

const MerchantDetailsContent = () => {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm">
      {/* Product Details Section */}
      <div className="mb-8">
        <ProductDetailsTable />
      </div>

      {/* Merchant Details Form */}
      <div className="mb-8">
        <MerchantDetailsForm />
      </div>

      {/* Contact Details Sections */}
      <div className="mb-8">
        <ContactDetailsSection />
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] shadow-[0px_-3px_10.4px_0px_rgba(0,0,0,0.12)] rounded-t-2xl p-5 z-50">
        <div className="flex justify-end max-w-8xl mx-auto">
          <Button
            variant="outline"
            className="border-[1.5px] border-[#079F9F] text-[#079F9F] hover:bg-[#079F9F]/10 px-6 py-2 rounded-lg font-semibold"
            style={{
              fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            View Documents
          </Button>
        </div>
      </div>
    </div>
  );
};

export { MerchantDetailsContent };
