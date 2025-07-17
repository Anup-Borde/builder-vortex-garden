/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests in development
  allowedDevOrigins: process.env.NODE_ENV === "development" ? ["*"] : [],

  // Additional security headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
