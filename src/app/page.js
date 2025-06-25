"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin page immediately when landing on root
    router.replace("/signin");
  }, [router]);

  // Show a minimal loading state while redirecting
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#079F9F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#616060] text-sm">Redirecting to sign in...</p>
      </div>
    </div>
  );
}
