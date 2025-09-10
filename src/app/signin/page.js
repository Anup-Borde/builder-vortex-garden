"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import FibeLogo from "@/components/FibeLogo";

const OTP_LENGTH = 6;


export default function SignIn() {
  const router = useRouter();
  const [mode, setMode] = useState("login");

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Post-OTP role selection
  const [selectedRole, setSelectedRole] = useState("");

  // OTP state
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(45);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const inputsRef = useRef(Array.from({ length: OTP_LENGTH }, () => null));

  // Forgot state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  useEffect(() => {
    if (mode === "otp") {
      setOtpValues(Array(OTP_LENGTH).fill(""));
      setTimeLeft(45);
      setIsResendVisible(false);
      // Focus first OTP box
      setTimeout(() => inputsRef.current[0]?.focus(), 0);
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== "otp") return;
    if (timeLeft <= 0) {
      setIsResendVisible(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, mode]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (typeof window !== "undefined") sessionStorage.setItem("uw_email", email.trim());
      setMode("otp");
    }, 800);
  };

  // OTP helpers
  const handleOtpChange = (idx, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otpValues];
    next[idx] = v;
    setOtpValues(next);
    if (v && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otpValues[idx] && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    const next = Array(OTP_LENGTH).fill("").map((_, i) => text[i] || "");
    setOtpValues(next);
    inputsRef.current[Math.min(text.length, OTP_LENGTH) - 1]?.focus();
  };

  const code = otpValues.join("");
  const canVerify = code.length === OTP_LENGTH;

  const resendOtp = () => {
    setTimeLeft(45);
    setIsResendVisible(false);
    // Hook real API call here
  };

  const verifyOtp = () => {
    if (!canVerify) return;
    setSelectedRole("");
    setMode("roleSelect");
  };

  return (
    <div className="min-h-screen bg-[#F2F7FA] flex items-center justify-center p-4">
      <div className="w-full max-w-[1120px] h-[704px] bg-white rounded-2xl border border-[#E6E6E6] flex overflow-hidden">
        {/* Left Section - Illustration and Text */}
        <div className="hidden lg:flex lg:w-[559px] relative">
          {/* Background gradient */}
          <div
            className="absolute inset-0 rounded-l-2xl opacity-30"
            style={{ background: "linear-gradient(180deg, #93D6FF -0.79%, #EDF2FF 99.43%)" }}
          />

          {/* Content */}
          <div className="relative z-10 p-10 flex flex-col justify-between">
            <div className="pt-16">
              <h1
                className="text-[28px] font-bold leading-[120%] tracking-[-0.28px] text-[#434343] mb-6 max-w-[465px]"
                style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
              >
                Smarter Underwriting Starts Here
              </h1>
              <p
                className="text-[22px] font-normal leading-[148%] text-[#333333] max-w-[443px]"
                style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac justo dui.
              </p>
            </div>

            {/* Stamp illustration */}
            <div className="flex justify-center mt-auto">
              <div className="w-[472px] h-[472px] relative">
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/08a0d4caf31663a654c081181b93c7f3f8aa7696?width=944"
                  alt="Stamp illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Forms */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-[437px]">
            {/* Logo */}
            <div className="mb-8 flex justify-start">
              <FibeLogo width={102} height={88} />
            </div>

            {mode === "login" && (
              <>
                <h2
                  className="text-[32px] font-semibold leading-normal text-[#241D41] mb-4"
                  style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Great to have you here!
                </h2>
                <p
                  className="text-[24px] font-medium leading-[24px] text-[#241D41] opacity-60 mb-8"
                  style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Please enter your official email address
                </p>

                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="relative">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email ID"
                      autoFocus
                      className={cn(
                        "h-16 px-4 text-base border-2 rounded-lg",
                        "border-[#079F9F] focus:border-[#079F9F] focus:ring-[#079F9F]",
                        "placeholder:text-[#999999] placeholder:font-medium"
                      )}
                      style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "16px" }}
                      required
                    />
                  </div>

                  <div className="relative">
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className={cn(
                        "h-16 px-4 text-base border-2 rounded-lg",
                        "border-[#E6E6E6] focus:border-[#079F9F] focus:ring-[#079F9F]",
                        "placeholder:text-[#999999] placeholder:font-medium"
                      )}
                      style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "16px" }}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-6 h-6 rounded border border-[#979797] bg-white focus:ring-2 focus:ring-[#079F9F] text-[#079F9F]"
                        />
                      </div>
                      <Label
                        htmlFor="remember"
                        className="text-base font-medium text-[#504A67] cursor-pointer"
                        style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                      >
                        Remember me
                      </Label>
                    </div>

                    <button
                      type="button"
                      onClick={() => { setForgotEmail(email); setForgotSent(false); setMode("forgot"); }}
                      className="text-base font-semibold text-[#109BA7] underline hover:text-[#0d8691] transition-colors"
                      style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !email.trim() || !password.trim()}
                    className={cn(
                      "w-full h-16 text-xl font-semibold bg-[#079F9F] hover:bg-[#068585]",
                      "text-white rounded-lg transition-all duration-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </form>
              </>
            )}

            {mode === "otp" && (
              <>
                <h2 className="text-[28px] font-semibold text-[#241D41] mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  OTP Verification
                </h2>
                <p className="text-base text-[#241D41] opacity-60 mb-8" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  OTP sent to your mail id {typeof window !== "undefined" ? (sessionStorage.getItem("uw_email") || email) : email}
                </p>

                <div className="flex items-center gap-3 mb-4" onPaste={handleOtpPaste}>
                  {otpValues.map((v, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputsRef.current[i] = el)}
                      inputMode="numeric"
                      maxLength={1}
                      value={v}
                      onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={cn(
                        "w-12 h-12 text-center text-lg font-semibold text-[#434343] bg-transparent",
                        "border-b-2 border-[#E6E6E6] focus:outline-none focus:border-[#079F9F]"
                      )}
                    />
                  ))}
                </div>

                <div className="mb-6 h-6 flex items-center justify-between">
                  {!isResendVisible ? (
                    <span className="text-sm text-[#999999]" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                      Resend OTP in 0{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")} sec
                    </span>
                  ) : (
                    <button
                      onClick={resendOtp}
                      className="text-sm font-semibold text-[#079F9F] hover:underline"
                      style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                    >
                      RESEND OTP
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-sm font-medium text-[#109BA7] underline"
                    style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                  >
                    Back to Login
                  </button>
                </div>

                <Button
                  onClick={verifyOtp}
                  disabled={!canVerify}
                  className={cn(
                    "w-full h-12 text-base font-semibold bg-[#F8A63F] hover:bg-[#e6992f] text-white",
                    "rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Verify & Proceed
                </Button>
              </>
            )}

            {mode === "roleSelect" && (
              <>
                <h2 className="text-[24px] font-semibold text-[#241D41] mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Please Select dashboard type
                </h2>

                <div className="grid grid-cols-4 gap-3 mb-8">
                  {[
                    "UW","LO","APND","SELFIE","FIM","FRAUD","SUSPICIOUS","VKYC"
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={cn(
                        "h-10 rounded-md text-sm font-semibold border transition-all",
                        selectedRole === role
                          ? "bg-[#079F9F] text-white border-[#079F9F]"
                          : "bg-[#F6F6FA] text-[#434343] border-[#E6E6E6] hover:border-[#079F9F]"
                      )}
                      style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    if (!selectedRole) return;
                    const routeMap = {
                      UW: "/dashboard",
                      LO: "/dashboard",
                      APND: "/dashboard",
                      SELFIE: "/dashboard",
                      FIM: "/dashboard",
                      FRAUD: "/dashboard",
                      SUSPICIOUS: "/dashboard",
                      VKYC: "/dashboard",
                    };
                    const base = routeMap[selectedRole] || "/dashboard";
                    router.push(`${base}?role=${encodeURIComponent(selectedRole)}`);
                  }}
                  disabled={!selectedRole}
                  className="w-full h-12 text-base font-semibold bg-[#F8A63F] hover:bg-[#e6992f] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Submit
                </Button>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-sm font-medium text-[#109BA7] underline"
                    style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}

            {mode === "forgot" && (
              <>
                <h2 className="text-[18px] font-bold tracking-[0.12em] text-[#241D41] mb-2" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  UWLT DASHBORD
                </h2>
                <h3 className="text-[28px] font-semibold text-[#241D41] mb-6" style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}>
                  Forgot password
                </h3>

                <div className="space-y-4 mb-6">
                  <Input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Email ID"
                    className="h-12 px-4 border-2 border-[#E6E6E6] rounded-lg focus:border-[#079F9F] focus:ring-[#079F9F]"
                    style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                  />
                  {forgotSent && (
                    <div className="text-sm text-[#52B064]">Reset link sent to your email</div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => { if (forgotEmail.trim()) { setForgotSent(true); } }}
                    disabled={!forgotEmail.trim()}
                    className="bg-[#F8A63F] hover:bg-[#e6992f] text-white px-6"
                    style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                  >
                    Send Email
                  </Button>
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-sm font-medium text-[#109BA7] underline"
                    style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
