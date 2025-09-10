"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import FibeLogo from "@/components/FibeLogo";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Sign in successful:", { email, rememberMe });

      // Navigate to dashboard
      try {
        router.push("/dashboard");
      } catch (error) {
        console.error("Navigation error, using fallback:", error);
        window.location.href = "/dashboard";
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F2F7FA] flex items-center justify-center p-4">
      <div className="w-full max-w-[1120px] h-[704px] bg-white rounded-2xl border border-[#E6E6E6] flex overflow-hidden">
        {/* Left Section - Illustration and Text */}
        <div className="hidden lg:flex lg:w-[559px] relative">
          {/* Background gradient */}
          <div 
            className="absolute inset-0 rounded-l-2xl opacity-30"
            style={{
              background: "linear-gradient(180deg, #93D6FF -0.79%, #EDF2FF 99.43%)"
            }}
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

        {/* Right Section - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-[437px]">
            {/* Logo */}
            <div className="mb-8 flex justify-start">
              <FibeLogo width={102} height={88} />
            </div>

            {/* Heading */}
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

            {/* Login Form */}
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Email Input */}
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
                  style={{
                    fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px"
                  }}
                  required
                />
              </div>

              {/* Password Input */}
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
                  style={{ 
                    fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px"
                  }}
                  required
                />
              </div>

              {/* Remember Me and Forgot Password */}
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
                  className="text-base font-semibold text-[#109BA7] underline hover:text-[#0d8691] transition-colors"
                  style={{ fontFamily: "Gilroy, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
