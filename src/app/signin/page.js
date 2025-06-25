"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ImageIcon } from "lucide-react";

export default function SignIn() {
  const router = useRouter();

  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (showOtpField && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, showOtpField]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setShowOtpField(true);
      setCountdown(30);
      setCanResend(false);
      setIsLoading(false);
      console.log("OTP sent to:", contact);
    }, 1000);
  };

  const handleResendOtp = () => {
    if (canResend) {
      setCountdown(30);
      setCanResend(false);
      console.log("Resending OTP to:", contact);
    }
  };

  const handleOtpChange = (value) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setOtp(numericValue);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Sign in with:", { contact, otp });
      router.push("/dashboard");
    }, 1500);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Left Section - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
        <div className="max-w-md text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-[#079F9F]/10 to-[#079F9F]/5 rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-[#079F9F]/40" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-[#282828] leading-tight">
              Lead Tracking Dashboard
            </h1>
            <p className="text-lg text-[#616060] font-normal">
              Simplify Management, For All Support Team
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Brand Logo */}
        <div className="flex justify-end p-6 lg:p-8">
          <div className="text-2xl font-bold text-[#079F9F]">Fibe</div>
        </div>

        {/* Mobile Illustration */}
        <div className="lg:hidden flex justify-center px-6 pb-8">
          <div className="w-48 h-48 bg-gradient-to-br from-[#079F9F]/10 to-[#079F9F]/5 rounded-2xl flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-[#079F9F]/40" />
          </div>
        </div>

        <div className="lg:hidden text-center px-6 pb-8 space-y-3">
          <h1 className="text-2xl font-semibold text-[#282828] leading-tight">
            Lead Tracking Dashboard
          </h1>
          <p className="text-base text-[#616060] font-normal">
            Simplify Management, For All Support Team
          </p>
        </div>

        {/* Login Card */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <Card className="w-full max-w-md bg-white shadow-lg border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="text-center">
                <CardTitle className="text-2xl font-semibold text-[#282828] mb-2">
                  Fibe
                </CardTitle>
                <CardDescription className="text-base text-[#616060] font-normal">
                  Welcome back — Sign in to your account
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Contact Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="contact"
                  className="text-sm font-medium text-[#282828]"
                >
                  Email ID / Mobile Number
                </Label>
                <Input
                  id="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Mobile Number / Email ID"
                  className="h-12 border-[#E0E0E0] rounded-md focus:border-[#079F9F] focus:ring-[#079F9F]/20 text-[#282828] placeholder:text-[#616060]/60"
                  required
                />
              </div>

              {!showOtpField && (
                <Button
                  onClick={handleSendOtp}
                  disabled={isLoading || !contact.trim()}
                  className="w-full h-12 bg-[#079F9F] hover:bg-[#079F9F]/90 disabled:bg-[#079F9F]/50 disabled:cursor-not-allowed text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-[#079F9F]/20 focus:ring-offset-2 transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              )}

              {showOtpField && (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <Label
                      htmlFor="otp"
                      className="text-sm font-medium text-[#282828]"
                    >
                      Enter OTP
                    </Label>
                    <div className="flex justify-center">
                      <InputOTP
                        value={otp}
                        onChange={handleOtpChange}
                        maxLength={6}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <div className="flex justify-center mt-2">
                      <div
                        className="text-sm text-[#616060]"
                        aria-live="polite"
                      >
                        {!canResend ? (
                          `Resend OTP in ${formatTime(countdown)} sec`
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            className="text-[#079F9F] hover:text-[#079F9F]/80 font-medium underline focus:outline-none focus:ring-2 focus:ring-[#079F9F]/20 rounded px-1"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSignIn}
                    disabled={isLoading || otp.length !== 6}
                    className="w-full h-12 bg-[#079F9F] hover:bg-[#079F9F]/90 disabled:bg-[#079F9F]/50 disabled:cursor-not-allowed text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-[#079F9F]/20 focus:ring-offset-2 transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
