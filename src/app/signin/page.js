"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  // Helper function to detect if contact is email or mobile
  const isEmail = (contact) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(contact);
  };

  const getContactType = () => {
    if (!contact.trim()) return "mobile number";
    return isEmail(contact) ? "email ID" : "mobile number";
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Sign in with:", { contact, otp });

      // Enhanced navigation with fallback handling
      try {
        router.push("/dashboard");
      } catch (error) {
        console.error("Navigation error, using fallback:", error);
        // Fallback to window.location for problematic cases
        window.location.href = "/dashboard";
      }
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
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: "#F2F7FB" }}
    >
      {/* Header */}
      <div
        className="w-full h-20 flex items-center px-5 flex-shrink-0"
        style={{ background: "linear-gradient(173deg, rgba(87, 116, 193, 0.50) -15.14%, rgba(201, 255, 255, 0.50) 165.05%)" }}
      >
        <div className="flex items-center">
          {/* Fibe Logo SVG */}
          <svg
            width="60"
            height="48"
            viewBox="0 0 60 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2267 30.7726C13.4338 30.9725 13.5984 31.2134 13.7104 31.4804C13.8224 31.7474 13.8793 32.0349 13.8777 32.3251C13.8761 32.9212 13.6422 33.4923 13.2272 33.9138C12.8121 34.3353 12.2497 34.5728 11.6628 34.5745H4.73891V45.7856C4.74057 46.0758 4.68374 46.3634 4.57191 46.6305C4.46008 46.8976 4.29562 47.1387 4.08865 47.3389C3.8862 47.5513 3.6431 47.7195 3.37429 47.8331C3.10548 47.9467 2.81664 48.0032 2.52552 47.9992C2.23968 48.0011 1.95649 47.9435 1.69343 47.8299C1.43037 47.7163 1.19301 47.5492 0.996007 47.3389C0.788884 47.1388 0.624326 46.8978 0.512488 46.6306C0.400649 46.3635 0.343901 46.0759 0.345747 45.7856V30.1115C0.416087 27.7547 1.25991 25.744 2.87723 24.0793C4.49454 22.4146 6.45157 21.5339 8.74833 21.437H11.6667C11.9563 21.4324 12.244 21.4869 12.5125 21.5974C12.781 21.7078 13.0249 21.8719 13.2298 22.0799C13.44 22.2814 13.6064 22.5251 13.7185 22.7956C13.8306 23.066 13.8859 23.3573 13.8808 23.6507C13.8792 24.2467 13.6453 24.8179 13.2303 25.2394C12.8153 25.6609 12.2528 25.8984 11.6659 25.9001H8.99061C7.88965 25.9197 6.83811 26.3677 6.05283 27.1516C5.26756 27.9355 4.80844 28.9955 4.77017 30.113H11.6612C11.9527 30.1085 12.242 30.1647 12.5112 30.2781C12.7805 30.3916 13.024 30.5599 13.2267 30.7726Z"
              fill="#121212"
            />
            <path
              d="M16.3557 27.2557C16.1454 27.0543 15.9789 26.8105 15.8669 26.5398C15.7549 26.2691 15.6999 25.9777 15.7055 25.6842C15.7012 25.3885 15.7567 25.095 15.8685 24.822C15.9804 24.549 16.1462 24.3021 16.3557 24.0967C16.5526 23.8862 16.7899 23.7189 17.053 23.6052C17.3161 23.4914 17.5993 23.4337 17.8852 23.4356C18.472 23.4375 19.0343 23.6751 19.4491 24.0965C19.864 24.518 20.0978 25.089 20.0994 25.685C20.1048 25.9785 20.0497 26.2699 19.9377 26.5405C19.8258 26.8111 19.6593 27.055 19.4491 27.2565C19.2441 27.4643 19.0002 27.6282 18.7317 27.7384C18.4632 27.8487 18.1756 27.9032 17.886 27.8986C17.6015 27.9011 17.3194 27.8455 17.0565 27.7351C16.7936 27.6246 16.5553 27.4616 16.3557 27.2557ZM19.4491 30.7369C19.6562 30.9369 19.8207 31.1778 19.9325 31.4448C20.0443 31.7118 20.1011 31.9992 20.0994 32.2894V45.7824C20.1013 46.0727 20.0445 46.3603 19.9327 46.6274C19.8208 46.8946 19.6563 47.1356 19.4491 47.3357C19.2468 47.5483 19.0037 47.7166 18.7349 47.8302C18.4661 47.9438 18.1772 48.0002 17.886 47.9961C17.3112 47.9853 16.7629 47.7486 16.3564 47.3358C15.9499 46.9229 15.7169 46.3661 15.7062 45.7824V32.2894C15.7173 31.7058 15.9504 31.1492 16.3569 30.7365C16.7633 30.3237 17.3114 30.0869 17.886 30.0757C18.1772 30.0717 18.4661 30.1283 18.735 30.242C19.0038 30.3558 19.2468 30.5242 19.4491 30.7369Z"
              fill="#121212"
            />
            <path
              d="M37.6785 32.7541C39.3896 34.4939 40.2451 36.6004 40.2451 39.0736C40.2451 41.5468 39.3896 43.6533 37.6785 45.3931C35.9679 47.1313 33.8936 48.0002 31.4557 47.9996H24.846C24.2712 47.9888 23.7229 47.7521 23.3164 47.3393C22.9099 46.9265 22.6768 46.3697 22.6662 45.786V23.6495C22.6621 23.3538 22.7177 23.0604 22.8296 22.7874C22.9414 22.5144 23.1071 22.2676 23.3165 22.0621C23.5135 21.8516 23.7508 21.6844 24.0138 21.5707C24.2769 21.457 24.5601 21.3992 24.846 21.4009C25.4329 21.4026 25.9954 21.6401 26.4104 22.0616C26.8254 22.4831 27.0593 23.0542 27.061 23.6503V31.3627C28.3906 30.5613 29.9095 30.1416 31.4557 30.1484C33.8936 30.1478 35.9679 31.0164 37.6785 32.7541ZM34.5671 42.2286C35.4232 41.356 35.8509 40.2978 35.8504 39.0538C35.8499 37.8098 35.4221 36.7515 34.5671 35.8789C33.7419 35.0409 32.6227 34.5701 31.4557 34.5701C30.2887 34.5701 29.1695 35.0409 28.3443 35.8789C27.4887 36.7515 27.061 37.8098 27.061 39.0538C27.061 40.2978 27.4887 41.356 28.3443 42.2286C29.1697 43.0662 30.2888 43.5367 31.4557 43.5367C32.6226 43.5367 33.7417 43.0662 34.5671 42.2286Z"
              fill="#121212"
            />
            <path
              d="M59.3332 39.3954V39.2883C59.2629 41.716 58.3771 43.7748 56.6759 45.4649C54.9747 47.155 52.9296 48 50.5406 48C48.1027 48 46.0287 47.1312 44.3186 45.3935C42.6085 43.6558 41.753 41.5493 41.752 39.074C41.752 36.5981 42.6075 34.4916 44.3186 32.7545C46.0297 31.0173 48.1037 30.1485 50.5406 30.1479C52.8374 30.1479 54.8298 30.9454 56.518 32.5402C56.6345 32.66 56.7283 32.7545 56.7994 32.8259H56.7642C57.1051 33.2505 57.2793 33.7881 57.2532 34.3353C57.2271 34.8825 57.0025 35.4005 56.6227 35.7896L49.5887 42.933C49.4501 43.0693 49.2967 43.1891 49.1315 43.2902C49.5841 43.45 50.0591 43.5344 50.5383 43.5402C51.1172 43.5503 51.692 43.4399 52.2272 43.2158C52.7625 42.9916 53.2469 42.6585 53.6505 42.2369C54.5055 41.3686 54.933 40.3153 54.933 39.0772C54.9951 38.5471 55.2553 38.0615 55.6599 37.7207C56.0689 37.365 56.5924 37.1744 57.1308 37.185C57.6576 37.1788 58.1683 37.3695 58.5657 37.7207C58.9703 38.0615 59.2305 38.5471 59.2926 39.0772H59.3277L59.3332 39.3954ZM47.4324 35.8873C46.5763 36.7624 46.1488 37.8226 46.1498 39.0676C46.1521 39.4058 46.1875 39.7429 46.2553 40.0741C46.3187 39.9633 46.4023 39.8658 46.5015 39.7867L51.4934 34.6832C51.1814 34.6133 50.8631 34.5772 50.5438 34.5752C49.9642 34.5652 49.3889 34.6766 48.8536 34.9023C48.3182 35.128 47.8345 35.4633 47.4324 35.8873Z"
              fill="#121212"
            />
            <path
              d="M2.83333 16.667C4.39814 16.667 5.66667 15.398 5.66667 13.8326C5.66667 12.2673 4.39814 10.9983 2.83333 10.9983C1.26853 10.9983 0 12.2673 0 13.8326C0 15.398 1.26853 16.667 2.83333 16.667Z"
              fill="#F8A63F"
            />
            <path
              d="M10.748 10.144C12.1288 10.144 13.248 9.02475 13.248 7.64404C13.248 6.26333 12.1288 5.14404 10.748 5.14404C9.36733 5.14404 8.24805 6.26333 8.24805 7.64404C8.24805 9.02475 9.36733 10.144 10.748 10.144Z"
              fill="#079F9F"
            />
            <path
              d="M2.43229 3.83333C3.49084 3.83333 4.34896 2.97521 4.34896 1.91667C4.34896 0.858121 3.49084 0 2.43229 0C1.37375 0 0.515625 0.858121 0.515625 1.91667C0.515625 2.97521 1.37375 3.83333 2.43229 3.83333Z"
              fill="#FF3E79"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-7xl bg-white rounded-2xl border border-gray-200 overflow-hidden h-full max-h-[600px] flex">
          {/* Left Section - Welcome back with illustration */}
          <div
            className="hidden lg:flex lg:w-1/2 items-start justify-start p-8"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets%2Fc5146f66add545dcbac2c6a386fb167d%2Fe55e9c53fd18468a84296df527ec26af?format=webp&width=800')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="max-w-md">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    color: "#434343",
                    textAlign: "left",
                    paddingBottom: "24px",
                    fontFamily: "Gilroy, sans-serif",
                    fontSize: "36px",
                    fontWeight: "700",
                    lineHeight: "50.4px",
                  }}
                >
                  <p>Welcome back</p>
                </div>
              </div>
              <p
                className="text-xl mb-12 leading-relaxed"
                style={{
                  color: "#282828",
                  fontFamily: "Gilroy, sans-serif",
                  fontWeight: "500",
                  textAlign: "left",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur ut justo dui.
              </p>
            </div>
          </div>

          {/* Right Section - Sign In Form */}
          <div className="w-full lg:w-1/2 flex items-start justify-center p-6 lg:p-8">
            <div className="w-full max-w-md">
              <div className="mb-6">
                <h2
                  className="text-3xl font-bold mb-3"
                  style={{
                    color: "#434343",
                    fontFamily: "Gilroy, sans-serif",
                    paddingBottom: "20px",
                  }}
                >
                  {showOtpField
                    ? `Verify ${getContactType()}`
                    : "Let's get started"}
                </h2>
                <p
                  className="text-lg"
                  style={{
                    color: "#282828",
                    fontFamily: "Gilroy, sans-serif",
                    fontWeight: "500",
                    paddingBottom: "20px",
                  }}
                >
                  {showOtpField
                    ? `OTP has sent to ${contact}`
                    : "Sign in with your mobile number / email"}
                </p>
              </div>

              <form className="space-y-4">
                {/* Contact Input - Only show when not in OTP mode */}
                {!showOtpField && (
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter email ID / mobile number"
                        className="w-full h-14 px-4 rounded-lg border-2 border-gray-200 bg-white text-lg placeholder-gray-400 focus:border-teal-500 focus:outline-none transition-colors"
                        style={{
                          fontFamily: "Gilroy, sans-serif",
                          fontWeight: "400",
                        }}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* OTP Button or Verify OTP Button */}
                {!showOtpField ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading || !contact.trim()}
                    className="w-full h-14 rounded-lg text-white text-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#079F9F",
                      fontFamily: "Gilroy, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending OTP...</span>
                      </div>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* OTP Input */}
                    <div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => handleOtpChange(e.target.value)}
                        placeholder=""
                        maxLength={6}
                        className="w-full h-14 px-4 rounded-lg border-2 border-gray-200 bg-white text-lg focus:border-teal-500 focus:outline-none transition-colors"
                        style={{
                          fontFamily: "Gilroy, sans-serif",
                          fontWeight: "400",
                          color: "#282828",
                        }}
                      />

                      {/* Resend OTP - positioned to the right */}
                      <div className="flex justify-end mt-2">
                        {!canResend ? (
                          <p
                            className="text-sm"
                            style={{
                              color: "#999",
                              fontFamily: "Gilroy, sans-serif",
                            }}
                          >
                            Resend OTP in {formatTime(countdown)} sec
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            className="text-lg font-semibold"
                            style={{
                              color: "#079F9F",
                              fontFamily: "Gilroy, sans-serif",
                              fontWeight: "600",
                            }}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSignIn}
                      disabled={isLoading || otp.length !== 6}
                      className="w-full h-14 rounded-lg text-white text-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: "#079F9F",
                        fontFamily: "Gilroy, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
