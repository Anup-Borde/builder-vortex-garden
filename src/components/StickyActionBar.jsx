"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const StickyActionBar = ({ onAction }) => {
  const actions = [
    {
      id: "upload-bill",
      label: "Upload Estimated Bill",
      onClick: () => onAction?.("upload-bill"),
    },
    {
      id: "cancel-lead",
      label: "Cancel Lead",
      onClick: () => onAction?.("cancel-lead"),
    },
    {
      id: "send-uw",
      label: "Send to UW",
      onClick: () => onAction?.("send-uw"),
    },
    {
      id: "send-bank",
      label: "Send Bank Settlement",
      onClick: () => onAction?.("send-bank"),
    },
    {
      id: "send-bre",
      label: "Sent to BRE",
      onClick: () => onAction?.("send-bre"),
    },
    {
      id: "send-webhook",
      label: "Send to webhook",
      onClick: () => onAction?.("send-webhook"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="w-full h-20 bg-white border-t border-[#E6E6E6] shadow-[0px_-3px_10.4px_0px_rgba(0,0,0,0.12)] rounded-t-2xl">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-center gap-4 h-full overflow-x-auto scrollbar-hide">
            {actions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="flex-shrink-0 h-10 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-[1.5px] border-[#079F9F] text-[#079F9F] bg-transparent hover:bg-[#079F9F]/5 focus:bg-[#079F9F]/5 active:bg-[#079F9F]/10 rounded-lg transition-all duration-200 whitespace-nowrap"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { StickyActionBar };
