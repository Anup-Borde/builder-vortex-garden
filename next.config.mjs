/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests in development
  allowedDevOrigins: [
    "*.projects.builder.codes",
    "*.fly.dev",
    "*.org",
    "*"
  ],

  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.builder.io',
        port: '',
        pathname: '/api/v1/image/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/api/v1/image/assets/**',
      },
    ],
  },

  // Additional headers (avoid X-Frame-Options to allow embedding in Builder preview)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
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
