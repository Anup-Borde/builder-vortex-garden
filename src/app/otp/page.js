"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FibeLogo from "@/components/FibeLogo";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

export default function OtpVerification() {
  const router = useRouter();
  const [values, setValues] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(45);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const inputsRef = useRef(Array.from({ length: OTP_LENGTH }, () => null));
  const email = useMemo(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("uw_email") || "your@email.com";
  }, []);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendVisible(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const handleChange = (idx, v) => {
    if (!/^[0-9]?$/.test(v)) return; // allow single digit only
    const next = [...values];
    next[idx] = v;
    setValues(next);
    if (v && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    const next = Array(OTP_LENGTH)
      .fill("")
      .map((_, i) => text[i] || "");
    setValues(next);
    inputsRef.current[Math.min(text.length, OTP_LENGTH) - 1]?.focus();
  };

  const code = values.join("");
  const canVerify = code.length === OTP_LENGTH;

  const resend = () => {
    setTimeLeft(45);
    setIsResendVisible(false);
    // trigger API call here if wired later
  };

  const verify = () => {
    if (!canVerify) return;
    // simulate verify, then route to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F2F7FA] flex items-center justify-center p-4">
      <div className="w-full max-w-[1120px] bg-white rounded-2xl border border-[#E6E6E6] flex overflow-hidden">
        {/* Left Illustration (hidden on small screens) */}
        <div className="hidden lg:flex lg:w-[559px] relative items-center justify-center">
          <div 
            className="absolute inset-0 rounded-l-2xl opacity-30"
            style={{ background: "linear-gradient(180deg, #93D6FF -0.79%, #EDF2FF 99.43%)" }}
          />
          <div className="relative z-10 w-[420px] h-[420px]">
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/08a0d4caf31663a654c081181b93c7f3f8aa7696?width=840"
              alt="Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-[437px]">
            <div className="mb-6 flex justify-start">
              <FibeLogo width={102} height={88} />
            </div>

            <h2 className="text-[28px] font-semibold text-[#241D41] mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
              OTP Verification
            </h2>
            <p className="text-base text-[#241D41] opacity-60 mb-8" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
              OTP sent to your mail id {email}
            </p>

            {/* OTP Inputs */}
            <div className="flex items-center gap-3 mb-4" onPaste={handlePaste}>
              {values.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  inputMode="numeric"
                  maxLength={1}
                  value={v}
                  onChange={(e) => handleChange(i, e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={cn(
                    "w-12 h-12 text-center text-lg font-semibold text-[#434343] bg-transparent",
                    "border-b-2 border-[#E6E6E6] focus:outline-none focus:border-[#079F9F]"
                  )}
                />
              ))}
            </div>

            {/* Resend Section */}
            <div className="mb-6 h-6">
              {!isResendVisible ? (
                <span className="text-sm text-[#999999]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Resend OTP in 0{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")} sec
                </span>
              ) : (
                <button
                  onClick={resend}
                  className="text-sm font-semibold text-[#079F9F] hover:underline"
                  style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  RESEND OTP
                </button>
              )}
            </div>

            <Button
              onClick={verify}
              disabled={!canVerify}
              className={cn(
                "w-full h-12 text-base font-semibold bg-[#F8A63F] hover:bg-[#e6992f] text-white",
                "rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
            >
              Verify & Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
