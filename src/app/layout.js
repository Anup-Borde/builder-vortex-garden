import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lead Beacon - Sign In",
  description: "Lead tracking and management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gilroy:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{
          fontFamily:
            'Gilroy, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
        suppressHydrationWarning={true}
      >
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Prevent FullStory from interfering with Next.js HMR in development
                if (typeof window !== 'undefined') {
                  const originalFetch = window.fetch;
                  window.fetch = function(...args) {
                    // Allow Next.js internal requests to pass through without FullStory interference
                    if (args[0] && (args[0].includes('/_next/') || args[0].includes('__nextjs'))) {
                      return originalFetch.apply(this, args);
                    }
                    return originalFetch.apply(this, args);
                  };
                }
              `,
            }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
