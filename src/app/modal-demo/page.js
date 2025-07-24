"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ViewDocumentsModal from '@/components/ViewDocumentsModal';

export default function ModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customDocuments = [
    {
      id: 1,
      name: 'Business License.pdf',
      eligibleAmount: '2025-01-08 15:30:45.0',
    },
    {
      id: 2,
      name: 'Tax Certificate',
      eligibleAmount: '2025-01-08 14:22:33.0',
    },
    {
      id: 3,
      name: 'Bank Statement - December',
      eligibleAmount: '2025-01-08 13:15:20.0',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">View Documents Modal Demo</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Default Documents Modal</h2>
            <p className="text-gray-600 mb-4">
              Click the button below to open the modal with default document data (as shown in the Figma design).
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#079F9F] hover:bg-[#058080] text-white px-6 py-2 rounded-lg"
              style={{
                fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              View Documents
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Features Implemented</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Pixel-perfect design matching Figma specifications</li>
              <li>✅ Fully responsive layout (mobile, tablet, desktop)</li>
              <li>✅ Modal backdrop with click-to-close functionality</li>
              <li>✅ Custom close button with hover effects</li>
              <li>✅ Scrollable table content for long document lists</li>
              <li>✅ Alternating row colors for better readability</li>
              <li>✅ Mobile-optimized table layout</li>
              <li>✅ Proper font family (Gilroy) matching design system</li>
              <li>✅ Accessible button interactions</li>
              <li>✅ Customizable document data through props</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Usage in Existing Components</h2>
            <p className="text-gray-600 mb-4">
              The modal has been integrated into the <strong>LeadDetailsDrawer</strong> component. 
              The "View CIBIL Report" button has been updated to "View Documents" and now opens this modal.
            </p>
            <p className="text-gray-600">
              You can use this modal component in any part of your application by importing it and managing its state.
            </p>
          </div>
        </div>
      </div>

      <ViewDocumentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        documents={[]} // Using default documents
      />
    </div>
  );
}
